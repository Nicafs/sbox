import React from 'react';
import ContentLoader from 'react-content-loader';

import Grid from 'components/MaterialUI/Grid';
import Hidden from 'components/MaterialUI/Hidden';

export default function DetalhesDoInvestimentoLoader() {
  const renderMobile = () => (
    <Grid container>
      <ContentLoader
        speed={2}
        width="100%"
        height="100%"
        viewBox="0 0 410 1300"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <rect x="7" y="11" rx="0" ry="0" width="268" height="15" />
        <rect x="7" y="38" rx="0" ry="0" width="192" height="34" />
        <rect x="8" y="84" rx="0" ry="0" width="95" height="15" />
        <rect x="8" y="123" rx="0" ry="0" width="377" height="15" />
        <rect x="8" y="153" rx="0" ry="0" width="377" height="15" />
        <rect x="7" y="184" rx="0" ry="0" width="377" height="15" />
        <rect x="7" y="216" rx="0" ry="0" width="377" height="15" />
        <rect x="7" y="246" rx="0" ry="0" width="377" height="15" />
        <rect x="10" y="294" rx="0" ry="0" width="377" height="15" />
        <rect x="10" y="317" rx="0" ry="0" width="166" height="15" />
        <rect x="11" y="429" rx="0" ry="0" width="113" height="32" />
        <rect x="138" y="410" rx="0" ry="0" width="113" height="50" />
        <rect x="266" y="369" rx="0" ry="0" width="113" height="90" />
        <rect x="13" y="494" rx="0" ry="0" width="166" height="15" />
        <rect x="16" y="529" rx="0" ry="0" width="366" height="189" />
        <rect x="16" y="746" rx="0" ry="0" width="377" height="15" />
        <rect x="18" y="780" rx="0" ry="0" width="374" height="100" />
        <rect x="15" y="903" rx="0" ry="0" width="374" height="100" />
        <rect x="16" y="1023" rx="0" ry="0" width="374" height="100" />
        <rect x="16" y="1141" rx="0" ry="0" width="374" height="100" />
      </ContentLoader>
    </Grid>
  );

  const renderDesktop = () => (
    <Grid container justify="center">
      <ContentLoader
        speed={2}
        width="100%"
        height="100%"
        viewBox="0 0 1024 1100"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <rect x="5" y="32" rx="3" ry="3" width="137" height="16" />
        <rect x="5" y="76" rx="3" ry="3" width="103" height="0" />
        <rect x="6" y="63" rx="3" ry="3" width="103" height="14" />
        <rect x="3" y="1" rx="3" ry="3" width="193" height="16" />
        <rect x="6" y="97" rx="3" ry="3" width="457" height="16" />
        <rect x="6" y="122" rx="3" ry="3" width="457" height="16" />
        <rect x="7" y="150" rx="3" ry="3" width="457" height="16" />
        <rect x="6" y="176" rx="3" ry="3" width="457" height="16" />
        <rect x="7" y="203" rx="3" ry="3" width="457" height="16" />
        <rect x="776" y="15" rx="3" ry="3" width="221" height="219" />
        <rect x="4" y="265" rx="3" ry="3" width="599" height="16" />
        <rect x="210" y="415" rx="3" ry="3" width="156" height="35" />
        <rect x="406" y="376" rx="3" ry="3" width="156" height="72" />
        <rect x="610" y="339" rx="3" ry="3" width="156" height="107" />
        <rect x="14" y="496" rx="3" ry="3" width="988" height="250" />
        <rect x="17" y="783" rx="3" ry="3" width="466" height="107" />
        <rect x="533" y="783" rx="3" ry="3" width="466" height="107" />
        <rect x="19" y="912" rx="3" ry="3" width="466" height="107" />
        <rect x="534" y="912" rx="3" ry="3" width="466" height="107" />
      </ContentLoader>
    </Grid>
  );

  return (
    <>
      <Hidden mdDown>{renderDesktop()}</Hidden>
      <Hidden mdUp>{renderMobile()}</Hidden>
    </>
  );
}
