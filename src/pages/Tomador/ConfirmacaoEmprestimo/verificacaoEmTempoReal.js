import { app as firebase } from '@credito-express/ce-components';

const firestore = firebase.firestore();

const ehAmbienteE2E = process.env.REACT_APP_ENV === 'e2e';

export const verificacaoNegociacaoFinalizadaTempoReal = (
  idNegociacao,
  steps,
  setActiveStep,
) => {
  if (ehAmbienteE2E) {
    const unsubscribeFn = () => {};
    return unsubscribeFn;
  }

  const unsubscribeFn = verificaNegociacaoFinalizada(
    idNegociacao,
    steps,
    setActiveStep,
  );
  return unsubscribeFn;
};

const buscaNegociacaoFirestoreQuery = idNegociacao => {
  return firestore.collection('negociacao').where('id', '==', idNegociacao);
};

const verificaNegociacaoFinalizada = (negociacaoId, steps, setActiveStep) => {
  const query = buscaNegociacaoFirestoreQuery(negociacaoId);
  const unsubscribeFn = query.onSnapshot(querySnapshot => {
    querySnapshot.docChanges().forEach(change => {
      if (change.type === 'added' || change.type === 'modified') {
        const { status: statusNegociacaoFirestore } = change.doc.data();
        const listaStatusNegociacaoConfirmada = ['ANALISANDO_DOCUMENTOS'];
        const negociacaoEstaConfirmada = listaStatusNegociacaoConfirmada.includes(
          statusNegociacaoFirestore,
        );
        if (negociacaoEstaConfirmada) {
          setActiveStep(steps.length - 1);
        }
      }
    });
  });
  return unsubscribeFn;
};
