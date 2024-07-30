import React from 'react';

import Grid from '../../MaterialUI/Grid';
import Typography from '../../MaterialUI/Typography';

const BotaoReenviarCodigo = ({
  tipoValidacao,
  podeReenviar,
  enviarCodigoWrapper,
}) => {
  if (tipoValidacao === 'EMAIL') {
    return (
      <Grid container item xs={12} justify="center">
        {podeReenviar ? (
          <Typography
            name="btnTextoReenviarCodigo"
            onClick={enviarCodigoWrapper}
            color="primary"
            style={{ cursor: 'pointer' }}
            variant="h5"
          >
            Reenviar E-mail
          </Typography>
        ) : (
          <Typography color="textSecondary" align="center" variant="subtitle2">
            Caso você não receba o e-mail de confirmação em alguns minutos,
            verifique a sua caixa de spam ou repita o processo
          </Typography>
        )}
      </Grid>
    );
  }
  return (
    <Grid container item xs={12} justify="center">
      {podeReenviar ? (
        <Typography
          name="btnTextoReenviarCodigo"
          onClick={enviarCodigoWrapper}
          color="primary"
          style={{ cursor: 'pointer' }}
          variant="h5"
        >
          Reenviar código
        </Typography>
      ) : (
        <Typography color="textSecondary" align="center" variant="subtitle2">
          Você poderá solicitar um novo código em alguns segundos
        </Typography>
      )}
    </Grid>
  );
};

export default BotaoReenviarCodigo;
