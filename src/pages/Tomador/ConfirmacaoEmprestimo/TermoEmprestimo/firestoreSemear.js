import { useFirebase } from '@credito-express/ce-components';

import Negociacao from 'commons/resources/negociacao';
import { getPdf } from 'commons/hooks/Firebase/storage';

const firebase = useFirebase();
const firestore = firebase.firestore();

export default function buscarDocumentosSemear(
  idNegociacao,
  paramDoc,
  setConteudoDocumento,
) {
  Negociacao.buscarDocumentoTomadorEp(idNegociacao, {
    tipoDocumento: paramDoc,
  });
  setConteudoDocumento('');

  firestore
    .collection('negociacao')
    .doc(idNegociacao)
    .onSnapshot(
      async doc => {
        const idPessoa = doc.data()?.idPessoa;
        let documento;
        let nomeDocumento;
        if (paramDoc === 'cedula') {
          documento = doc.data()?.documentosSemear?.contrato;
          nomeDocumento = 'CEDULA.pdf';
        }
        if (paramDoc === 'carne') {
          documento = doc.data()?.documentosSemear?.boleto;
          nomeDocumento = 'CARNE.pdf';
        }
        if (documento?.status === 'SUCESSO') {
          const url = `/pessoa/${idPessoa}/${idNegociacao}/documentos_semear/${nomeDocumento}`;
          try {
            const linkDocumento = await getPdf(url);
            setConteudoDocumento(linkDocumento);
          } catch (ex) {
            console.error('Erro no storage', ex);
          }
        } else {
          console.error(
            `Erro na API Semear: ${documento?.motivoErro.codigo} - ${documento?.motivoErro.descricao}`,
          );
        }
      },
      err => {
        console.error(`Erro no firebase: ${err}`);
      },
    );
}
