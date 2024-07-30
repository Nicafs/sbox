import React, { useCallback, useEffect, useState } from 'react';

import debounce from 'lodash.debounce';
import PropTypes from 'prop-types';

import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import { onlyNumbers } from '../../../commons/utils/ManipulacaoUtils';
import { celularMask } from '../../../commons/utils/MaskHandle';
import Box from '../../MaterialUI/Box';
import Grid from '../../MaterialUI/Grid';
import TextField from '../../MaterialUI/TextField';
import MensagemDeErro from '../../MensagemDeErro';
import BotaoReenviarCodigo from '../BotaoReenviarCodigo';
import FormDigitarCodigo from '../FormDigitarCodigo';
import MensagemCodigoEnviado from '../MensagemCodigoEnviado';
import { ButtonArrow, Icone } from './style';

const FormValidacaoContato = ({
  contatoInputTipo,
  tipoValidacao,
  contatoInput,
  contatoEnviado,
  enviarCodigoWrapper,
  loading,
  codigo,
  podeReenviar,
  contatoInputLabel,
  handleCodigoChange,
  handleChangeContato,
  codigoEnviado,
  erro,
  iconeAsset,
  formik,
  nomeCampoPersonalizado,
}) => {
  const ehTelefone = tipoValidacao === 'TELEFONE';
  /**
   * inputValue: Adicionado estado local para o input não conflitar com o debounce assíncrono
   * evento: sempre que o inputValue é alterado é disparado a função de debounce com o novo valor (desvinculado do input renderizado)
   * * */
  const [inputValue, setInputValue] = useState(contatoInput);
  /**
   * Debounce para evitar envio de requisições desnecessárias enquanto o usuário está digitando o contato
   * * */
  /* eslint-disable react-hooks/exhaustive-deps */
  const onChangeContatoDebounce = useCallback(
    debounce(nextValue => {
      handleChangeContato(nextValue);
    }, 1000),
    [handleChangeContato],
  );
  const formikErro = formik.errors[nomeCampoPersonalizado];

  /**
   * Dispara debounce com o valor atualizado do input
   * * */
  useEffect(() => {
    if (inputValue) {
      onChangeContatoDebounce(
        ehTelefone ? onlyNumbers(inputValue || '') : inputValue,
      );
    }
  }, [inputValue]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Atualiza o inputValue (local) com o valor que vem do formik sempre que o tipo de validação é alterado
   * * */
  useEffect(() => {
    if (tipoValidacao) {
      const valor = getValueFormatado(contatoInput);
      setInputValue(valor);
    }
  }, [tipoValidacao]); // eslint-disable-line react-hooks/exhaustive-deps

  const getValueFormatado = str => {
    return ehTelefone ? celularMask(str) : str;
  };

  return (
    <Grid container direction="column" spacing={1}>
      <Grid item container justify="center" xs={12}>
        <Icone alt="icone-sms" src={iconeAsset} />
      </Grid>
      <Grid container spacing={3} justify="center">
        <Grid item xs={12} md={11}>
          <TextField
            cy-element="modalInputContato"
            type={contatoInputTipo}
            margin="normal"
            variant="outlined"
            required
            fullWidth
            id={tipoValidacao.toLowerCase()}
            label={contatoInputLabel}
            name={tipoValidacao.toLowerCase()}
            autoFocus
            value={getValueFormatado(inputValue)}
            onChange={evt => setInputValue(evt.target.value)}
            helperText={formikErro}
            error={!!formikErro}
          />
        </Grid>
        <Grid item container xs={2} md={1} alignItems="center" justify="center">
          <ButtonArrow
            cy-element="btnSubmit"
            loading={loading}
            circle="true"
            primary="true"
            onClick={enviarCodigoWrapper}
            disabled={!formik.isValid}
          >
            <ArrowForwardIcon />
          </ButtonArrow>
        </Grid>
      </Grid>
      {contatoEnviado && (
        <>
          {tipoValidacao === 'TELEFONE' && (
            <FormDigitarCodigo
              codigo={codigo}
              handleCodigoChange={handleCodigoChange}
            />
          )}
          {codigoEnviado && (
            <MensagemCodigoEnviado
              tipoValidacao={tipoValidacao}
              contato={contatoInput}
            />
          )}
          <Box mt={2}>
            <BotaoReenviarCodigo
              tipoValidacao={tipoValidacao}
              podeReenviar={podeReenviar}
              enviarCodigoWrapper={enviarCodigoWrapper}
            />
          </Box>
          <Grid item xs={12}>
            {erro && <MensagemDeErro id="erro">{erro}</MensagemDeErro>}
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default FormValidacaoContato;

/* eslint-disable react/forbid-prop-types */
FormValidacaoContato.propTypes = {
  codigo: PropTypes.string,
  codigoEnviado: PropTypes.bool,
  contatoEnviado: PropTypes.bool,
  contatoInput: PropTypes.string,
  contatoInputLabel: PropTypes.string,
  contatoInputTipo: PropTypes.string,
  enviarCodigoWrapper: PropTypes.func.isRequired,
  erro: PropTypes.string,
  handleChangeContato: PropTypes.func.isRequired,
  handleCodigoChange: PropTypes.func.isRequired,
  iconeAsset: PropTypes.any,
  loading: PropTypes.any,
  podeReenviar: PropTypes.bool,
  tipoValidacao: PropTypes.string,
};

FormValidacaoContato.defaultProps = {
  codigo: '',
  codigoEnviado: false,
  contatoEnviado: false,
  contatoInput: '',
  contatoInputLabel: '',
  contatoInputTipo: 'email',
  erro: '',
  podeReenviar: true,
  tipoValidacao: 'EMAIL',
  iconeAsset: undefined,
  loading: undefined,
};
