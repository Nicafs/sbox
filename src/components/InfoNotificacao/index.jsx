import React, { useEffect } from 'react';

import Box from 'components/MaterialUI/Box';
import Button from 'components/MaterialUI/Button';
import Grid from 'components/MaterialUI/Grid';
import IconButton from 'components/MaterialUI/IconButton';
import Typography from 'components/MaterialUI/Typography';
import Modal from 'components/Modal';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Tooltip from '@material-ui/core/Tooltip';
import CloseIcon from '@material-ui/icons/Close';

const CloseIconStyled = styled(CloseIcon)`
  width: ${({ theme }) => theme.spacing(4)}px;
  height: ${({ theme }) => theme.spacing(4)}px;
`;

const TypographyTitleStyled = styled(Typography)`
  text-align: center;
  text-transform: uppercase;
  font-weight: bold;
  color: ${({ theme }) => theme.palette.primary.dark};
`;

const TypographyMsgStyled = styled(Typography)`
  text-align: center;
`;

export default function InfoNotificacao({
  titulo,
  mensagem,
  acao,
  handleClose,
}) {
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    setOpen(true);
  }, [titulo]);

  const onClose = () => {
    setOpen(false);
    handleClose();
  };

  const handlerAcao = () => {
    onClose();
    acao.handler();
  };

  return (
    <Modal dismissHandler={onClose} open={open} maxWidth="xs">
      <Box p={2}>
        <Grid container direction="column" spacing={1}>
          <Grid item xs={12}>
            <Grid container justify="flex-end">
              <Tooltip title="Fechar" placement="top-end">
                <IconButton onClick={onClose} style={{ padding: '0px' }}>
                  <CloseIconStyled />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <TypographyTitleStyled variant="h5">{titulo}</TypographyTitleStyled>
          </Grid>
          <Grid item xs={12}>
            <TypographyMsgStyled variant="h6">{mensagem}</TypographyMsgStyled>
          </Grid>
          {acao && (
            <Grid item xs={12}>
              <Grid container justify="center">
                <Grid item xs={12} md={4}>
                  <Button
                    cy-element="modalAcaoNotificacao"
                    rounded="true"
                    primary="true"
                    fullWidth
                    onClick={handlerAcao}
                    loading={false}
                  >
                    {acao.nome}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Box>
    </Modal>
  );
}

InfoNotificacao.defaultProps = {
  acao: undefined,
};

/* eslint-disable react/forbid-prop-types */
InfoNotificacao.propTypes = {
  titulo: PropTypes.string.isRequired,
  mensagem: PropTypes.string.isRequired,
  acao: PropTypes.object,
  handleClose: PropTypes.func.isRequired,
};
