import React from 'react';

import PropTypes from 'prop-types';
import { useAppGlobal } from 'providers/AppGlobal';
import styled from 'styled-components';

import Box from '../../MaterialUI/Box';
import Button from '../../MaterialUI/Button';
import DatePicker from '../../MaterialUI/DatePicker/DatePicker';
import Grid from '../../MaterialUI/Grid';
import Modal from '../../Modal';

const Icone = styled.img`
  width: 192px;
`;

const Texto = styled.p`
  font-size: 16px;
`;

export default function ModalDataNascimento({
  open,
  dataNascimento,
  setDataNascimento,
  handleAvancar,
  loading,
  dismissHandler,
}) {
  const {
    actions: { getIcone },
  } = useAppGlobal();

  return (
    <Modal dismissHandler={dismissHandler} open={open} maxWidth="sm">
      <Box mt={5} mb={5}>
        <Grid container direction="column" spacing={1}>
          <Grid item container justify="center" xs={12}>
            <Icone
              alt="icone-calendario"
              src={getIcone('ilustra-calendario')}
            />
          </Grid>
          <Grid item xs={12}>
            <Texto>Qual sua data de nascimento?</Texto>
          </Grid>
          <Grid container item xs={12}>
            <DatePicker
              autoOk
              cyElement="modalInputDataNascimento"
              label="Data de nascimento"
              valor={dataNascimento}
              onChange={e => {
                if (e && e.getDate()) setDataNascimento(e);
              }}
              enterHandler={handleAvancar}
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
                  onClick={handleAvancar}
                  loading={loading}
                >
                  Avançar
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}
/* eslint-disable react/forbid-prop-types */
ModalDataNascimento.propTypes = {
  open: PropTypes.bool.isRequired,
  dataNascimento: PropTypes.object,
  dismissHandler: PropTypes.func.isRequired,
  handleAvancar: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  setDataNascimento: PropTypes.func.isRequired,
};

ModalDataNascimento.defaultProps = {
  dataNascimento: undefined,
};
