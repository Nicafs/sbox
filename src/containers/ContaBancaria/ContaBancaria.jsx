import React, { useEffect, useState, useRef } from 'react';

import { deveExibir } from 'commons/camposPersonalizados';
import { CODIGO_BANCO_CAIXA } from 'commons/constants/bancos';
import Banco from 'commons/resources/banco';
import ContaBancariaForm from 'components/ContaBancariaForm';
import Grid from 'components/MaterialUI/Grid';
import useCamposPersonalizados from 'hooks/useCamposPersonalizados/useCamposPersonalizados';
import { useAppGlobal } from 'providers/AppGlobal';

import { getLogoBancoUrl } from '../../commons/hooks/Firebase/storage';
import ImgAsync from '../../components/ImgAsync';
import ContaBancariaLoader from './ContaBancariaLoader';
import schemaPadrao from './schemaPadrao';
import { BancoOptionStyled, GridLogoStyled } from './style';

const ContaBancaria = ({
  valoresCamposPadroes,
  valoresCamposAdicionais,
  configCamposContaBancaria,
  configCamposContaBancariaAdicionais,
  onFormikSubmit,
  exibirFooterSolicitacaoEmprestimo = false,
  paginaTitulo,
  atualizarDadosLocal,
}) => {
  const isMountedRef = useRef(null);
  const [bancos, setBancos] = useState([]);
  const [loading, setLoading] = useState(true);
  const {
    actions: { exibirAlerta },
  } = useAppGlobal();

  const onFormikSubmitWrapper = async (values, actions) => {
    const { setSubmitting } = actions;
    const {
      banco: {
        data: { codigo: codigoBanco },
      },
      agencia,
      conta,
      tipoConta,
      tipoOperacao,
    } = values;
    const params = {
      codigoBanco,
      agencia,
      conta,
      tipoConta,
      tipoOperacao,
    };
    try {
      await Banco.validarContaBancaria(params);
      onFormikSubmit(values, actions);
    } catch (err) {
      console.error('Ocorreu um erro ao validar a conta bancária: ', err);
      if (err.erro) {
        exibirAlerta(err.erro);
      } else {
        exibirAlerta('A conta informada não é válida');
      }
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    isMountedRef.current = true;
    setBancos();
    executarFuncoesIniciais();

    return () => {
      isMountedRef.current = false;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const executarFuncoesIniciais = async () => {
    if (isMountedRef.current) {
      await buscarBancos();
      if (isMountedRef.current) {
        setLoading(false);
      }
    }
  };

  const buscarBancos = async () => {
    const bancoResult = (await Banco.listBancos()) || [];
    if (isMountedRef.current) {
      const bancosComLogo = await Promise.all(
        bancoResult.map(buscarLogosBanco),
      );
      if (isMountedRef.current) {
        setBancos(
          bancosComLogo.map(b => ({
            value: b.id,
            label: (
              <>
                <Grid container alignItems="center">
                  <GridLogoStyled item>{b.logo}</GridLogoStyled>
                  <BancoOptionStyled item>
                    {b.codigo} - {b.nome}
                  </BancoOptionStyled>
                </Grid>
              </>
            ),
            data: b,
          })),
        );
      }
    }
  };

  const buscarLogosBanco = banco => {
    const url = getLogoBancoUrl(banco.logo);
    return {
      ...banco,
      logo: (
        <ImgAsync
          src={url}
          style={{ width: 20, height: 20, display: 'flex' }}
        />
      ),
    };
  };

  const precisaValidarObrigatoriedade = nomeCampo => {
    return nomeCampo !== 'tipoOperacao';
  };

  const { formik, renderInputs } = useCamposPersonalizados({
    camposPersonalizados: {
      configCamposPadroes: configCamposContaBancaria,
      configCamposAdicionais: [configCamposContaBancariaAdicionais],
      valoresCamposPersonalizados: {
        ...valoresCamposPadroes,
        ...valoresCamposAdicionais,
      },
    },
    formikHookConfig: { onSubmit: onFormikSubmitWrapper },
    precisaValidarObrigatoriedadeFn: precisaValidarObrigatoriedade,
    yupSchemaPadrao: schemaPadrao,
  });

  const {
    values,
    errors,
    touched,
    setFieldValue,
    handleBlur,
    isValid,
    handleSubmit,
  } = formik;
  const { banco, agencia, conta, tipoConta } = values;
  const bancoChangeHandler = bancoObj => setFieldValue('banco', bancoObj);

  const agenciaChangeHandler = paramAgencia =>
    setFieldValue('agencia', paramAgencia);

  const contaChangeHandler = paramConta => setFieldValue('conta', paramConta);

  const tipoContaChangeHandler = paramTipoConta =>
    setFieldValue('tipoConta', paramTipoConta);

  const campoTipoOperacaoDeveExibir = (campos, nome) => {
    const comportamentoPadrao = deveExibir(campos, nome);
    if (!banco || !Object.keys(banco).length || !banco.data) {
      return false;
    }
    const { data: { codigo } = {} } = banco;
    const bancoCaixaEstaSelecionado =
      parseInt(codigo, 10) === CODIGO_BANCO_CAIXA && comportamentoPadrao;
    return bancoCaixaEstaSelecionado;
  };

  const primeiroRender = useRef(true);
  useEffect(() => {
    if (primeiroRender.current) {
      primeiroRender.current = false;
      return;
    }
    atualizarDadosLocal({ contaBancaria: formik.values });
  }, [formik.values]); // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) {
    return <ContaBancariaLoader />;
  }

  return (
    <ContaBancariaForm
      bancos={bancos}
      banco={banco}
      agencia={agencia}
      conta={conta}
      tipoConta={tipoConta}
      bancoChangeHandler={bancoChangeHandler}
      agenciaChangeHandler={agenciaChangeHandler}
      contaChangeHandler={contaChangeHandler}
      tipoContaChangeHandler={tipoContaChangeHandler}
      formikErros={errors}
      formikTouched={touched}
      handleBlur={handleBlur}
      isValid={isValid}
      handleSubmit={handleSubmit}
      camposAdicionaisRender={renderInputs[0]}
      formik={formik}
      camposPadrao={configCamposContaBancaria}
      campoTipoOperacaoDeveExibir={campoTipoOperacaoDeveExibir}
      exibirFooterSolicitacaoEmprestimo={exibirFooterSolicitacaoEmprestimo}
      paginaTitulo={paginaTitulo}
    />
  );
};

ContaBancaria.label = 'Informe sua conta';
ContaBancaria.title = 'Informe a sua conta para receber o empréstimo';

export default ContaBancaria;
