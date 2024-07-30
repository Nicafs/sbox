import React from 'react';

import numeroFuncs from 'numero-por-extenso';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { transformarDataApiParaDataLocal } from '../../../commons/tratativasParaDatasApi';
import { dataPorExtenso } from '../../../commons/utils/ManipulacaoUtils';
import {
  cepMask,
  cnpjMask,
  cpfMask,
  moneyMask,
  nomeMask,
} from '../../../commons/utils/MaskHandle';
import Table from '../../MaterialUI/Table';
import TableBody from '../../MaterialUI/TableBody';
import TableCell from '../../MaterialUI/TableCell';
import TableHead from '../../MaterialUI/TableHead';
import TableRow from '../../MaterialUI/TableRow';

const DivStyled = styled.div`
  text-align: left;
  color: ${({ theme }) => theme.palette.text.primary};
  max-height: 400px;
  overflow-y: scroll;
  & > h3,
  p,
  span {
    padding-left: ${({ theme }) => theme.spacing(1)}px;
    padding-right: ${({ theme }) => theme.spacing(1)}px;
  }
`;

const formatarEndereco = endereco => {
  return `${endereco.logradouro}, 
  ${endereco.numero ? `N.: ${endereco.numero}` : ''}
  ${endereco.complemento ? ` ${endereco.complemento}` : ''}
  . Bairro: ${endereco.bairro} - 
  ${endereco.cidade}-${endereco.estado} - 
  ${cepMask(endereco.cep)}`;
};

const gerarItemsTabelaParcelas = parcelas => {
  const gerarItem = (numero, valor, data) => {
    const dataLocal = transformarDataApiParaDataLocal(data).format(
      'DD/MM/YYYY',
    );
    return (
      <TableRow key={`${numero}-${data}`}>
        <TableCell align="right">{numero}</TableCell>
        <TableCell align="right">{`R$ ${moneyMask(valor)}`}</TableCell>
        <TableCell align="left">{dataLocal}</TableCell>
      </TableRow>
    );
  };
  const itensTabela = [];
  if (!parcelas) {
    return;
  }
  parcelas.forEach(p => {
    const { numero, valor, dataVencimento } = p;
    itensTabela.push(gerarItem(numero, valor, dataVencimento));
  });
  return itensTabela;
};

export default function TermoBody(props) {
  const { dadosContrato } = props;

  const { negociacao } = dadosContrato;
  const { parcelas } = negociacao;
  const { investidor } = dadosContrato;
  const { organizacao } = dadosContrato;
  const { empresa } = dadosContrato;

  return (
    <DivStyled>
      <h3>
        CONTRATO DE EMPRÉSTIMO ENTRE PESSOAS FÍSICAS POR INTERMÉDIO DE
        PLATAFORMAS DIGITAIS E OUTRAS AVENÇAS
      </h3>
      <br />
      <p>
        <strong>DAS PARTES</strong>
      </p>
      <p>
        <strong>
          INVESTIDOR:{' '}
          <span name="investidor-nome">{investidor.nome.toUpperCase()}</span>
        </strong>
        ,{' '}
        <span name="investidor-nacionalidade">
          {investidor.nacionalidade
            ? nomeMask(investidor.nacionalidade)
            : 'Brasileiro(a)'}{' '}
        </span>
        , <span name="investidor-estado-civil">{investidor.estadoCivil}</span>,{' '}
        <span name="investidor-profissao">
          {nomeMask(investidor.profissao)}
        </span>
        , inscrito no CPF/MF de nº{' '}
        <span name="investidor-documento">{cpfMask(investidor.documento)}</span>
        <span name="investidor-rg">
          {investidor.rg ? ` e no RG de nº ${investidor.rg},` : ','}
        </span>{' '}
        residente e domiciliado na{' '}
        <span name="investidor-endereco">
          {formatarEndereco(investidor.endereco)}
        </span>
        , neste ato denominado simplesmente de{' '}
        <span name="investidor-codigo">{investidor.codigoContrato}</span>, com o
        fim de resguardar as informações sigilosas das partes.
      </p>
      <p>
        <strong>PLATAFORMA DIGITAL: {organizacao.nome.toUpperCase()}</strong>,
        inscrita no Cadastro Nacional de Pessoa Jurídica sob o número{' '}
        {cnpjMask(organizacao.cnpj)}, inscrição estadual sob o número{' '}
        {organizacao.inscricaoEstadual}, sediada na{' '}
        {formatarEndereco(organizacao.endereco)}.
      </p>
      <p>
        <strong>
          EMPREGADORA DO SOLICITANTE: {empresa.nome.toUpperCase()}
        </strong>
      </p>
      <p>
        As partes acima identificadas têm, entre si, justo e acertado o presente
        CONTRATO, que se regerá pelas cláusulas e condições descritas abaixo:
      </p>
      <p>
        <strong>DO OBJETO</strong>
      </p>
      <p>
        <strong>Cláusula 1ª.</strong> O presente instrumento tem como objetivo,
        o empréstimo no valor de{' '}
        <strong>
          R$ {negociacao.valor && moneyMask(negociacao.valor)} (
          {negociacao.valor &&
            numeroFuncs.porExtenso(
              negociacao.valor,
              numeroFuncs.estilo.monetario,
            )}
          )
        </strong>
        , recurso pertencente ao INVESTIDOR, o qual será emprestado ao
        SOLICITANTE, por intermédio do sistema pertencente a PLATAFORMA DIGITAL,
        através da transferência do valor para conta bancária designada pelo
        SOLICITANTE, dentro do prazo legal.
      </p>
      <p>
        <strong>Cláusula 2ª.</strong> O recurso descrito na Cláusula 1ª deverá
        ser transferido pela PLATAFORMA DIGITAL para a conta bancária designada
        pelo SOLICITANTE dentro do prazo máximo de 5 dias úteis, após a efetiva
        disponibilização dos recursos aportados pelo INVESTIDOR no sistema da
        PLATAFORMA DIGITAL.
      </p>
      <p>
        <strong>Cláusula 3ª.</strong> A EMPREGADORA DO SOLICITANTE ficará
        responsável por realizar o desconto do valor emprestado ao SOLICITANTE,
        diretamente no seu salário mensalmente, efetuando o repasse dos valores
        para a PLATAFORMA DIGITAL, até o dia 05 (cinco) de cada mês, nos termos
        do acordo firmado entre a EMPREGADORA DO SOLICITANTE e a PLATAFORMA
        DIGITAL.
      </p>
      <p>
        <strong>Cláusula 4ª.</strong> Caso o contrato de trabalho do SOLICITANTE
        seja rescindido com a EMPREGADORA DO SOLICITANTE por quaisquer motivos
        que sejam, será descontado do SOLICITANTE 30% (trinta por cento) do
        valor recebido pelo SOLICITANTE a título de rescisão do contrato de
        trabalho, para a quitação do saldo devedor.
      </p>
      <p>
        <strong>Cláusula 5ª.</strong> Caso o valor descontado do SOLICITANTE a
        título de rescisão do contrato de trabalho, para quitação do saldo
        devedor do presente contrato de empréstimo seja inferior ao valor total
        do débito, será efetuada a tentativa de cobrança extrajudicial e/ou
        judicial dos valores pela PLATAFORMA DIGITAL.
      </p>
      <br />
      <h3>DA TABELA DE PREVISÃO DO RECEBIMENTO DOS RECURSOS EMPRESTADOS</h3>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Table style={{ maxWidth: 500 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Número</TableCell>
              <TableCell align="right">Valor</TableCell>
              <TableCell align="left">Data Pagamento</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{gerarItemsTabelaParcelas(parcelas)}</TableBody>
        </Table>
      </div>
      <br />
      <p>
        <strong>Cláusula 6ª.</strong> Caso o SOLICITANTE não efetue o pagamento
        dos valores tomados dentro do prazo contratado, serão aplicadas sobre as
        parcelas Multa de 2% sobre o valor em atraso, Juros de Mora de 1% ao
        mês, acrescida de Atualização Monetária de acordo com os juros
        remuneratórios do período, até o dia da efetiva liquidação da dívida.
      </p>
      <p>
        <strong>Cláusula 7ª.</strong> O INVESTIDOR está ciente que somente
        receberá as parcelas que espera receber em virtude dos investimentos
        efetuados no sistema da PLATAFORMA DIGITAL caso a SOLICITANTE efetue os
        pagamentos, totais ou parciais, das parcelas a PLATAFORMA DIGITAL, neste
        contexto, o INVESTIDOR deve estar ciente dos riscos da operação e apenas
        investir no sistema da PLATAFORMA DIGITAL uma parcela de seu patrimônio,
        que seja destinada a investimentos de risco, NÃO CABENDO QUALQUER
        RESPONSABILIDADE A PLATAFORMA DIGITAL EM CASO DE INADIMPLEMENTO DO
        SOLICITANTE.
      </p>
      <p>
        <strong>Cláusula 8ª.</strong> Caso a PLATAFORMA DIGITAL não consiga
        receber o valor inadimplido pelo solicitante, tendo em vista a rescisão
        do contrato de trabalho do solicitante, a PLATAFORMA DIGITAL não poderá
        ser responsabilizada pelo valor inadimplido em nenhuma hipótese, sendo a
        referida operação de risco total do INVESTIDOR.
      </p>
      <br />
      <h3>DA PROCURAÇÃO DO INVESTIDOR</h3>
      <p>
        <strong>Cláusula 9ª.</strong> O INVESTIDOR concede plenos e totais
        poderes a PLATAFORMA DIGITAL, concedendo permissão e autorização para
        que a PLATAFORMA DIGITAL realize todos os atos necessários com o fim de
        viabilizar os seus investimentos por meio do sistema eletrônico da
        PLATAFORMA DIGITAL, para atuar em nome do INVESTIDOR na cobrança
        extrajudicial e/ou judicial dos créditos inadimplidos pelo SOLICITANTE,
        bem como seguir todos os procedimentos mencionados neste instrumento.
      </p>
      <br />
      <h3>DA POLÍTICA DE PROTEÇÃO DOS DADOS</h3>
      <p>
        <strong>Cláusula 10ª.</strong> Ao utilizar o sistema eletrônico da
        PLATAFORMA DIGITAL, o INVESTIDOR garante que todas as informações, dados
        e documentos fornecidos no curso dos procedimentos exigidos são
        verdadeiros, completos e precisos em todos os seus aspectos. O
        INVESTIDOR garante ainda que os documentos digitais disponibilizados são
        cópias fiéis e integrais dos documentos originais que estão em seu poder
        e que os mesmos não sofreram qualquer alteração. O INVESTIDOR se
        compromete a atualizar imediatamente as suas informações, dados e/ou
        documentos caso exista qualquer tipo de alteração posterior.
      </p>
      <p>
        <strong>Cláusula 11ª.</strong> O INVESTIDOR concede total permissão para
        que a PLATAFORMA DIGITAL acesse e utilize suas informações pessoais e
        sigilosas, conforme estipulado pela Lei nº 13.709/2018 (Lei Geral de
        Proteção de Dados Pessoais).
      </p>
      <p>
        <strong>Cláusula 12ª.</strong> A PLATAFORMA DIGITAL irá utilizar os
        dados recebidos, assim como demais informações coletadas exclusivamente
        para os fins do sistema gerido dentro da plataforma, incluindo análise
        de crédito do SOLICITANTE, análise do perfil de risco do INVESTIDOR,
        prevenção à fraude, políticas de KYC (Know Your Client - conheça o seu
        cliente), prevenção e combate à lavagem de dinheiro, entre outros. Sendo
        assim, caso você esteja acessando o sistema da PLATAFORMA DIGITAL,
        destacamos que você estará autorizando-a a dividir seus dados com uma
        instituição financeira parceira. A PLATAFORMA DIGITAL se resguarda o
        direito de utilizar os dados recibos e fazer análises da maneira que
        julgar adequada, com extremo respeito e obediência a Lei nº 13.709/2018
        (Lei Geral de Proteção de Dados Pessoais).
      </p>
      <p>
        <strong>Cláusula 13ª.</strong> O INVESTIDOR desde já concorda que a
        INSTITUIÇÃO FINANCEIRA PARCEIRA e a PLATAFORMA DIGITAL, poderão
        comunicar ao Banco Central do Brasil, ao Conselho de Controle de
        Atividades Financeiras ou outros órgãos, conforme previsto na legislação
        aplicável, as operações que possam estar configuradas na Lei nº 9.613/98
        (que dispõe sobre os crimes de lavagem ou ocultação de bens, direitos e
        valores) e demais disposições normativas pertinentes à matéria.
      </p>
      <p>
        <strong>Cláusula 14ª.</strong> A PLATAFORMA DIGITAL considera a
        segurança das suas informações muito importante e, portanto, executa as
        melhores práticas para mantê-las protegidas. Porém, por mais que a
        PLATAFORMA DIGITAL tome todas as providencias técnicas adequadas para
        proteger as suas informações, não assumimos qualquer responsabilidade se
        elas forem interceptadas ou incorretamente acessadas por terceiros. Esta
        Política de Privacidade aplica-se apenas às informações pessoais que a
        PLATAFORMA DIGITAL recolhe não sendo responsável pela informação pessoal
        que terceiros venham a coletar, armazenar e utilizar através de outros
        sites. Neste sentido, você desde já reconhece e concorda que a
        PLATAFORMA DIGITAL não será responsável, direta ou indiretamente, por
        quaisquer perdas e danos que sejam causados por ou em conexão com tais
        sites de terceiros. Você também tem responsabilidades para assegurar que
        sua informação está em segurança. Se você é um membro da Plataforma, é
        necessário que: Mantenha seus dados de login (acesso) seguros; Sempre
        faça logout da sua conta (desconecte-se), quando não for usá-lo; tente
        realizar boas práticas de segurança, como por exemplo ter cuidado ao
        usar Wi-Fi público ou conexões de acesso compartilhado à Internet; e nos
        comunique imediatamente se você suspeita que sua conta foi invadida ou
        acessada por terceiros não autorizados.
      </p>
      <p>
        <strong>Cláusula 15ª.</strong> A PLATAFORMA DIGITAL manterá seus dados
        pessoais somente pelo tempo que for necessário para cumprir com as
        finalidades para as quais os coletamos, inclusive para fins de
        cumprimento de quaisquer obrigações legais, contratuais, de prestação de
        contas ou requisição de autoridades competentes. Para determinar o
        período de retenção adequado para os dados pessoais, consideramos a
        quantidade, a natureza e a sensibilidade dos dados pessoais, o risco
        potencial de danos decorrentes do uso não autorizado ou da divulgação de
        seus dados pessoais, a finalidade de processamento dos seus dados
        pessoais e se podemos alcançar tais propósitos através de outros meios,
        através dos requisitos legais aplicáveis. As informações registradas no
        sistema serão mantidas enquanto você mantiver essa conta ativa. Caso
        você solicite a exclusão dos seus dados do sistema, a PLATAFORMA DIGITAL
        excluirá os seus dados, a menos que a sua manutenção seja necessária
        para cumprir com as finalidades para as quais os dados foram coletados,
        obrigações legais, contratuais, de prestação de contas ou requisição de
        autoridades competentes.
      </p>
      <br />
      <h3>DAS DISPOSIÇÕES GERAIS</h3>
      <p>
        <strong>Cláusula 16ª.</strong> O presente contrato é totalmente regido
        pelas normas da RESOLUÇÃO Nº 4.656/2018, do Banco Central do Brasil,
        obedecendo as suas regras e limitações.
      </p>
      <p>
        <strong>Cláusula 17ª.</strong> Fica assegurado o cumprimento do disposto
        no art. 10 da RESOLUÇÃO Nº 4.656/2018, do Banco Central do Brasil.
      </p>
      <p>
        <strong>Cláusula 18ª.</strong> É vedado a qualquer das partes ceder ou
        transferir os direitos e obrigações deste contrato, sem o prévio e
        expresso consentimento das partes.
      </p>
      <p>
        <strong>Cláusula 19ª.</strong> O presente contrato obriga as partes,
        seus sucessores, herdeiros e cessionários a qualquer título.
      </p>
      <p>
        <strong>Cláusula 20ª.</strong> A PLATAFORMA DIGITAL exerce o papel de
        correspondente bancário da Instituição Financeira Parceira e de
        mandatária do INVESTIDOR para executar as transações relacionadas aos
        investimentos diretamente no sistema eletrônico da PLATAFORMA DIGITAL em
        seu nome, e não irá, de forma alguma, executar quaisquer funções de
        gestão em nome dos investidores, sendo assim, o INVESTIDOR mantém o
        controle total e o poder de decisão sobre se deve ou não investir nos
        pedidos elaborados pelos SOLICITANTES dentro do sistema da PLATAFORMA
        DIGITAL. A PLATAFORMA DIGITAL não dá conselhos ou recomendações para os
        Investidores ou para quaisquer terceiros e nenhuma informação
        disponibilizada na Plataforma deve ser interpretada como aconselhamento
        ou recomendação. A PLATAFORMA DIGITAL atuará somente como mandatária do
        INVESTIDOR para a formalização dos documentos e procedimentos
        necessários à efetivação dos investimentos, transferências entre contas
        de pagamento operadas por meio da plataforma e a representação dos
        interesses dos investidores em caso de inadimplemento dos solicitantes
        em relação ao pagamento do principal e dos juros do empréstimo contraído
        pelo SOLICITANTE, conforme poderes concedidos.
      </p>
      <p>
        <strong>
          Cláusula 21ª. A UTILIZAÇÃO DA PLATAFORMA DIGITAL, IMPLICA NA ACEITAÇÃO
          TOTAL DAS DISPOSIÇÕES DESTE CONTRATO E SEUS ANEXOS. CASO VOCÊ NÃO
          CONCORDE COM ALGUMA DISPOSIÇÃO AQUI PRESENTE, NÃO UTILIZE OS SERVIÇOS.
        </strong>
      </p>
      <p>
        <strong>Cláusula 22ª.</strong> Para dirimir quaisquer controvérsias
        oriundas do presente instrumento, as partes elegem o foro da comarca de
        Uberlândia (MG).
      </p>
      <br />
      <p>
        <strong>
          O INVESTIDOR reconhece e concorda que este é um contrato eletrônico e
          que ao clicar no campo "Li e concordo com os termos acima.", o
          INVESTIDOR estará concordando, de forma irrevogável e irretratável,
          com todos os direitos e obrigações estabelecidos neste instrumento,
          seus anexos, adendos, aditivos, etc.
        </strong>
      </p>
      <br />
      <p>
        {organizacao &&
          `${organizacao.endereco.cidade} (${organizacao.endereco.estado})`}
        , {dataPorExtenso(new Date(), false)}.
      </p>
      <br />
    </DivStyled>
  );
}

TermoBody.defaultProps = {
  negociacao: {},
};

/* eslint-disable react/forbid-prop-types */
TermoBody.propTypes = {
  negociacao: PropTypes.object,
};
