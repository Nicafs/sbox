import React, { useEffect } from 'react';

import Box from 'components/MaterialUI/Box';
import Button from 'components/MaterialUI/Button';
import Grid from 'components/MaterialUI/Grid';
import Modal from 'components/Modal';
import PropTypes from 'prop-types';
import { useAppGlobal } from 'providers/AppGlobal';

import Typography from '@material-ui/core/Typography';

import TextField from '../MaterialUI/TextField';
import { Icone, Texto, BotoesAcaoContainer } from './style';

export default function ModalNomeCompleto({
  handleAvancar,
  formTitulo,
  ...materialProps
}) {
  const [nomeCompleto, setNomeCompleto] = React.useState('');
  const [erro, setErro] = React.useState('');
  const {
    actions: { getIcone },
  } = useAppGlobal();

  const botaoAvancarVisivel = nomeCompleto && !erro;

  useEffect(() => {
    if (nomeCompleto) {
      checarErros();
    }
  }, [nomeCompleto]); // eslint-disable-line react-hooks/exhaustive-deps

  const checarErros = () => {
    if (
      nomeCompleto &&
      nomeCompleto.length > 6 &&
      nomeCompleto.split(' ').length > 1
    ) {
      setErro('');
    } else {
      setErro('Digite o seu nome completo conforme RG');
    }
  };

  const handleAvancarWrapper = () => {
    handleAvancar({ nomeCompleto });
  };

  return (
    <Modal {...materialProps}>
      <Box mt={2} mb={4}>
        <Grid container direction="column" spacing={1}>
          <Grid item container justify="center" xs={12}>
            <Icone alt="icone-seguranca" src={getIcone('icone-seguranca')} />
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
              id="nomeCompleto"
              label="Seu nome completo conforme RG"
              name="modalInputNomeCompleto"
              cy-element="modalInputNomeCompleto"
              autoFocus
              value={nomeCompleto}
              onChange={evt =>
                setNomeCompleto((evt.target.value || '').toUpperCase())
              }
              enterHandler={handleAvancarWrapper}
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
                    cy-element="modalNomeCompletoBtnSubmit"
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

ModalNomeCompleto.propTypes = {
  handleAvancar: PropTypes.func.isRequired,
};
