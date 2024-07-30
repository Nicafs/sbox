import React from 'react';

import Button from 'components/MaterialUI/Button';
import PropTypes from 'prop-types';

import { Hidden } from '@material-ui/core';

import Detalhes from './Detalhes';
import {
  ArrowBackIconStyled,
  BackgroundContainerStyled,
  ContainerStyled,
  FormContentStyled,
  ContentStyled,
  BackButtonContainerStyled,
} from './style';

const FormularioPublicoContainer = ({
  formulario,
  backgroundConteudo,
  headerMobile,
  btnBackClickHandler,
  formJustifyContent,
  formAlignItems,
  formJustifyContentMobile,
  formAlignItemsMobile,
}) => (
  <ContainerStyled>
    {headerMobile && <Hidden mdUp>{headerMobile}</Hidden>}
    <ContentStyled>
      <FormContentStyled
        formJustifyContent={formJustifyContent}
        formAlignItems={formAlignItems}
        formJustifyContentMobile={formJustifyContentMobile}
        formAlignItemsMobile={formAlignItemsMobile}
      >
        {btnBackClickHandler && (
          <BackButtonContainerStyled>
            <Button
              name="botao-voltar"
              rounded="true"
              onClick={btnBackClickHandler}
            >
              <ArrowBackIconStyled />
            </Button>
          </BackButtonContainerStyled>
        )}
        {formulario}
      </FormContentStyled>
      <BackgroundContainerStyled>
        {backgroundConteudo || <Detalhes />}
      </BackgroundContainerStyled>
    </ContentStyled>
  </ContainerStyled>
);

FormularioPublicoContainer.propTypes = {
  formulario: PropTypes.node.isRequired,
  backgroundConteudo: PropTypes.node,
  headerMobile: PropTypes.node,
  formJustifyContent: PropTypes.string,
  formAlignItems: PropTypes.string,
  formJustifyContentMobile: PropTypes.string,
  formAlignItemsMobile: PropTypes.string,
};

FormularioPublicoContainer.defaultProps = {
  backgroundConteudo: undefined,
  headerMobile: undefined,
  formJustifyContent: 'center',
  formAlignItems: 'center',
  formJustifyContentMobile: null,
  formAlignItemsMobile: 'flex-start',
};

export default FormularioPublicoContainer;
