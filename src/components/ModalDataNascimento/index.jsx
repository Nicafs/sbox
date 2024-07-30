import React from 'react';

import Box from 'components/MaterialUI/Box';
import Button from 'components/MaterialUI/Button';
import DatePicker from 'components/MaterialUI/DatePicker/DatePicker';
import Grid from 'components/MaterialUI/Grid';
import Modal from 'components/Modal';
import moment from 'moment';
import PropTypes from 'prop-types';
import { useAppGlobal } from 'providers/AppGlobal';

import { Icone, Texto } from './style';

export default function ModalDataNascimento({
  handleAvancar,
  formTitulo,
  loading,
  ...materialProps
}) {
  const [dataNascimento, setDataNascimento] = React.useState(null);
  const {
    actions: { getIcone },
  } = useAppGlobal();

  function handleAvancarWrapper() {
    if (
      dataNascimento &&
      dataNascimento.getDate() &&
      dataNascimento < moment()
    ) {
      handleAvancar({ dataNascimento });
    }
  }

  return (
    <Modal {...materialProps} loading={loading}>
      <Box mt={5} mb={5}>
        <Grid container direction="column" spacing={1}>
          <Grid item container justify="center" xs={12}>
            <Icone alt="icone-calendar" src={getIcone('ilustra-calendario')} />
          </Grid>
          <Grid item xs={12}>
            <Texto>{formTitulo}</Texto>
          </Grid>
          <Grid container item xs={12}>
            <DatePicker
              autoOk
              cyElement="modalInputDataNascimento"
              label="Data de nascimento"
              onChange={e => {
                if (e && e.getDate()) setDataNascimento(e);
              }}
              enterHandler={handleAvancarWrapper}
              valor={dataNascimento}
            />
          </Grid>
          <Grid container direction="row-reverse">
            <Grid item container direction="row-reverse" xs={12} md={3}>
              <Box mt={2}>
                <Button
                  cy-element="modalDataNascimentoBtnSubmit"
                  rounded="true"
                  primary="true"
                  fullWidth
                  onClick={handleAvancarWrapper}
                  loading={loading}
                  disabled={loading}
                >
                  Entrar
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}

ModalDataNascimento.propTypes = {
  handleAvancar: PropTypes.func.isRequired,
};
