import React from 'react';

import Button from 'components/MaterialUI/Button';
import Grid from 'components/MaterialUI/Grid';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ButtonCancelarStyled = styled(Button)`
  background-color: ${({ theme }) => theme.palette.error.main};
`;

const BotoesNavegacao = props => {
  const {
    formikProps,
    activeStep,
    handleBack,
    steps,
    handleCancelar,
    goToLastStep,
  } = props;
  const { isValid, isSubmitting, handleSubmit, values } = formikProps;

  const { id } = values;

  const isDisabled = !isValid || isSubmitting;

  return (
    <Grid container spacing={2}>
      <Grid item>
        <ButtonCancelarStyled onClick={handleCancelar} variant="contained">
          Cancelar
        </ButtonCancelarStyled>
      </Grid>
      {activeStep > 0 && (
        <Grid item>
          <Button
            disabled={activeStep === 0}
            onClick={() => handleBack(formikProps)}
            variant="contained"
          >
            Voltar
          </Button>
        </Grid>
      )}
      <Grid item>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={isDisabled}
          name={activeStep !== steps.length - 1 ? 'prox' : 'final'}
        >
          {activeStep !== steps.length - 1 ? 'Próximo' : 'Finalizar'}
        </Button>
      </Grid>
      {activeStep !== steps.length - 1 && goToLastStep && id && (
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={goToLastStep}
            disabled={isDisabled}
            name="go-to-last"
          >
            Concluir
          </Button>
        </Grid>
      )}
    </Grid>
  );
};

/* eslint-disable react/forbid-prop-types */
BotoesNavegacao.propTypes = {
  formikProps: PropTypes.object.isRequired,
  activeStep: PropTypes.number.isRequired,
  handleBack: PropTypes.func.isRequired,
  handleCancelar: PropTypes.func.isRequired,
  steps: PropTypes.array.isRequired,
};

export default BotoesNavegacao;
