import React, { useMemo, useState, useRef } from 'react';

import { getIn } from 'formik';

import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';

import api from '~/commons/resources/api/base';
import Yup from '~/commons/Yup';

import FormikAutoComplete from '~/components/FormikUtils/FormikAutocomplete';
import FormikDatePicker from '~/components/FormikUtils/FormikDatePicker';
import FormikSelect from '~/components/FormikUtils/FormikSelect';
import FormikTextField from '~/components/FormikUtils/FormikTextField';
import FormHelperText from '~/components/MaterialUI/FormHelperText';
import InputLabel from '~/components/MaterialUI/InputLabel';
import Select from '~/components/MaterialUI/Select';
import ModalListItens from '~/components/ModalListItens';

import { validaDDD } from './dddsExistentes';
import { nomeMask, onlyNumber, telefoneCelularMask } from './MaskHandle';

const useStyles = makeStyles(() => ({
  disablePointerStyle: {
    cursor: 'pointer !important',
    color: 'rgba(0, 0, 0, 0.87) !important',
    '& .MuiSelect-select.Mui-disabled': {
      cursor: 'pointer !important',
    },
  },
}));

export const TiposCamposPersonalizado = {
  TELEFONE: 'TELEFONE',
  EMAIL: 'EMAIL',
  TEXTO: 'TEXTO',
  NUMERO: 'NUMERO',
  MONETARIO: 'MONETARIO',
  LISTA_SIMPLES: 'LISTA_SIMPLES',
  LISTA_MULTI: 'LISTA_MULTI',
  API_EXTERNA: 'API_EXTERNA',
  DATA: 'DATA',
  DATAMESANO: 'DATAMESANO',
};

async function gerarFunctioRequest(apiUrl, apiChave, apiValor) {
  const baseApi = api(apiUrl);
  const Api = {
    request(path, options) {
      return baseApi.request(path, options);
    },
  };
  const result = await Api.request();
  return result.map(({ [apiChave]: value, [apiValor]: label }) => ({
    value,
    label,
  }));
}

export function gerarJsxCamposAdicionais(contatoAdicionais, formik) {
  function gerarTamanho(tamanho, screen) {
    if (tamanho === 'PEQUENO') {
      if (screen === 'md') {
        return 4;
      }
      return 3;
    }
    if (tamanho === 'MEDIO') {
      return 6;
    }
    return 12;
  }

  const campos = contatoAdicionais
    .sort((a, b) => a.posicao - b.posicao)
    .filter(({ disponivel }) => disponivel)
    .map((campo, idx) => (
      <Grid
        container
        item
        xs={12}
        md={gerarTamanho(campo.tamanho, 'md')}
        lg={gerarTamanho(campo.tamanho, 'lg')}
        key={`campoAdicional-${idx}`}
      >
        <JsxCampoAdicional campo={campo} formik={formik} />
      </Grid>
    ));

  return (
    <Grid container spacing={2}>
      {campos}
    </Grid>
  );
}

function JsxCampoAdicional({ campo, formik }) {
  const classes = useStyles();

  const {
    nome,
    tipo,
    titulo,
    placeholder,
    obrigatorio,
    listaValores = [],
    apiUrl,
    apiChave,
    apiValor,
  } = campo;

  const [listaOpcoes, setListaOpcoes] = useState([]);
  const [open, setOpen] = useState(false);
  const [options, setOptions] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const refElement = useRef(null);

  const buscarOpcoes = async () => {
    if (
      tipo === TiposCamposPersonalizado.LISTA_MULTI ||
      tipo === TiposCamposPersonalizado.LISTA_SIMPLES
    ) {
      const opcoes = Object.entries(listaValores).map(
        ([value, label], idx) => ({
          value: value !== '' ? value : `${idx}`,
          label,
        }),
      );
      setListaOpcoes(opcoes);
      return opcoes;
    }

    if (tipo === TiposCamposPersonalizado.API_EXTERNA) {
      const opcoes = await gerarFunctioRequest(apiUrl, apiChave, apiValor);
      setListaOpcoes(opcoes);
      return opcoes;
    }
  };

  useMemo(() => {
    if (tipo && tipo !== TiposCamposPersonalizado.API_EXTERNA) {
      buscarOpcoes();
    }
  }, [tipo]); // eslint-disable-line react-hooks/exhaustive-deps

  if (tipo === TiposCamposPersonalizado.TELEFONE) {
    return (
      <FormControl fullWidth id={`formControl-${nome}`}>
        <InputLabel>{titulo}</InputLabel>
        <FormikTextField
          formik={formik}
          type="tel"
          margin="normal"
          variant="outlined"
          required={obrigatorio}
          fullWidth
          id={nome}
          name={nome}
          customHandleChange={onlyNumber}
          customValueMask={telefoneCelularMask}
          inputProps={{ maxLength: 15, minlength: 14 }}
          label={placeholder}
          inputRef={refElement}
        />
      </FormControl>
    );
  }
  if (tipo === TiposCamposPersonalizado.EMAIL) {
    return (
      <FormControl fullWidth id={`formControl-${nome}`}>
        <InputLabel>{titulo}</InputLabel>
        <FormikTextField
          type="email"
          margin="normal"
          variant="outlined"
          required={obrigatorio}
          fullWidth
          id={nome}
          name={nome}
          formik={formik}
          label={placeholder}
          inputRef={refElement}
        />
      </FormControl>
    );
  }
  if (tipo === TiposCamposPersonalizado.TEXTO) {
    return (
      <FormControl fullWidth id={`formControl-${nome}`}>
        <InputLabel>{titulo}</InputLabel>
        <FormikTextField
          formik={formik}
          type="text"
          variant="outlined"
          margin="normal"
          required={obrigatorio}
          fullWidth
          id={nome}
          label={placeholder}
          name={nome}
          customValueMask={nomeMask}
          inputRef={refElement}
        />
      </FormControl>
    );
  }
  if (tipo === TiposCamposPersonalizado.MONETARIO) {
    return (
      <FormControl fullWidth id={`formControl-${nome}`}>
        <InputLabel>{titulo}</InputLabel>
        <FormikTextField
          id={nome}
          name={nome}
          formik={formik}
          type="tel"
          variant="outlined"
          margin="normal"
          required={obrigatorio}
          fullWidth
          centavosZerados
          monetario
          inputRef={refElement}
        />
      </FormControl>
    );
  }
  if (tipo === TiposCamposPersonalizado.NUMERO) {
    return (
      <FormControl fullWidth id={`formControl-${nome}`}>
        <InputLabel>{titulo}</InputLabel>
        <FormikTextField
          id={nome}
          name={nome}
          formik={formik}
          type="tel"
          variant="outlined"
          margin="normal"
          required={obrigatorio}
          fullWidth
          inputRef={refElement}
        />
      </FormControl>
    );
  }
  if (tipo === TiposCamposPersonalizado.LISTA_SIMPLES) {
    return (
      <FormikSelect
        label={titulo}
        placeholder={placeholder}
        fullWidth
        required={obrigatorio}
        formik={formik}
        disableUnderline
        name={nome}
        list={listaOpcoes}
        inputRef={refElement}
      />
    );
  }
  if (tipo === TiposCamposPersonalizado.API_EXTERNA) {
    if (nome === 'profissaoPortocred') {
      let valueModal = getIn(formik.values, nome);
      const filterProfissao = (pro, filterValue) => {
        if (filterValue.length >= 3)
          return pro.label.toLowerCase().includes(filterValue.toLowerCase());
        return pro;
      };
      const handleClickOpen = () => {
        setOpen(true);
      };
      const handleClose = item => {
        if (item) {
          formik.setFieldValue(nome, item.value);
          valueModal = item.value;
        }
        setOpen(false);
      };
      const possuiErro =
        getIn(formik.errors, nome) && getIn(formik.touched, nome);

      if (!loading && options.length < 1) {
        (async () => {
          setLoading(true);
          const response = await buscarOpcoes();
          setOptions(response);
          setLoading(false);
        })();
      }

      return (
        <>
          <FormControl fullWidth error={possuiErro} id={`formControl-${nome}`}>
            <InputLabel id={`select-${nome}-label`}>{titulo}</InputLabel>
            <Select
              className={classes.disablePointerStyle}
              labelId={`${nome}-label`}
              id={`${nome}`}
              value={valueModal}
              fullWidth
              displayEmpty
              disabled
              onClick={handleClickOpen}
              inputRef={refElement}
            >
              <MenuItem value="">Selecione a {titulo}</MenuItem>
              {options.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            {possuiErro && (
              <FormHelperText>{getIn(formik.errors, nome)}</FormHelperText>
            )}
          </FormControl>

          <ModalListItens
            title="Selecione sua Profissão"
            open={open}
            handleClose={handleClose}
            itens={options}
            filter={filterProfissao}
            label="Digite sua Profissão"
            helperText="* Digite 3 ou mais caracteres"
          />
        </>
      );
    }

    return (
      <FormikAutoComplete
        idInput={nome}
        name={nome}
        formik={formik}
        label={titulo}
        placeholder={placeholder}
        fullWidth
        fnListarOpcoes={buscarOpcoes}
        inputRef={refElement}
      />
    );
  }
  if (
    tipo === TiposCamposPersonalizado.LISTA_SIMPLES ||
    tipo === TiposCamposPersonalizado.LISTA_MULTI ||
    tipo === TiposCamposPersonalizado.API_EXTERNA
  ) {
    return (
      <FormikSelect
        label={titulo}
        placeholder={placeholder}
        fullWidth
        multi={tipo === TiposCamposPersonalizado.LISTA_MULTI}
        formik={formik}
        disableUnderline
        name={nome}
        required={obrigatorio}
        list={listaOpcoes}
        inputRef={refElement}
      />
    );
  }
  if (tipo === TiposCamposPersonalizado.DATA) {
    return (
      <FormControl fullWidth id={`formControl-${nome}`} ref={refElement}>
        <InputLabel>{titulo}</InputLabel>
        <FormikDatePicker
          formik={formik}
          name={nome}
          required={obrigatorio}
          placeholder={placeholder}
          cyElement={`cyElement-${nome}`}
          label={titulo}
          margin="normal"
          shrink="true"
        />
      </FormControl>
    );
  }
  if (tipo === TiposCamposPersonalizado.DATAMESANO) {
    return (
      <FormControl fullWidth id={`formControl-${nome}`} ref={refElement}>
        <InputLabel>{titulo}</InputLabel>
        <FormikDatePicker
          formik={formik}
          name={nome}
          required={obrigatorio}
          placeholder={placeholder}
          cyElement={`cyElement-${nome}`}
          label={titulo}
          margin="normal"
          shrink="true"
          views={['year', 'month']}
          format="MM/yyyy"
        />
      </FormControl>
    );
  }
  throw new Error(
    `O tipo ${tipo} para o campo adicional ${nome} é inválido para montagem do JSX.`,
  );
}

export function gerarValorInicialCampoAdicional(
  { nome: nomeCampoAdicional, tipo: tipoCampoAdicional },
  pessoaValoresIniciais,
) {
  if (Object.keys(pessoaValoresIniciais).includes(nomeCampoAdicional)) {
    return { [nomeCampoAdicional]: pessoaValoresIniciais[nomeCampoAdicional] };
  }
  if (tipoCampoAdicional === TiposCamposPersonalizado.LISTA_MULTI) {
    return { [nomeCampoAdicional]: [] };
  }
  if (
    tipoCampoAdicional === TiposCamposPersonalizado.DATA ||
    tipoCampoAdicional === TiposCamposPersonalizado.DATAMESANO
  ) {
    return { [nomeCampoAdicional]: null };
  }
  return { [nomeCampoAdicional]: '' };
}

export function gerarYupCampoPadrao(
  { obrigatorio, disponivel, validarObrigatoriedade = true },
  yupSchema,
  mensagemValidacao,
) {
  if (!disponivel) {
    return undefined;
  }
  if (validarObrigatoriedade) {
    return obrigatorio
      ? yupSchema.required(mensagemValidacao)
      : yupSchema.nullable();
  }
  return yupSchema;
}

export function gerarYupCampoAdicional({
  nome,
  tipo,
  mensagemValidacao,
  obrigatorio,
  disponivel,
}) {
  if (!disponivel) {
    return {};
  }
  if (
    tipo === TiposCamposPersonalizado.TEXTO ||
    tipo === TiposCamposPersonalizado.LISTA_SIMPLES ||
    tipo === TiposCamposPersonalizado.API_EXTERNA
  ) {
    if (obrigatorio) {
      return { [nome]: Yup.string().required(mensagemValidacao) };
    }
    return { [nome]: Yup.string() };
  }
  if (tipo === TiposCamposPersonalizado.TELEFONE) {
    if (obrigatorio) {
      return {
        [nome]: Yup.string()
          .min(10)
          .required(mensagemValidacao)
          .test('DDD válido', 'DDD não é válido', value => validaDDD(value)),
      };
    }
    return {
      [nome]: Yup.string().test('DDD válido', 'DDD não é válido', value =>
        validaDDD(value),
      ),
    };
  }
  if (tipo === TiposCamposPersonalizado.EMAIL) {
    if (obrigatorio) {
      return {
        [nome]: Yup.string()
          .email('E-mail inválido')
          .required(mensagemValidacao),
      };
    }
    return { [nome]: Yup.string().email('E-mail inválido') };
  }
  if (
    tipo === TiposCamposPersonalizado.DATA ||
    tipo === TiposCamposPersonalizado.DATAMESANO
  ) {
    if (obrigatorio) {
      return {
        [nome]: Yup.date()
          .nullable()
          .required(mensagemValidacao)
          .typeError('Data inválida'),
      };
    }
    return {
      [nome]: Yup.date().nullable().typeError('Data inválida'),
    };
  }
  if (tipo === TiposCamposPersonalizado.NUMERO) {
    if (obrigatorio) {
      return {
        [nome]: Yup.number()
          .required(mensagemValidacao)
          .typeError('Número inválido'),
      };
    }
    return { [nome]: Yup.number().typeError('Número inválido') };
  }
  if (tipo === TiposCamposPersonalizado.MONETARIO) {
    if (obrigatorio) {
      return {
        [nome]: Yup.number().transformaNumerico().required(mensagemValidacao),
      };
    }
    return {
      [nome]: Yup.number().transformaNumerico(),
    };
  }
  if (tipo === TiposCamposPersonalizado.LISTA_MULTI) {
    if (obrigatorio) {
      return { [nome]: Yup.array().min(1, mensagemValidacao) };
    }
    return { [nome]: Yup.array() };
  }
  throw new Error(
    `O tipo ${tipo} para o campo adicional ${nome} é inválido para montagem do Yup Schema.`,
  );
}
