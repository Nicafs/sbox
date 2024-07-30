import React from 'react';

import { TypographyCorpo } from './style';

const TermoSCR = () => (
  <div>
    <TypographyCorpo>
      Autorizo a Portocred S/A, Crédito, Financiamento e Investimento a
      consultar os débitos e responsabilidades decorrentes de operações com
      características de crédito e as informações e os registros de medidas
      judiciais que em meu nome constem ou venham a constar do Sistema de
      Informações de Crédito (SCR), gerido pelo Banco Central do Brasil - Bacen,
      ou dos sistemas que venham a complementá-lo ou a substituí-lo.
    </TypographyCorpo>
    <TypographyCorpo>Estou ciente de que:</TypographyCorpo>
    <TypographyCorpo>
      1. O SCR tem por finalidades fornecer informações ao Bacen para fins de
      supervisão do risco de crédito a que estão expostas as instituições
      financeiras e propiciar o intercâmbio de informações entre essas
      instituições com o objetivo de subsidiar decisões de crédito e de
      negócios;
    </TypographyCorpo>
    <TypographyCorpo>
      2. Poderei ter acesso aos dados constantes em meu nome no SCR por meio da
      Central de Atendimento ao Público do Banco Central do Brasil;
    </TypographyCorpo>
    <TypographyCorpo>
      3. Pedidos de correções, de exclusões e de manifestações de discordância
      quanto às informações constantes do SCR deverão ser dirigidas ao Bacen ou
      à instituição responsável pela remessa das informações, por meio de
      requerimento escrito e fundamentado, ou, quando for o caso, pela
      respectiva decisão judicial;
    </TypographyCorpo>
    <TypographyCorpo>
      4. A consulta sobre qualquer informação ao SCR depende de minha prévia
      autorização;
    </TypographyCorpo>
    <TypographyCorpo>
      5. Mais informações sobre o SCR podem ser obtidas em consulta à pagina na
      Internet do Banco Central: www.bcb.gov.br.
    </TypographyCorpo>
  </div>
);

TermoSCR.titulo =
  'AUTORIZAÇÃO PARA CONSULTA E REGISTRO AO SISTEMA DE INFORMAÇÕES DE CRÉDITOS (SCR)';

export default TermoSCR;
