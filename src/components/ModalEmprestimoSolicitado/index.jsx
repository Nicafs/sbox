import React from 'react';
import { withRouter } from 'react-router';

import Divider from 'components/MaterialUI/Divider';
import Grid from 'components/MaterialUI/Grid';
import Hidden from 'components/MaterialUI/Hidden';
import Modal from 'components/Modal';
import ResumoEmprestimo from 'components/ResumoEmprestimo';
import PropTypes from 'prop-types';

import pushRota from '../../routes/push';
import {
  Titulo,
  TextoAguarde,
  TextoSolicitacao,
  ButtonStyled,
  ContainerStyled,
  ContainerTextos,
} from './style';

const ModalEmprestimoSolicitado = ({
  valor,
  qtdParcelas,
  valorParcela,
  juros,
  jurosAoMes,
  iof,
  taxaIof,
  totalApagar,
  dataPrimeiraParcela,
  valorDespesas,
  descricaoDespesas,
  valorSeguro,
  percSeguroConsignado,
  ...otherProps
}) => {
  function redirecionarAcompanhamentoEprestimo() {
    pushRota('/meus-emprestimos');
  }

  return (
    <Modal {...otherProps}>
      <ContainerStyled container spacing={3}>
        <ContainerTextos
          item
          container
          xs={12}
          md={8}
          spacing={2}
          direction="column"
          justify="center"
          alignItems="center"
        >
          <Grid item>
            <Titulo cy-element="modalEmprestimoTitulo">
              Empréstimo solicitado!
            </Titulo>
          </Grid>
          <Grid item>
            <TextoAguarde>
              Agora aguarde a proposta de um investidor
            </TextoAguarde>
          </Grid>
          <Grid item>
            <TextoSolicitacao>
              Os investidores receberão sua solicitação. <br />
              Fique atento às atualizações do seu pedido.
            </TextoSolicitacao>
          </Grid>
          <Grid item>
            <ButtonStyled
              cy-element="modalEmprestimoBtnAcompanhar"
              primary="true"
              rounded="true"
              onClick={redirecionarAcompanhamentoEprestimo}
            >
              Acompanhar status
            </ButtonStyled>
          </Grid>
        </ContainerTextos>
        <Hidden smDown>
          <Grid item md={4}>
            <Grid item container md={12}>
              <Grid item md={1}>
                <Divider orientation="vertical" />
              </Grid>
              <Grid item md={11}>
                <ResumoEmprestimo
                  item
                  valor={valor}
                  qtdParcelas={qtdParcelas}
                  valorParcela={valorParcela}
                  juros={juros}
                  jurosAoMes={jurosAoMes}
                  iof={iof}
                  taxaIof={taxaIof}
                  valorDespesas={valorDespesas}
                  descricaoDespesas={descricaoDespesas}
                  totalApagar={totalApagar}
                  dataPrimeiraParcela={dataPrimeiraParcela}
                  withCard={false}
                  valorSeguro={valorSeguro}
                  percSeguroConsignado={percSeguroConsignado}
                />
              </Grid>
            </Grid>
          </Grid>
        </Hidden>
      </ContainerStyled>
    </Modal>
  );
};

ModalEmprestimoSolicitado.propTypes = {
  valor: PropTypes.number.isRequired,
  qtdParcelas: PropTypes.number.isRequired,
};

export default withRouter(ModalEmprestimoSolicitado);
