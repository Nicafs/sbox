import React, { useEffect, useMemo, useState, useRef } from 'react';

import * as moment from 'moment';

import { useFirebase } from '@credito-express/ce-components';

import useCamposPersonalizados from '~/hooks/useCamposPersonalizados/useCamposPersonalizados';

import TipoLogo from '~/commons/enums/TipoLogo';
import EnderecoApi from '~/commons/resources/endereco';
import EnumDinamico from '~/commons/resources/enum-dinamico';
import OrgaoEmissor from '~/commons/resources/orgaoEmissor';
import { transformarDataApiParaDataLocal } from '~/commons/tratativasParaDatasApi';
import { celularMask } from '~/commons/utils/MaskHandle';

import { useAppGlobal } from '~/providers/AppGlobal';

import { useSimulacaoState } from '~/pages/Tomador/SolicitacaoEmprestimo/state';

import Loading from '~/components/Loading';
import CadastroDadosPessoais from '~/components/SolicitacaoEmprestimo/DadosFinais';

import { schemaHookCamposPersonalizados } from './schemaPadrao';

const QTD_DIAS_PARA_ATUALIZACAO_BIGDATACORP = 90;

export default function DadosPessoais({ atualizarDadosLocal }) {
  const firebase = useFirebase();
  const [state, { etapaCadastro, sincronizarPessoa }] = useSimulacaoState();
  const {
    pessoaBigdatacorpSincronizadaNoFluxo,
    pessoa,
    empresa,
    organizacao,
    endereco = {},
    loading,
    organizacao: {
      camposPersonalizados: {
        contato: camposContato = [],
        cadastro: camposCadastro = [],
        cadastroAdicionais: camposCadastroAdicionais = [],
        endereco: camposEndereco = [],
        enderecoAdicionais: camposEnderecoAdicionais = [],
      } = {},
    },
    camposAdicionais: valoresCamposAdicionais,
  } = state;

  const [estados, setEstados] = useState([]);
  const [nacionalidades, setNacionalidades] = useState([]);
  const [orgaosEmissores, setOrgaosEmissores] = useState([]);
  const {
    actions: { getLogo },
  } = useAppGlobal();

  const pessoaBigdatacorpFoiAtualizadaRecentemente = useMemo(() => {
    if (pessoa) {
      const { dataAtualizacaoBigdatacorp } = pessoa;
      if (dataAtualizacaoBigdatacorp) {
        const dataAtual = moment();
        const dataUltimaAtualizacaoBigdatacorp = transformarDataApiParaDataLocal(
          dataAtualizacaoBigdatacorp,
        );
        const dataDiff = Math.abs(
          dataAtual.diff(dataUltimaAtualizacaoBigdatacorp, 'days'),
        );
        return dataDiff <= QTD_DIAS_PARA_ATUALIZACAO_BIGDATACORP;
      }
      return false;
    }
  }, [pessoa]);

  useEffect(() => {
    listarEstados();
    listarOrgaosEmissores();
    listarNacionalidades();
    firebase.analytics().logEvent('acessou_dados_pessoais');
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (
      pessoa &&
      !pessoaBigdatacorpSincronizadaNoFluxo &&
      !pessoaBigdatacorpFoiAtualizadaRecentemente
    ) {
      sincronizarPessoa();
    }
  }, [pessoa]); // eslint-disable-line react-hooks/exhaustive-deps

  const listarOrgaosEmissores = async () => {
    const orgaosResponse = await OrgaoEmissor.listEmissorRg();
    const options = orgaosResponse.map(({ orgao, nome }) => ({
      value: orgao,
      label: nome,
    }));
    setOrgaosEmissores(options);
  };

  const listarNacionalidades = async () => {
    const resultNacionalidade = await EnumDinamico.listNacionalidade();
    resultNacionalidade.sort((a, b) => a.label.localeCompare(b.label));

    const indexBrasil = resultNacionalidade.findIndex(
      r => r.value === 'BRASIL',
    );

    resultNacionalidade.unshift(resultNacionalidade.splice(indexBrasil, 1)[0]);
    setNacionalidades(resultNacionalidade);
  };

  const listarEstados = async () => {
    const estadosResult = await EnderecoApi.listEstados();
    setEstados(
      estadosResult.map(({ nome, uf }) => ({ value: uf, label: nome })),
    );
  };

  const getValoresCamposPadroes = () => {
    return {
      celular: celularMask(pessoa.celular) || '',
      dataNascimento: pessoa.dataNascimento
        ? transformarDataApiParaDataLocal(pessoa.dataNascimento).format(
            'YYYY-MM-DD',
          )
        : null,
      emailCorporativo: pessoa.emailCorporativo || '',
      email: pessoa.email || '',
      estadoCivil: pessoa.estadoCivil || '',
      profissao: pessoa.profissaoId || '',
      cargo: pessoa.cargo || '',
      nomeMae: pessoa.nomeMae || '',
      genero: pessoa.genero || '',
      cep: endereco.cep || '',
      logradouro: endereco.logradouro || '',
      numero: endereco.numero || '',
      bairro: endereco.bairro || '',
      complemento: endereco.complemento || '',
      nacionalidade: pessoa.nacionalidade || '',
      uf: endereco.uf || '',
      cidade: endereco.cidade || '',
      cepEncontrado: true,
      rg: pessoa.rg || '',
      emissorRg: pessoa.emissorRg || '',
      ufEmissorRg: pessoa.ufEmissorRg || '',
      dataEmissaoRg: pessoa.dataEmissaoRg
        ? transformarDataApiParaDataLocal(pessoa.dataEmissaoRg).format(
            'YYYY-MM-DD',
          )
        : null,
      ufNaturalidade: pessoa.ufNaturalidade || '',
      cidadeNaturalidade: pessoa.cidadeNaturalidade || '',
    };
  };

  const onFormikSubmit = values => {
    etapaCadastro(values);
  };

  const configHookCadastroAdicionais = [...camposCadastroAdicionais];
  const configHookEnderecoAdicionais = [...camposEnderecoAdicionais];
  const configHookCamposPadroes = [
    ...camposContato,
    ...camposCadastro,
    ...camposEndereco,
  ];
  const valoresCamposPersonalizados = {
    ...getValoresCamposPadroes(),
    ...valoresCamposAdicionais,
    ...pessoa,
  };

  const { formik, renderInputs } = useCamposPersonalizados({
    camposPersonalizados: {
      configCamposPadroes: configHookCamposPadroes,
      configCamposAdicionais: [
        configHookCadastroAdicionais,
        configHookEnderecoAdicionais,
      ],
      valoresCamposPersonalizados,
    },
    formikHookConfig: { onSubmit: onFormikSubmit },
    yupSchemaPadrao: schemaHookCamposPersonalizados,
    precisaValidarObrigatoriedadeFn: nomeCampo =>
      !['complemento', 'emailCorporativo'].includes(nomeCampo),
  });

  const primeiroRender = useRef(true);
  useEffect(() => {
    if (primeiroRender.current) {
      primeiroRender.current = false;
      return;
    }
    atualizarDadosLocal({ pessoa: formik.values });
  }, [formik.values]); // eslint-disable-line react-hooks/exhaustive-deps

  if (
    !pessoaBigdatacorpSincronizadaNoFluxo &&
    !pessoaBigdatacorpFoiAtualizadaRecentemente
  ) {
    return <Loading />;
  }

  return (
    <CadastroDadosPessoais
      empresa={empresa}
      formik={formik}
      loading={loading}
      logo={getLogo(TipoLogo.BRASAO_MONOCROMATICO)}
      organizacao={organizacao}
      estados={estados}
      orgaosEmisores={orgaosEmissores}
      nacionalidades={nacionalidades}
      renderCadastroAdicionais={renderInputs[0]}
      renderEnderecoAdicionais={renderInputs[1]}
    />
  );
}
