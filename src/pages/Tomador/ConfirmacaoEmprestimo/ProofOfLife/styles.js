import styled, { css } from 'styled-components';

import { Grid, Container, Typography } from '@material-ui/core';

export const StyledTypography = styled(Typography)`
  font-weight: ${({ font }) => font};
  text-align: ${({ text }) => text};
  font-size: ${({ size }) => size === 'tiny' && '12px'};
  font-size: ${({ size }) => size === 'nano' && '10px'};
  font-size: ${({ size }) => size === 'large' && '18px'};
  text-transform: ${({ transform }) =>
    transform === 'capitalize' && 'capitalize'};
`;

export const FormContainer = styled(Container)`
  /* margin-top: ${({ theme }) => `${theme.spacing(16)}px`};
  margin-bottom: ${({ theme }) => ` ${theme.spacing(12)}px`}; */
  padding: 0px ${({ theme }) => `${theme.spacing(3)}px`};
`;

export const AvisosContainer = styled(Grid)`
  padding: 0px 20px;
  ${({ theme }) => theme.breakpoints.down('md')} {
    margin-top: 50px;
  }
`;

export const ImagemCentral = styled.img`
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
