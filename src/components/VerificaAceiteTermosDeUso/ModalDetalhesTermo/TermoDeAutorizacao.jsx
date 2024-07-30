import React from 'react';

import { TypographyCorpo, TypographyTopico } from './style';

const TermoDeAutorizacao = () => (
  <div>
    <TypographyCorpo>
      Eu autorizo a(o) empresa EMPREGADORA, da qual faço parte, a disponibilizar
      as informações abaixo indicadas à INSTITUIÇÃO FINANCEIRA CONSIGNATÁRIA
      para viabilizar a contratação/simulação de empréstimo consignado Privado,
      nos Termos da LEI 10.820 de 17 de Dezembro de 2013.{' '}
    </TypographyCorpo>
    <br />
    <TypographyTopico>Dados de identificação:</TypographyTopico>
    <TypographyCorpo>
      CPF, data de nascimento, nome completo, órgão emissor RG, UF emissora RG,
      data emissão RG, número RG e naturalidade.
    </TypographyCorpo>
    <TypographyTopico>Dados de endereço:</TypographyTopico>
    <TypographyCorpo>
      UF, cidade, bairro, logradouro, número residência, CEP e complemento de
      endereço.
    </TypographyCorpo>
    <TypographyTopico>Dados de folha de pagamento:</TypographyTopico>
    <TypographyCorpo>
      Número matricula, CBO (Classificação Brasileira de Ocupação), cargo, data
      de admissão, data de desligamento e salário bruto/líquido.
    </TypographyCorpo>
    <br />
    <TypographyCorpo>
      Este termo autoriza a Instituição Financeira Consignatária a consultar as
      informações acima descritas durante um período de 30 dias, com o objetivo
      único e exclusivo de viabilizar a contratação/simulação de empréstimo
      consignado Privado.
    </TypographyCorpo>
  </div>
);

TermoDeAutorizacao.titulo = 'TERMO DE AUTORIZAÇÃO';

export default TermoDeAutorizacao;
