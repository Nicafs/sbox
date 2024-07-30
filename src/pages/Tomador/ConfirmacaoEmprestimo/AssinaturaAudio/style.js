import styled from 'styled-components';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const ImgPessoaFalandoStyled = styled.img`
  width: 70%;
  ${({ theme }) => theme.breakpoints.up('md')} {
    width: 100%;
  }
  ${({ theme }) => theme.breakpoints.up('lg')} {
    width: 80%;
  }
  ${({ theme }) => theme.breakpoints.up('xl')} {
    width: 60%;
  }
  margin-bottom: ${({ theme }) => theme.spacing(1)}px;
`;

const TypographyInnerHeaderStyled = styled(Typography)`
  text-align: center;
  color: ${({ theme }) => theme.palette.primary.selected};
  font-weight: bold;
  padding-top: ${({ theme }) => theme.spacing(6)}px;
`;

const TypographyInnerSubHeaderStyled = styled(Typography)`
  text-align: center;
  color: ${({ theme }) => theme.palette.grey[700]};
`;

const GridInnerHeaderStyled = styled(Grid)`
  padding: 5%;
  padding-top: 0px;
  ${({ theme }) => theme.breakpoints.up('sm')} {
    padding-left: 10%;
    padding-right: 10%;
  }
  ${({ theme }) => theme.breakpoints.up('md')} {
    padding-left: 20%;
    padding-right: 20%;
  }
  padding-bottom: 0;
`;

const GridInnerBodyStyled = styled(Grid)`
  padding: 5%;
  ${({ theme }) => theme.breakpoints.up('sm')} {
    padding: 10%;
  }
  ${({ theme }) => theme.breakpoints.up('md')} {
    padding: 4%;
    padding-top: 5%;
  }
`;

const GridGravadorLoadingStyled = styled(Grid)`
  height: 100%;
`;

export {
  ImgPessoaFalandoStyled,
  TypographyInnerHeaderStyled,
  TypographyInnerSubHeaderStyled,
  GridInnerHeaderStyled,
  GridInnerBodyStyled,
  GridGravadorLoadingStyled,
};

export const MsgPalavraChaveStyled = styled.ul`
  padding: 10px 0px;
`;
