import React, { useEffect } from 'react';

import { useAppGlobal } from 'providers/AppGlobal';
import styled from 'styled-components';

import { useFirebase } from '@credito-express/ce-components';

import Button from '../../../components/MaterialUI/Button';
import Grid from '../../../components/MaterialUI/Grid';
import Typography from '../../../components/MaterialUI/Typography';
import pushRota from '../../../routes/push';

const ObrigadoStyled = styled(Typography)`
  font-size: 40px;
  text-align: center;
  color: ${({ theme }) => theme.palette.common.black};
`;
const NomeEmpresaStyled = styled(Typography)`
  font-size: 32px;
  text-align: center;
  color: ${({ theme }) => theme.palette.primary.main};
`;

const DescricaoStyled = styled(Typography)`
  font-size: 14px;
  max-width: 400px;
  text-align: center;
  color: ${({ theme }) => theme.palette.text.disabled};
`;

const GridItemStyled = styled(Grid)`
  padding: ${({ theme }) => theme.spacing(2)}px;
`;

export default function Confirmacao({ analyticsEventoSufixo }) {
  const firebase = useFirebase();
  const {
    tema: { nomeOrganizacao },
    actions: { getIcone },
    organizacao: { artigoDefinido },
  } = useAppGlobal();

  useEffect(() => {
    firebase
      .analytics()
      .logEvent(`finalizou_formalizacao${analyticsEventoSufixo}`);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const btnAcompanharClickHandler = () => {
    pushRota('/meus-emprestimos');
  };

  return (
    <Grid container>
      <GridItemStyled
        item
        md={12}
        container
        justify="center"
        alignContent="center"
        spacing={2}
      >
        <img
          src={getIcone('icon-sucesso')}
          alt="Imagem Ilustrativa"
          style={{ height: 148, width: 456 }}
        />
      </GridItemStyled>
      <GridItemStyled
        item
        md={12}
        container
        justify="center"
        alignContent="center"
      >
        <ObrigadoStyled>Obrigado</ObrigadoStyled>
      </GridItemStyled>
      <GridItemStyled
        item
        md={12}
        container
        justify="center"
        alignContent="center"
      >
        <NomeEmpresaStyled>
          por utilizar {artigoDefinido || 'a'} {nomeOrganizacao}
        </NomeEmpresaStyled>
      </GridItemStyled>
      <GridItemStyled
        item
        md={12}
        container
        justify="center"
        alignContent="center"
      >
        <DescricaoStyled />
      </GridItemStyled>
      <GridItemStyled
        item
        md={12}
        container
        justify="center"
        alignContent="center"
      >
        <Button
          cy-element="botaoAcompanharStatus"
          rounded="true"
          primary="true"
          onClick={btnAcompanharClickHandler}
        >
          Acompanhar status
        </Button>
      </GridItemStyled>
    </Grid>
  );
}

Confirmacao.label = 'Confirmação';
