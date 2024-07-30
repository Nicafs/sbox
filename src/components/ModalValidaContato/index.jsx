import React, { useEffect } from 'react';

import confirmarCodigo from 'commons/resources/confirmacaoContato';
import Box from 'components/MaterialUI/Box';
import Modal from 'components/Modal';
import { useAppGlobal } from 'providers/AppGlobal';

import { onlyNumber } from '../../commons/utils/MaskHandle';
import { useSimulacaoState } from '../../pages/Tomador/SolicitacaoEmprestimo/state';
import FormValidacaoContato from './FormValidacaoContato';

let reenviarInterval = null;
let verificaEmailInterval = null;
export default function ModalValidaContato({ formik, ...otherProps }) {
  const {
    actions: { getIcone },
  } = useAppGlobal();
  const [
    { confirmacaoContato },
    { etapaContato, enviarCodigoContato, verificarConfirmacaoContato },
  ] = useSimulacaoState();

  const [codigo, setCodigo] = React.useState('');
  const [erro, setErro] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [podeReenviar, setPodeReenviar] = React.useState(false);
  const { modal } = confirmacaoContato;
  const { enviado: validacaoEnviada } = modal;

  const IconeAsset =
    modal.tipo === 'EMAIL'
      ? getIcone('ilustra-email')
      : getIcone('ilustra-sms');
  const contatoInputLabel =
    modal.tipo === 'EMAIL'
      ? 'Digite seu e-mail'
      : 'Digite o número do seu celular';
  const contatoInputTipo = modal.tipo === 'EMAIL' ? 'email' : 'tel';

  useEffect(() => {
    if (validacaoEnviada) {
      reenviarInterval = setInterval(() => setPodeReenviar(true), 20 * 1000);
      return () => {
        if (reenviarInterval) {
          clearInterval(reenviarInterval);
        }
      };
    }
    setPodeReenviar(false);
  }, [validacaoEnviada]);

  async function handleCodigoChange(e) {
    const localCode = onlyNumber(e.target.value);
    setCodigo(localCode);
    if (localCode && localCode.length === 6) {
      setLoading(true);
      try {
        await confirmarCodigo('SMS', localCode);
        setErro('');
        etapaContato(formik.values);
      } catch (error) {
        setErro('Código inválido');
        setLoading(false);
        document.getElementById('erro').scrollIntoView();
      }
    }
  }

  function enviarCodigo() {
    enviarCodigoContato(formik.values[modal.campo]);
  }

  function handleChangeContato(nextValue = '') {
    formik.setFieldValue(modal.campo, nextValue);
  }

  const value = formik.values[modal.campo];
  const { [value]: confirmacao = {} } = confirmacaoContato;
  const { confirmado, enviado } = confirmacao;

  useEffect(() => {
    setLoading(false);
    if (modal.tipo === 'EMAIL') {
      verificaEmailInterval = setInterval(() => {
        verificarConfirmacaoContato(value);
      }, 5 * 1000);
      return () => clearInterval(verificaEmailInterval);
    }
  }, [modal.tipo]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (confirmado) {
      if (verificaEmailInterval) {
        clearInterval(verificaEmailInterval);
      }
      etapaContato(formik.values);
    }
  }, [confirmado]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!modal || !modal.campo || !modal.open) {
    return null;
  }

  return (
    <Modal {...otherProps} open={modal.open}>
      <Box mt={5} mb={5}>
        <FormValidacaoContato
          handleChangeContato={handleChangeContato}
          tipoValidacao={modal.tipo}
          contatoInputTipo={contatoInputTipo}
          contatoInput={formik.values[modal.campo]}
          contatoEnviado={enviado}
          enviarCodigoWrapper={enviarCodigo}
          loading={loading}
          codigo={codigo}
          handleCodigoChange={handleCodigoChange}
          podeReenviar={podeReenviar}
          contatoInputLabel={contatoInputLabel}
          codigoEnviado={enviado}
          erro={erro}
          iconeAsset={IconeAsset}
          validacaoEnviada={validacaoEnviada}
          formik={formik}
          nomeCampoPersonalizado={modal.campo}
        />
      </Box>
    </Modal>
  );
}
