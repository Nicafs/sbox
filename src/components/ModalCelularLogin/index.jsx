import React, { useEffect } from 'react';

import Box from 'components/MaterialUI/Box';
import Button from 'components/MaterialUI/Button';
import Grid from 'components/MaterialUI/Grid';
import Modal from 'components/Modal';
import PropTypes from 'prop-types';
import { useAppGlobal } from 'providers/AppGlobal';

import Typography from '@material-ui/core/Typography';

import { validaDDD } from '~/commons/utils/dddsExistentes';

import { onlyNumbers } from '../../commons/utils/ManipulacaoUtils';
import { celularMask } from '../../commons/utils/MaskHandle';
import TextField from '../MaterialUI/TextField';
import { Icone, Texto, BotoesAcaoContainer } from './style';

export default function ModalCelularLogin({
  handleAvancar,
  formTitulo,
  ...materialProps
}) {
  const [celular, setCelular] = React.useState('');
  const [erro, setErro] = React.useState('');
  const {
    actions: { getIcone },
  } = useAppGlobal();

  const botaoAvancarVisivel = celular && !erro;

  useEffect(() => {
    if (celular) {
      checarErros();
    }
  }, [celular]); // eslint-disable-line react-hooks/exhaustive-deps

  const checarErros = () => {
    if (celular && celular.length === 11) {
      if (validaDDD(celular)) {
        setErro('');
      } else {
        setErro('DDD não é válido');
      }
    } else {
      setErro('Digite um celular válido (99) 9 9999-9999');
    }
  };

  const handleAvancarWrapper = () => {
    handleAvancar(celular);
  };

  return (
    <Modal {...materialProps}>
      <Box mt={2} mb={4}>
        <Grid container direction="column" spacing={1}>
          <Grid item container justify="center" xs={12}>
            <Icone alt="ilustra-sms" src={getIcone('ilustra-sms')} />
          </Grid>
          <Grid item xs={12}>
            <Texto>{formTitulo}</Texto>
          </Grid>
          <Grid container item xs={12}>
            <TextField
              margin="normal"
              variant="outlined"
              required
              fullWidth
              id="celular"
              label="Digite o número do seu celular"
              name="modalInputCelular"
              cy-element="modalInputCelular"
              autoFocus
              value={celularMask(celular)}
              onChange={evt => setCelular(onlyNumbers(evt.target.value || ''))}
              enterHandler={handleAvancarWrapper}
              type="tel"
            />
          </Grid>
          {erro && (
            <Box mt={2} mb={2}>
              <Typography color="error" variant="body1" align="center">
                {erro}
              </Typography>
            </Box>
          )}
          {botaoAvancarVisivel && (
            <Box mt={2}>
              <BotoesAcaoContainer
                container
                justify="space-between"
                align="center"
                spacing={2}
              >
                <Grid item>
                  <Button
                    cy-element="modalNomeMaeBtnSubmit"
                    rounded="true"
                    primary="true"
                    fullWidth
                    onClick={handleAvancarWrapper}
                  >
                    Entrar
                  </Button>
                </Grid>
              </BotoesAcaoContainer>
            </Box>
          )}
        </Grid>
      </Box>
    </Modal>
  );
}

ModalCelularLogin.propTypes = {
  handleAvancar: PropTypes.func.isRequired,
  formTitulo: PropTypes.string.isRequired,
};
