import styled, { css } from 'styled-components';

import Grid from '@material-ui/core/Grid';

const AvisosContainer = styled(Grid)`
  padding: 0px 20px;
  ${({ theme }) => theme.breakpoints.down('md')} {
    margin-top: 50px;
  }
`;

const TituloSelfie = styled.h1`
  color: ${({ theme }) => theme.palette.primary.selected};
  font-size: 24px;
`;

const SubTituloSelfie = styled.h1`
  color: ${({ theme }) => theme.palette.grey[600]};
  font-size: 18px;
  margin: 10px 0px;
  font-weight: normal;
`;

const ImagemCentral = styled.img`
  width: 300px;
  margin: 30px 0;
  border-radius: 5px;
  ${({ uploadconcluido, theme }) =>
    uploadconcluido &&
    css`
      border-top: 8px solid ${theme.palette.primary.main};
    `}

  ${({ theme }) => theme.breakpoints.down('md')} {
    width: 256px;
    height: 256px;
  }
`;

export { ImagemCentral, TituloSelfie, SubTituloSelfie, AvisosContainer };
