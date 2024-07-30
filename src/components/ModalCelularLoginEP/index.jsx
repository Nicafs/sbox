import React, { useState } from 'react';

import PropTypes from 'prop-types';

import { Box, Grid, Typography } from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import api from '~/commons/resources/api/general-api';
import { validaDDD } from '~/commons/utils/dddsExistentes';
import { celularMask, onlyNumber } from '~/commons/utils/MaskHandle';

import { useAppGlobal } from '~/providers/AppGlobal';

import TextField from '~/components/MaterialUI/TextField';
import MensagemDeErro from '~/components/MensagemDeErro';
import Modal from '~/components/Modal';

import FormDigitarCodigo from '../ModalValidaContato/FormDigitarCodigo';
import { ButtonArrow, Icone } from './style';

export default function ModalCelularLoginEP({
  open,
  dismissHandler,
  handleAvancar,
}) {
  const {
    organizacao: { id: idOrganizacao },
    actions: { getIcone, exibirAlerta },
  } = useAppGlobal();

  const [celular, setCelular] = useState('');
  const [codigoEnviado, setCodigoEnviado] = useState(false);
  const [codigo, setCodigo] = useState('');
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');
  const [erroValidacao, setErroValidacao] = useState('');
  const [podeReenviar, setPodeReenviar] = useState(true);
  const reenviarCodigoTimeout = 20 * 1000;

  async function enviarCodigo() {
    const params = { celular, idOrganizacao };
    setPodeReenviar(false);
    const res = await api.request('ep/validacao/celular', {
      data: params,
      method: 'POST',
    });
    setTimeout(() => setPodeReenviar(true), reenviarCodigoTimeout);
    return res;
  }

  async function enviarCodigoWrapper() {
    if (checarErros()) {
      try {
        setErro('');
        setLoading(true);
        setCodigoEnviado(false);
        await enviarCodigo();
        setCodigoEnviado(true);
      } catch (err) {
        console.error(err);
        setPodeReenviar(true);
        if (err.erro) {
          exibirAlerta(err.erro);
          setErro(err.erro);
        }
      } finally {
        setLoading(false);
      }
    }
  }

  function confirmarCodigo(localCode) {
    const params = {
      celular,
      codigo: Number(localCode),
    };

    return api.request('ep/validacao/celular/confirmacao', {
      data: params,
      method: 'POST',
    });
  }
  const checarErros = () => {
    if (celular && celular.length === 11) {
      if (validaDDD(celular)) {
        setErroValidacao('');
        return true;
      }
      setErroValidacao('DDD não é válido');
      return false;
    }
    setErroValidacao('Digite um celular válido (99) 9 9999-9999');
    return false;
  };

  async function handleCodigoChange(e) {
    const localCode = onlyNumber(e.target.value);
    setCodigo(localCode);
    setErro('');
    if (localCode && localCode.length === 6) {
      setLoading(true);
      try {
        await confirmarCodigo(localCode);
        setErro('');
        handleAvancar(celular);
      } catch (error) {
        setErro('Código inválido');
        setLoading(false);
        document.getElementById('erro').scrollIntoView();
      }
    }
  }

  return (
    <Modal open={open} dismissHandler={dismissHandler}>
      <Box mt={5} mb={5}>
        <Grid container direction="column" spacing={1}>
          <Grid item container justify="center" xs={12}>
            <Icone alt="icone-sms" src={getIcone('ilustra-sms')} />
          </Grid>
          <Grid container spacing={3} justify="center">
            <Grid item xs={12} md={11}>
              <TextField
                type="tel"
                margin="normal"
                variant="outlined"
                required
                fullWidth
                id="modalInputContato"
                label="Digite o seu celular"
                name="modalInputContato"
                autoFocus
                value={celularMask(celular)}
                inputProps={{ maxLength: 14, minlength: 13 }}
                onChange={e => {
                  const valor = e.target.value;
                  if (codigoEnviado) {
                    setCodigoEnviado(false);
                    setPodeReenviar(true);
                  }
                  setCelular(onlyNumber(valor));
                }}
                enterHandler={enviarCodigoWrapper}
              />
            </Grid>
            {erroValidacao && (
              <Grid item xs={12}>
                {erroValidacao && (
                  <MensagemDeErro id="erro">{erroValidacao}</MensagemDeErro>
                )}
              </Grid>
            )}
            <Grid
              item
              container
              xs={2}
              md={1}
              alignItems="center"
              justify="center"
            >
              <ButtonArrow
                cy-element="btnSubmit"
                loading={loading}
                circle="true"
                primary="true"
                onClick={enviarCodigoWrapper}
                disabled={!podeReenviar}
              >
                <ArrowForwardIcon />
              </ButtonArrow>
            </Grid>
          </Grid>
          {codigoEnviado && (
            <>
              <Grid container item xs={12}>
                <FormDigitarCodigo
                  codigo={codigo}
                  handleCodigoChange={handleCodigoChange}
                />
              </Grid>
              <Box mt={2}>
                <Grid container item xs={12} justify="center">
                  {podeReenviar ? (
                    <Typography
                      onClick={enviarCodigoWrapper}
                      color="primary"
                      style={{ cursor: 'pointer' }}
                      variant="h5"
                    >
                      Reenviar código
                    </Typography>
                  ) : (
                    <Typography color="textSecondary" align="center">
                      Você poderá solicitar um novo código em alguns segundos
                    </Typography>
                  )}
                </Grid>
              </Box>
              <Grid item xs={12}>
                {erro && <MensagemDeErro id="erro">{erro}</MensagemDeErro>}
              </Grid>
            </>
          )}
        </Grid>
      </Box>
    </Modal>
  );
}

ModalCelularLoginEP.propTypes = {
  open: PropTypes.bool.isRequired,
  handleAvancar: PropTypes.func.isRequired,
  dismissHandler: PropTypes.func.isRequired,
};
