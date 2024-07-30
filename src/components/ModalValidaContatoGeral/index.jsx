import React, { useEffect } from 'react';

import Box from 'components/MaterialUI/Box';
import Button from 'components/MaterialUI/Button';
import Grid from 'components/MaterialUI/Grid';
import TextField from 'components/MaterialUI/TextField';
import Typography from 'components/MaterialUI/Typography';
import MensagemDeErro from 'components/MensagemDeErro';
import Modal from 'components/Modal';
import PropTypes from 'prop-types';
import { useAppGlobal } from 'providers/AppGlobal';

import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import ENDPOINTS from '../../commons/constants/api-constants';
import api from '../../commons/resources/api/general-api';
import {
  celularMask,
  codeConfirmationMask,
  onlyNumber,
} from '../../commons/utils/MaskHandle';
import { ButtonArrow, Icone, Texto } from './style';

export default function ModalValidaContato({
  contato,
  handleAvancar,
  tipoValidacao, // EMAIL, TELEFONE
  onContatoChange,
  open,
  ...otherProps
}) {
  const {
    actions: { getIcone, exibirAlerta },
  } = useAppGlobal();
  const [contatoInput, setContatoInput] = React.useState(contato);
  const [codigoEnviado, setCodigoEnviado] = React.useState(false);
  const [codigo, setCodigo] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [erro, setErro] = React.useState('');
  const [podeReenviar, setPodeReenviar] = React.useState(true);
  const reenviarCodigoTimeout = 20 * 1000;
  const IconeAsset =
    tipoValidacao === 'EMAIL'
      ? getIcone('ilustra-email')
      : getIcone('ilustra-sms');
  const contatoInputLabel =
    tipoValidacao === 'EMAIL'
      ? 'Digite seu e-mail'
      : 'Digite o número do seu celular';
  const contatoInputTipo = tipoValidacao === 'EMAIL' ? 'email' : 'tel';

  useEffect(() => {
    if (contato && open) {
      enviarCodigoWrapper();
    }
  }, [contato, open]); // eslint-disable-line react-hooks/exhaustive-deps

  async function enviarCodigo() {
    let params = {};
    let endpoint = '';
    if (tipoValidacao === 'EMAIL') {
      params = {
        email: contatoInput,
      };
      endpoint = ENDPOINTS.EMAIL_CONFIRMACAO;
    } else {
      params = {
        telefone: contatoInput,
      };
      endpoint = ENDPOINTS.TELEFONE_CONFIRMACAO;
    }
    onContatoChange(contatoInput);
    setPodeReenviar(false);
    const res = await api.request(endpoint, {
      data: params,
      method: 'POST',
    });
    setTimeout(() => setPodeReenviar(true), reenviarCodigoTimeout);
    return res;
  }

  async function enviarCodigoWrapper() {
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

  function confirmarCodigo() {
    const params = {
      codigo: Number(onlyNumber(codigo)),
    };
    const endpoint =
      tipoValidacao === 'EMAIL'
        ? ENDPOINTS.EMAIL_CONFIRMACAO_CODIGO
        : ENDPOINTS.TELEFONE_CONFIRMACAO_CODIGO;
    return api.request(endpoint, {
      data: params,
      method: 'POST',
    });
  }

  async function handleAvancarForm() {
    if (onlyNumber(codigo).length !== 6) {
      return setErro('Código inválido');
    }
    try {
      setErro('');
      await confirmarCodigo();
      handleAvancar(contatoInput);
    } catch (err) {
      setErro('Código inválido');
    }
  }

  return (
    <Modal {...otherProps} open={open}>
      <Box mt={5} mb={5}>
        <Grid container direction="column" spacing={1}>
          <Grid item container justify="center" xs={12}>
            <Icone alt="icone-sms" src={IconeAsset} />
          </Grid>
          <Grid container spacing={3} justify="center">
            <Grid item xs={12} md={11}>
              <TextField
                cy-element="modalInputContato"
                type={contatoInputTipo}
                margin="normal"
                variant="outlined"
                required
                fullWidth
                id={tipoValidacao.toLowerCase()}
                label={contatoInputLabel}
                name={tipoValidacao.toLowerCase()}
                autoFocus
                value={
                  tipoValidacao === 'TELEFONE'
                    ? celularMask(contatoInput)
                    : contatoInput
                }
                onChange={evt => {
                  const valor = evt.target.value;
                  if (codigoEnviado) {
                    setCodigoEnviado(false);
                    setPodeReenviar(true);
                  }
                  setContatoInput(
                    tipoValidacao === 'TELEFONE' ? onlyNumber(valor) : valor,
                  );
                }}
                enterHandler={enviarCodigoWrapper}
              />
            </Grid>
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
              <Grid item xs={12}>
                <Texto>
                  Insira o código que enviamos para o contato informado
                </Texto>
              </Grid>
              <Grid container item xs={12}>
                <TextField
                  cy-element="modalInputCodigo"
                  type="tel"
                  margin="normal"
                  variant="outlined"
                  required
                  fullWidth
                  id="codigo"
                  label="Código de segurança"
                  name="codigo"
                  autoFocus
                  value={codeConfirmationMask(codigo)}
                  onChange={evt => setCodigo(evt.target.value)}
                  enterHandler={handleAvancarForm}
                />
              </Grid>
              {onlyNumber(codigo).length === 6 && (
                <Grid container justify="center">
                  <Grid item container justify="center" xs={12} md={3}>
                    <Box mt={2} style={{ width: '100%' }}>
                      <Button
                        name="botaoAvancar"
                        cy-element="modalBtnSubmit"
                        rounded="true"
                        primary="true"
                        fullWidth
                        onClick={handleAvancarForm}
                        loading={loading}
                      >
                        Avançar
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              )}
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
                {erro && <MensagemDeErro>{erro}</MensagemDeErro>}
              </Grid>
            </>
          )}
        </Grid>
      </Box>
    </Modal>
  );
}

ModalValidaContato.propTypes = {
  contato: PropTypes.string,
  tipoValidacao: PropTypes.string.isRequired,
  handleAvancar: PropTypes.func.isRequired,
  onContatoChange: PropTypes.func,
};

ModalValidaContato.defaultProps = {
  contato: '',
  onContatoChange: () => {},
};
