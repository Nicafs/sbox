import React from 'react';

import Box from 'components/MaterialUI/Box';
import Button from 'components/MaterialUI/Button';
import Grid from 'components/MaterialUI/Grid';
import Modal from 'components/Modal';
import PropTypes from 'prop-types';
import { useAppGlobal } from 'providers/AppGlobal';
import Typography from '@material-ui/core/Typography';

import pushRota from '../../routes/push';
import TextField from '../MaterialUI/TextField';
import {
  BotoesAcaoContainer,
  Icone,
  LinkEsqueciSenhaStyled,
  Texto,
} from './style';

export default function ModalSenha({ handleAvancar, loading, ...materialProps }) {
  const [erro, setErro] = React.useState('');
  const [senha, setSenha] = React.useState('');
  const [loadingSenha, setLoadingSenha] = React.useState(false);

  const {
    actions: { getIcone },
  } = useAppGlobal();

  const handleAvancarWrapper = () => {
    if (senha && senha.length >= 6) {
      setErro('');
      setLoadingSenha(true);
      handleAvancar({ senha });
      setLoadingSenha(false);
    } else {
      setErro('Digite uma senha com mais de 6 caracteres');
    }
  };

  const esqueciMinhaSenhaHandler = () => pushRota('/auth/senha/reset');

  return (
    <Modal {...materialProps} loading={loading}>
      <Box mt={2} mb={4}>
        <Grid container direction="column" spacing={1}>
          <Grid item container justify="center" xs={12}>
            <Icone alt="icone-seguranca" src={getIcone('icone-seguranca')} />
          </Grid>
          <Grid item xs={12}>
            <Texto>Digite sua senha</Texto>
          </Grid>
          <Grid container item xs={12}>
            <TextField
              type="password"
              margin="normal"
              variant="outlined"
              required
              fullWidth
              id="senha"
              label="Digite sua senha"
              name="modalInputSenha"
              cy-element="modalInputSenha"
              autoFocus
              value={senha}
              onChange={evt => setSenha(evt.target.value)}
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
          <Box mt={2}>
            <BotoesAcaoContainer
              container
              justify="space-between"
              align="center"
              spacing={2}
            >
              <Grid item>
                <LinkEsqueciSenhaStyled
                  href="#"
                  color="secondary"
                  onClick={esqueciMinhaSenhaHandler}
                >
                  Esqueci minha senha
                </LinkEsqueciSenhaStyled>
              </Grid>
              <Grid item>
                <Button
                  cy-element="modalSenhaBtnSubmit"
                  rounded="true"
                  primary="true"
                  fullWidth
                  onClick={handleAvancarWrapper}
                  loading={loading || loadingSenha}
                  disabled={loading || loadingSenha}
                >
                  Entrar
                </Button>
              </Grid>
            </BotoesAcaoContainer>
          </Box>
        </Grid>
      </Box>
    </Modal>
  );
}

ModalSenha.propTypes = {
  handleAvancar: PropTypes.func.isRequired,
};
