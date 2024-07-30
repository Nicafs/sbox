import moment from 'moment';

import { app as firebase } from '@credito-express/ce-components';

const firestore = firebase.firestore();
const HISTORICO_TEMPO_LIMITE_EM_HORAS = 72;
const ehAmbienteE2E = process.env.REACT_APP_ENV === 'e2e';

export const subscribeFirestore = (negociacoes, setNegociacoes, pessoa) => {
  if (ehAmbienteE2E) {
    const unsubscribeFn = () => {};
    return unsubscribeFn;
  }

  const firestoreTimestampInicial = Number(moment().toDate());
  const query = firestore
    .collection('investimento_historico_visualizacao')
    .where('t', '>', firestoreTimestampInicial);
  const ids = negociacoes.map(({ id }) => id);
  ids.map(id => query.where('idNegociacao', '==', id));
  const unsubscribeFn = query.onSnapshot(querySnapshot => {
    querySnapshot.docChanges().forEach(change => {
      if (change.type === 'added') {
        const {
          idPessoa: idPessoaFirestore,
          idNegociacao,
          t,
        } = change.doc.data();
        const { id: idPessoaAutenticada } = pessoa;
        if (idPessoaFirestore !== idPessoaAutenticada) {
          firestoreHistoricoVisualizacaoHandler(
            negociacoes,
            setNegociacoes,
            idNegociacao,
            HISTORICO_TEMPO_LIMITE_EM_HORAS,
            t,
          );
        }
      }
    });
  });
  return unsubscribeFn;
};

const firestoreHistoricoVisualizacaoHandler = (
  negociacoes,
  setNegociacoes,
  idNegociacao,
  tempoLimiteEmHoras,
  t,
) => {
  let countInvestimentosAtualizados = 0;
  const investimentosAtualizados = negociacoes.map(invOriginal => {
    const inv = {
      ...invOriginal,
    };
    const { id } = inv;
    if (id === idNegociacao) {
      if (!inv.historicoVisualizacao) {
        inv.historicoVisualizacao = {
          qtd: 0,
          tempoLimiteEmHoras,
        };
      }
      inv.historicoVisualizacao.qtd += 1;
      inv.historicoVisualizacao.ultimaVisualizacaoTimestamp = t;
      countInvestimentosAtualizados += 1;
    }
    return inv;
  });
  if (countInvestimentosAtualizados > 0) {
    setNegociacoes(investimentosAtualizados);
  }
};

const getFirestoreTempoLimite = () =>
  Number(moment().subtract(HISTORICO_TEMPO_LIMITE_EM_HORAS, 'hours').toDate());

export const salvaHistoricoVisualizacao = async (idNegociacao, idPessoa) => {
  const tLimite = getFirestoreTempoLimite();
  const historicoExistente = await firestore
    .collection('investimento_historico_visualizacao')
    .where('idPessoa', '==', idPessoa)
    .where('idNegociacao', '==', idNegociacao)
    .where('t', '>=', tLimite)
    .get();
  const { size: historicosQtd } = historicoExistente;
  if (historicosQtd === 0) {
    return firestore.collection('investimento_historico_visualizacao').add({
      idNegociacao,
      idPessoa,
      t: Number(moment().toDate()),
      ultimaAlteracao: Number(moment().toDate()),
      contador: 1,
    });
  }
  const doc = historicoExistente.docs[historicosQtd - 1];
  const docRef = doc.ref;
  const { contador, finishedBy } = doc.data();
  if (!finishedBy) {
    docRef.update({
      contador: contador + 1,
      ultimaAlteracao: Number(moment().toDate()),
    });
  }
};

const buscaHistoricoFirestore = async () => {
  const tLimite = getFirestoreTempoLimite();
  const query = firestore.collection('investimento_historico_visualizacao');
  return query.where('t', '>=', tLimite).get();
};

export const firestoreBuscarHistoricoVisualizacao = async (
  investimentoArr,
  pessoa,
) => {
  const { docs } = await buscaHistoricoFirestore(investimentoArr);
  const promises = investimentoArr.map(async invOriginal => {
    const inv = {
      ...invOriginal,
    };
    const { id: idNegociacao } = inv;
    const { id: idPessoaAutenticada } = pessoa;
    const historicoDocs = docs
      .map(doc => doc.data())
      .filter(({ idNegociacao: idFirestore }) => idNegociacao === idFirestore)
      .filter(
        ({ idPessoa: idPessoaFirestore }) =>
          idPessoaFirestore !== idPessoaAutenticada,
      );
    const qtdVisualizacoes = historicoDocs.length;
    const { t: ultimaVisualizacaoTimestamp } =
      qtdVisualizacoes > 0 ? historicoDocs[historicoDocs.length - 1] : {};
    inv.historicoVisualizacao = {
      qtd: qtdVisualizacoes,
      tempoLimiteEmHoras: HISTORICO_TEMPO_LIMITE_EM_HORAS,
      ultimaVisualizacaoTimestamp,
    };
    return inv;
  });
  return Promise.all(promises);
};
