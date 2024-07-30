import { moneyMask, percentMask } from 'commons/utils/MaskHandle';
import moment from 'moment';

import { app as firebase } from '@credito-express/ce-components';

const firestore = firebase.firestore();

const ehAmbienteE2E = process.env.REACT_APP_ENV === 'e2e';

/** Alerta o usuário em situações em que outra pessoa visualiza o mesmo investimento
 * O alerta é exibido caso haja alguma visualização nos últimos 5 minutos
 */
export const subscribeFirestore = (
  investimentos,
  removerInvestimentos,
  idPessoaAutenticada,
  exibirAlertaFn,
) => {
  if (ehAmbienteE2E) {
    const unsubscribeFn = () => {};
    return unsubscribeFn;
  }

  const firestoreTimestampInicial = Number(
    moment().subtract(5, 'minutes').toDate(),
  );
  let query = firestore.collection('investimento_historico_visualizacao');
  // const ids = investimentos.map(({ id }) => id); // Todo melhorar query por ids
  // ids.map(id => (query = query.where('idNegociacao', '==', id)));
  query = query.where('ultimaAlteracao', '>=', firestoreTimestampInicial);
  const unsubscribeFn = query.onSnapshot(querySnapshot => {
    const docsInvestimentosFinished = querySnapshot.docs.filter(doc => {
      const docData = doc.data();
      return !!(
        docData.finishedBy &&
        docData.finishedBy !== idPessoaAutenticada &&
        docData.idPessoa === idPessoaAutenticada
      );
    });
    if (docsInvestimentosFinished.length > 0) {
      const docsInvestimentosAConcluir = docsInvestimentosFinished.filter(
        doc => {
          const docData = doc.data();
          return !docData.finished;
        },
      );

      const idsInvestimentosAConcluir = docsInvestimentosAConcluir.map(
        doc => doc.data().idNegociacao,
      );
      if (docsInvestimentosAConcluir.length > 0) {
        firestoreInvestimentosRemovidosHandler(
          idPessoaAutenticada,
          investimentos,
          idsInvestimentosAConcluir,
          removerInvestimentos,
          exibirAlertaFn,
        );
      }
    } else {
      querySnapshot.docChanges().forEach(change => {
        const { type: tipoDoEvento } = change;
        if (tipoDoEvento === 'added' || tipoDoEvento === 'modified') {
          const {
            idNegociacao,
            idPessoa: idPessoaFirestore,
          } = change.doc.data();

          if (idPessoaAutenticada !== idPessoaFirestore) {
            firestoreHistoricoVisualizacaoHandler(
              idNegociacao,
              investimentos,
              exibirAlertaFn,
            );
          }
        }
      });
    }
  });
  return unsubscribeFn;
};

const firestoreHistoricoVisualizacaoHandler = (
  idNegociacao,
  investimentos,
  exibirAlertaFn,
) => {
  const investimentoEncontrado = investimentos.find(
    ({ id }) => id === idNegociacao,
  );
  if (investimentoEncontrado) {
    const { valor, taxaRentabilidade } = investimentoEncontrado;
    const msg = `O que é bom dura pouco! O investimento no valor de R$ ${moneyMask(
      valor,
    )} (${percentMask(
      taxaRentabilidade,
    )}%), que está no seu carrinho, já está sendo analisado por outro investidor, confirme sua transação AGORA`;
    exibirAlertaFn(msg, 'warning', 8000);
  }
};

const firestoreInvestimentosRemovidosHandler = (
  idInvestidor,
  investimentos,
  idsInvestimentosAConcluir,
  removerInvestimentos,
  exibirAlertaFn,
) => {
  const investimentosEncontrados = investimentos.filter(({ id }) =>
    idsInvestimentosAConcluir.includes(id),
  );
  if (investimentosEncontrados.length > 0) {
    const dadosValores = investimentosEncontrados.map(inv => ({
      valor: inv.valor,
      taxaRentabilidade: inv.taxaRentabilidade,
    }));
    let msg = '';
    if (dadosValores.length === 1) {
      msg = `O investimento no valor de R$ ${moneyMask(
        dadosValores[0].valor,
      )} (${percentMask(
        dadosValores[0].taxaRentabilidade,
      )}%) foi confirmado por outro investidor. Esse investimento foi removido do seu carrinho.`;
    } else {
      msg = 'Os investimentos nos valores de ';
      // eslint-disable-next-line no-restricted-syntax
      for (const [idx, dado] of dadosValores.entries()) {
        msg += `R$ ${moneyMask(dado.valor)} (${percentMask(
          dado.taxaRentabilidade,
        )}%)`;
        if (idx === dadosValores.length - 1) {
          msg += ' ';
        } else if (idx === dadosValores.length - 2) {
          msg += ' e ';
        } else {
          msg += ', ';
        }
      }
      msg +=
        'foram confirmados por outro investidor. Esses investimentos foram removidos do seu carrinho.';
    }

    atualizarInvestimentosConcluidosFirestore(
      idsInvestimentosAConcluir,
      idInvestidor,
    );

    exibirAlertaFn(msg, 'warning', 8000);

    const idsInvestimentosRemocao = investimentosEncontrados.map(inv => inv.id);
    removerInvestimentos(idsInvestimentosRemocao);
  }
};

export const atualizarInvestimentosParaConclusaoFirestore = (
  idsInvestimentos,
  idInvestidor,
) => {
  const writeBatch = firestore.batch();
  let query = firestore.collection('investimento_historico_visualizacao');

  idsInvestimentos.forEach(id => {
    query = query.where('idNegociacao', '==', id);
  });
  return query.get().then(querySnapshot => {
    const { docs } = querySnapshot;
    const newData = { finishedBy: idInvestidor };
    docs.forEach(doc => {
      if (doc.get('idPessoa') === idInvestidor) {
        writeBatch.update(doc.ref, { ...newData, finished: true });
      } else {
        writeBatch.update(doc.ref, { ...newData, finished: false });
      }
    });
    writeBatch
      .commit()
      .catch(err =>
        console.error(
          `Erro ao atualizar investimentos a serem concluídos no firestore: ${err}`,
        ),
      );
  });
};

export const atualizarInvestimentosConcluidosFirestore = (
  idsInvestimentos,
  idInvestidor,
) => {
  const writeBatch = firestore.batch();
  let query = firestore.collection('investimento_historico_visualizacao');
  idsInvestimentos.forEach(id => {
    query = query.where('idNegociacao', '==', id);
  });
  // query = query.where('idNegociacao', 'in', idsInvestimentos);
  return query.get().then(querySnapshot => {
    const { docs } = querySnapshot;
    const newData = { idPessoa: idInvestidor, finished: true };
    docs.forEach(doc => {
      writeBatch.update(doc.ref, newData);
    });
    writeBatch
      .commit()
      .catch(err =>
        console.error(
          `Erro ao atualizar investimentos concluídos no firestore: ${err}`,
        ),
      );
  });
};
