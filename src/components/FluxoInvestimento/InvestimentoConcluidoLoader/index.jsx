import React from 'react';
import ContentLoader from 'react-content-loader';

import Container from 'components/MaterialUI/Container';
import Grid from 'components/MaterialUI/Grid';
import Hidden from 'components/MaterialUI/Hidden';
import Paper from 'components/MaterialUI/Paper';
import styled from 'styled-components';

export const MainPaperStyled = styled(Paper)`
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing(5)}px;
  padding: ${({ theme }) => theme.spacing(7)}px;
  padding-left: ${({ theme }) => theme.spacing(30)}px;
  padding-right: ${({ theme }) => theme.spacing(30)}px;
  ${({ theme }) => theme.breakpoints.down('sm')} {
    margin-top: ${({ theme }) => theme.spacing(2)}px;
    padding: ${({ theme }) => theme.spacing(3)}px
      ${({ theme }) => theme.spacing(1)}px;
  }
`;

const InvestimentoConcluidoLoader = () => {
  return (
    <Container maxWidth="lg">
      <MainPaperStyled elevation={2}>
        <Grid
          container
          spacing={2}
          direction="column"
          alignItems="center"
          justify="center"
        >
          <Grid item xs={12}>
            <Hidden smDown>
              <ContentLoader
                speed={2}
                width={816}
                height={618}
                viewBox="0 0 816 618"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
              >
                <rect x="160" y="293" rx="3" ry="3" width="501" height="31" />
                <rect x="224" y="452" rx="3" ry="3" width="375" height="10" />
                <rect x="220" y="364" rx="3" ry="3" width="390" height="8" />
                <rect x="268" y="232" rx="3" ry="3" width="282" height="36" />
                <circle cx="406" cy="104" r="86" />
                <rect x="243" y="389" rx="3" ry="3" width="339" height="7" />
                <rect x="268" y="417" rx="3" ry="3" width="293" height="6" />
                <rect x="246" y="505" rx="28" ry="28" width="149" height="52" />
                <rect x="431" y="507" rx="28" ry="28" width="149" height="52" />
              </ContentLoader>
            </Hidden>
            <Hidden smUp>
              <ContentLoader
                speed={2}
                width={320}
                height={400}
                viewBox="0 0 320 400"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
              >
                <circle cx="133" cy="53" r="51" />
                <rect x="38" y="123" rx="0" ry="0" width="194" height="24" />
                <rect x="8" y="163" rx="0" ry="0" width="263" height="22" />
                <rect x="25" y="200" rx="0" ry="0" width="225" height="7" />
                <rect x="31" y="219" rx="0" ry="0" width="209" height="7" />
                <rect x="45" y="237" rx="0" ry="0" width="176" height="5" />
                <rect x="30" y="259" rx="0" ry="0" width="218" height="7" />
                <rect x="13" y="291" rx="8" ry="8" width="241" height="35" />
                <rect x="12" y="339" rx="8" ry="8" width="241" height="35" />
              </ContentLoader>
            </Hidden>
          </Grid>
        </Grid>
      </MainPaperStyled>
    </Container>
  );
};

export default InvestimentoConcluidoLoader;
