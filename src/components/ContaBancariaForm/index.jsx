import React from 'react';

import ModalListItens from 'components/ModalListItens';
import PropTypes from 'prop-types';

import { Box, Hidden } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import { obrigatorio } from '../../commons/camposPersonalizados';
import endpoints from '../../commons/constants/api-constants';
import api from '../../commons/resources/api/general-api';
import { onlyNumbers } from '../../commons/utils/ManipulacaoUtils';
import FooterMobileSolicitacaoEmprestimo from '../FooterMobileSolicitacaoEmprestimo';
import FormikErrorMessage from '../FormikErrorMessage';
import FormikSelectAsyncList from '../FormikUtils/FormikSelectAsyncList';
import Button from '../MaterialUI/Button';
import Grid from '../MaterialUI/Grid';
import InputLabel from '../MaterialUI/InputLabel';

import {
  ButtonStyled,
  ContainerStyled,
  GridContainerTipoConta,
  Titulo,
  SubTitulo,
} from './style';

const useStyles = makeStyles(() => ({
  disablePointerStyle: {
    cursor: 'pointer !important',
    color: 'rgba(0, 0, 0, 0.87) !important',
    marginTop: '16px',
    marginBottom: '8px',
    '& .MuiSelect-select.Mui-disabled': {
      cursor: 'pointer !important',
    },
  },
}));

const ContaBancariaForm = ({
  formikErros,
  formikTouched,
  banco,
  agencia,
  conta,
  tipoConta,
  bancos,
  bancoChangeHandler,
  agenciaChangeHandler,
  contaChangeHandler,
  tipoContaChangeHandler,
  handleBlur,
  handleSubmit,
  camposAdicionaisRender,
  camposPadrao,
  formik,
  campoTipoOperacaoDeveExibir,
  exibirFooterSolicitacaoEmprestimo,
  paginaTitulo = 'Conta Bancária',
  paginaSubTitulo = 'Informe sua conta para receber o empréstimo. A conta deve estar em seu nome, exceto conta salário',
}) => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [itensList] = React.useState(
    bancos.map(bank => {
      const newBank = bank;
      newBank.key = bank.data.codigo;
      newBank.icon = bank.data.logo;
      newBank.text = `${bank.data.codigo} - ${bank.data.nome}`;
      return newBank;
    }),
  );

  const [bancoValue, setBancoValue] = React.useState('');

  React.useEffect(() => {
    setBancoValue(banco?.value || '');
  }, [banco?.value]); // eslint-disable-line react-hooks/exhaustive-deps

  const getErro = nomeInput => {
    if (formikErros[nomeInput] && formikTouched[nomeInput]) {
      return formikErros[nomeInput];
    }
    return null;
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = item => {
    if (item) {
      bancoChangeHandler(item);
    }
    setOpen(false);
  };

  const filterBanco = (bank, filterValue) => {
    return (
      bank.data.nome.toLowerCase().includes(filterValue.toLowerCase()) ||
      bank.data.codigo.toLowerCase().includes(filterValue.toLowerCase())
    );
  };

  return (
    <ContainerStyled>
      <Titulo>{paginaTitulo}</Titulo>
      <SubTitulo>{paginaSubTitulo}</SubTitulo>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} container justify="flex-start">
            <Grid item xs={12}>
              <InputLabel>Tipo de Conta</InputLabel>
            </Grid>
            <GridContainerTipoConta item xs={12}>
              <ButtonStyled
                rounded="true"
                variant={tipoConta === 'CORRENTE' ? 'outlined' : 'text'}
                onClick={() => tipoContaChangeHandler('CORRENTE')}
                ativo={(tipoConta === 'CORRENTE').toString()}
              >
                CORRENTE
              </ButtonStyled>
              <ButtonStyled
                rounded="true"
                variant={tipoConta === 'POUPANCA' ? 'outlined' : 'text'}
                onClick={() => tipoContaChangeHandler('POUPANCA')}
                ativo={(tipoConta === 'POUPANCA').toString()}
              >
                POUPANÇA
              </ButtonStyled>
              {getErro('tipoConta') && (
                <FormikErrorMessage>{getErro('tipoConta')}</FormikErrorMessage>
              )}
            </GridContainerTipoConta>
          </Grid>
          <Grid item xs={12} container spacing={2}>
            <Grid item xs={12}>
              <Grid item xs={12}>
                <InputLabel>Banco</InputLabel>
              </Grid>
              <Grid item xs={12}>
                <FormControl
                  fullWidth
                  error={getErro('banco')}
                  id="formControl-banco"
                  variant="outlined"
                >
                  <Select
                    className={classes.disablePointerStyle}
                    labelId="banco-label"
                    id="banco"
                    value={bancoValue}
                    cy-element="inputBanco"
                    fullWidth
                    displayEmpty
                    disabled
                    onClick={handleClickOpen}
                  >
                    <MenuItem value="">Selecione o Banco</MenuItem>
                    {bancos.map(bank => (
                      <MenuItem key={bank.value} value={bank.value}>
                        {bank.label}
                      </MenuItem>
                    ))}
                  </Select>
                  {getErro('banco') && (
                    <FormikErrorMessage>{getErro('banco')}</FormikErrorMessage>
                  )}
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} container spacing={2}>
            <Grid
              item
              xs={12}
              md={6}
              container
              justify="flex-start"
              style={{ alignContent: 'baseline' }}
            >
              <Grid item xs={12}>
                <InputLabel>Agência</InputLabel>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  placeholder="Digite o número da agência"
                  name="agencia"
                  onBlur={handleBlur}
                  cy-element="inputAgencia"
                  type="tel"
                  margin="normal"
                  variant="outlined"
                  required
                  fullWidth
                  value={agencia}
                  onChange={event =>
                    agenciaChangeHandler(
                      onlyNumbers(event.target.value).substr(0, 4),
                    )
                  }
                />
                {getErro('agencia') && (
                  <FormikErrorMessage style={{ marginRight: '10px' }}>
                    {getErro('agencia')}
                  </FormikErrorMessage>
                )}
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              container
              justify="flex-start"
              style={{ alignContent: 'baseline' }}
            >
              <Grid item xs={12}>
                <InputLabel>Conta com dígito</InputLabel>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  placeholder="Digite o número da conta"
                  name="conta"
                  cy-element="inputConta"
                  type="tel"
                  margin="normal"
                  variant="outlined"
                  required
                  fullWidth
                  value={conta}
                  onChange={event =>
                    contaChangeHandler(
                      onlyNumbers(event.target.value).substr(0, 20),
                    )
                  }
                  onBlur={event => {
                    handleBlur(event);
                    const contaSemDig = onlyNumbers(event.target.value).substr(
                      0,
                      20,
                    );
                    const tamanhoConta = contaSemDig.length;
                    if (contaSemDig) {
                      contaChangeHandler(
                        `${contaSemDig.substr(0, tamanhoConta - 1)}-${
                          contaSemDig[tamanhoConta - 1]
                        }`,
                      );
                    }
                  }}
                />
                {getErro('conta') && (
                  <FormikErrorMessage style={{ marginRight: '10px' }}>
                    {getErro('conta')}
                  </FormikErrorMessage>
                )}
              </Grid>
            </Grid>
            {campoTipoOperacaoDeveExibir(camposPadrao, 'tipoOperacao') && (
              <Grid item container xs={12} md={6} alignItems="center">
                <Grid item xs={12}>
                  <InputLabel>Selecione o tipo da operação</InputLabel>
                </Grid>
                <Grid item xs={12}>
                  <FormikSelectAsyncList
                    placeholder="Selecione o tipo de operação"
                    name="tipoOperacao"
                    // inputRef={ref => (inputs['genero'] = ref)}
                    fnBuscarOpcoes={() =>
                      api.request(endpoints.GET_TIPO_OPERACAO_BANCARIA)
                    }
                    formik={formik}
                    fullWidth
                    margin="normal"
                    required={obrigatorio(camposPadrao, 'genero')}
                    // label="Selecione o tipo da operação"
                  />
                </Grid>
              </Grid>
            )}
          </Grid>
          {camposAdicionaisRender()}
          {exibirFooterSolicitacaoEmprestimo && (
            <Hidden smDown>
              <Grid item xs={12}>
                <Grid container justify="flex-end">
                  <Grid item>
                    <Box mt={2}>
                      <Button
                        id="avancarBanco"
                        cy-element="btnSubmit"
                        secondary
                        rounded
                        type="submit"
                        disabled={!formik.isValid}
                      >
                        AVANÇAR
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Hidden>
          )}
          {!exibirFooterSolicitacaoEmprestimo && (
            <Grid item xs={12}>
              <Grid container justify="flex-end">
                <Grid item>
                  <Box mt={2}>
                    <Button
                      id="avancarBanco2"
                      cy-element="btnSubmit"
                      primary
                      rounded
                      type="submit"
                      disabled={formik.isSubmitting}
                    >
                      AVANÇAR
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
      </form>
      {exibirFooterSolicitacaoEmprestimo && (
        <FooterMobileSolicitacaoEmprestimo
          getBotaoTexto={() => 'AVANÇAR'}
          getBotaoHabilitado={() => formik.isValid && !formik.isSubmitting}
          handleNext={formik.submitForm}
        />
      )}

      <ModalListItens
        title="Selecione o Banco"
        open={open}
        handleClose={handleClose}
        itens={itensList}
        filter={filterBanco}
        label="Digite seu Banco"
      />
    </ContainerStyled>
  );
};

/* eslint-disable react/forbid-prop-types */
ContaBancariaForm.propTypes = {
  bancos: PropTypes.array.isRequired,
  banco: PropTypes.object,
};

ContaBancariaForm.defaultProps = {
  banco: undefined,
};

export default ContaBancariaForm;
