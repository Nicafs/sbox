import React from 'react';

import Grid from 'components/MaterialUI/Grid';
import { useAppGlobal } from 'providers/AppGlobal';

import CardBeneficio from '../CardBeneficio';

export default function VantagensInvestimentoCreditoExpress() {
  const {
    tema: { nomeOrganizacao },
    actions: { getIcone },
  } = useAppGlobal();
  const cardsInfo = [
    {
      key: 'pagamento_folha_salarial',
      titulo: 'Pagamento através de desconto na folha salarial',
      texto:
        'O pagamento mensal das parcelas do empréstimo, são descontadas diretamente na folha salarial do colaborador.',
      iconeAsset: getIcone('icon-contrato'),
    },
    {
      key: 'quitacao_recisao',
      titulo: 'Quitação na rescisão do funcionário',
      texto:
        'Em situações de desligamento do tomador do empréstimo, efetuamos automaticamente o débito do saldo devedor do empréstimo na rescisão do colaborador, respeitando os limites estabelecidos por lei.',
      iconeAsset: getIcone('icon-cracha'),
    },
    {
      key: 'integracao_direta',
      titulo: 'Integração direta com empresa empregadora',
      texto:
        'Todas solicitações de empréstimos são originadas a partir de funcionários vinculados às empresas conveniadas, com as quais estabelecemos uma integração direta entre os sistemas de folha de pagamento.',
      iconeAsset: getIcone('icon-integracao'),
    },
    {
      key: 'dados_autenticos',
      titulo: 'Dados do funcionário autênticos',
      texto: `Todas as informações dos funcionários que solicitam crédito na ${nomeOrganizacao}, são originados do registro oficial da empresa conveniada`,
      iconeAsset: getIcone('icon-integracao'),
    },
  ];

  return (
    <Grid container spacing={3}>
      {cardsInfo.map(info => (
        <Grid key={info.key} item xs={12} md={6}>
          <CardBeneficio
            titulo={info.titulo}
            texto={info.texto}
            iconeAsset={info.iconeAsset}
          />
        </Grid>
      ))}
    </Grid>
  );
}
