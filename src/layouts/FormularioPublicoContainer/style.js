import styled, { css } from 'styled-components';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

export const ContainerStyled = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  flex-direction: column;
`;

export const ContentStyled = styled.div`
  display: flex;
  flex: 1;
  background: ${({ theme }) => theme.palette.common.white};

  ${({ theme }) => theme.breakpoints.down('sm')} {
    padding: 15px;
  }
`;

export const FormContainerStyled = styled.div`
  min-width: 45%;
  max-width: 800px;
  display: flex;
  flex-direction: column;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    flex: 1;
  }
`;

export const FormContentStyled = styled.div`
  display: flex;
  flex: 1;

  ${({ formJustifyContent }) =>
    formJustifyContent &&
    css`
      justify-content: ${formJustifyContent};
    `}

  ${({ formAlignItems }) =>
    formAlignItems &&
    css`
      align-items: ${formAlignItems};
    `}

  ${({ theme }) => theme.breakpoints.down('sm')} {
    ${({ formJustifyContentMobile }) =>
      formJustifyContentMobile &&
      css`
        justify-content: ${formJustifyContentMobile};
      `}
    ${({ formAlignItemsMobile }) =>
      formAlignItemsMobile &&
      css`
        align-items: ${formAlignItemsMobile};
      `}
  }
`;

export const BackgroundContainerStyled = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.palette.primary.main};

  ${({ theme }) => theme.breakpoints.down('sm')} {
    display: none;
  }
`;

export const ArrowBackIconStyled = styled(ArrowBackIcon)`
  color: ${({ theme }) => theme.palette.text.secondary};
  font-size: 32px;
`;

export const BackButtonContainerStyled = styled.div`
  padding: 30px;
  position: absolute;
  left: 0px;
  top: 0px;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    display: none;
  }
`;
