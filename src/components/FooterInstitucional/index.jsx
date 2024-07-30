import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import TipoLogo from 'commons/enums/TipoLogo';
import Grid from 'components/MaterialUI/Grid';

import { useAppGlobal } from '../../providers/AppGlobal';
import pushRota from '../../routes/push';
import ModalDetalhesTermo from '../VerificaAceiteTermosDeUso/ModalDetalhesTermo';
import TermoDePoliticaPrivacidade from '../VerificaAceiteTermosDeUso/ModalDetalhesTermo/TermoDePoliticaPrivacidade';
import TermoDeUso from '../VerificaAceiteTermosDeUso/ModalDetalhesTermo/TermoDeUso';
import {
  AcoesGrid,
  ButtonStyled,
  FooterContainer,
  FooterInfo,
  FooterLinkStyled,
  FooterTypographyStyled,
  Logo,
  TermosDeUsoGrid,
} from './style';

const FooterInstitucional = ({ Ref }) => {
  const {
    actions: { getLogo },
  } = useAppGlobal();
  const [TermoEmExibicao, setTermoEmExibicao] = useState();

  const exibirDetalhesDoTermo = Termo => {
    setTermoEmExibicao(() => Termo);
  };

  const fecharDetalhes = () => {
    setTermoEmExibicao(null);
  };

  return (
    <Grid container direction="column" ref={Ref}>
      {TermoEmExibicao && (
        <ModalDetalhesTermo
          open
          titulo={TermoEmExibicao.titulo}
          termoRender={() => <TermoEmExibicao />}
          dismissHandler={fecharDetalhes}
        />
      )}
      <FooterContainer container alignItems="center">
        <AcoesGrid container item xs={12} md={6}>
          <Logo src={getLogo(TipoLogo.BRASAO_MONOCROMATICO)} />
          <ButtonStyled onClick={() => pushRota('/quero-investir')}>
            Quero investir
          </ButtonStyled>
          <ButtonStyled onClick={() => pushRota('/quero-emprestimo')}>
            Quero empréstimo
          </ButtonStyled>
        </AcoesGrid>
        <TermosDeUsoGrid container item xs={12} md={6}>
          <ButtonStyled
            onClick={() => exibirDetalhesDoTermo(TermoDePoliticaPrivacidade)}
          >
            Política de privacidade
          </ButtonStyled>
          <ButtonStyled onClick={() => exibirDetalhesDoTermo(TermoDeUso)}>
            Termos de uso
          </ButtonStyled>
          <ButtonStyled>Ouvidoria</ButtonStyled>
          {/* <InstagramIcon></InstagramIcon> */}
          {/* <FacebookIcon></FacebookIcon> */}
          {/* <TwitterIcon></TwitterIcon> */}
          {/* <YouTubeIcon></YouTubeIcon> */}
        </TermosDeUsoGrid>
      </FooterContainer>
      <FooterInfo container justify="center" alignItems="center">
        <FooterTypographyStyled variant="subtitle1" align="center" gutterBottom>
          Entre em contato conosco através do e-mail:{' '}
          <strong>contato@creditoexpress.com.br</strong>
        </FooterTypographyStyled>
        <FooterTypographyStyled variant="subtitle1" align="center" gutterBottom>
          Somos um correspondente bancário da instituição financeira Portocred
          S/A – CNPJ/ME: 01.800.019/0001-85 e seguimos rigorosamente a resolução
          3.954/11 do Banco Central Brasileiro (BACEN). O uso desse site está
          sujeito às regras descritas no{' '}
          <FooterLinkStyled
            variant="h6"
            onClick={() => exibirDetalhesDoTermo(TermoDeUso)}
          >
            Termos de Uso
          </FooterLinkStyled>{' '}
          e{' '}
          <FooterLinkStyled
            variant="h6"
            onClick={() => exibirDetalhesDoTermo(TermoDePoliticaPrivacidade)}
          >
            Política de Privacidade
          </FooterLinkStyled>
        </FooterTypographyStyled>
        <FooterTypographyStyled variant="subtitle2" align="center" gutterBottom>
          GPD Consultoria - CNPJ: 41.861.561/0001-62 aos cuidados de
          dpo@creditoexpress.com.br
        </FooterTypographyStyled>
      </FooterInfo>
    </Grid>
  );
};

export default withRouter(FooterInstitucional);
