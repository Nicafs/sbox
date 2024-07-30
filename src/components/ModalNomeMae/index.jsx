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

export default function ModalNomeMae({
  handleAvancar,
  formTitulo,
  loading,
  ...materialProps
}) {
  const [nomeMae, setNomeMae] = React.useState('');
  const [erro, setErro] = React.useState('');
  const {
    actions: { getIcone },
  } = useAppGlobal();

  const botaoAvancarVisivel = nomeMae && !erro;

  useEffect(() => {
    if (nomeMae) {
      checarErros();
    }
  }, [nomeMae]); // eslint-disable-line react-hooks/exhaustive-deps

  const checarErros = () => {
    if (nomeMae && nomeMae.length > 6 && nomeMae.split(' ').length > 1) {
      setErro('');
    } else {
      setErro('Digite o nome completo da sua mãe conforme RG');
    }
  };

  const handleAvancarWrapper = () => {
    handleAvancar({ nomeMae });
  };

  return (
    <Modal {...materialProps} loading={loading}>
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
              id="nomeMae"
              label="Nome da sua mãe conforme RG"
              name="modalInputNomeMae"
              cy-element="modalInputNomeMae"
              autoFocus
              value={nomeMae}
              onChange={evt =>
                setNomeMae((evt.target.value || '').toUpperCase())
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
                    cy-element="modalNomeMaeBtnSubmit"
                    rounded="true"
                    primary="true"
                    fullWidth
                    onClick={handleAvancarWrapper}
                    loading={loading}
                    disabled={loading}
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

ModalNomeMae.propTypes = {
  handleAvancar: PropTypes.func.isRequired,
};
