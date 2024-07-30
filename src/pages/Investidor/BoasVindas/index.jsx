import React, { useEffect, useState } from 'react';

import BoasVindasInfo from 'components/BoasVindasInfo';
import Header from 'components/Header';
import Container from 'components/MaterialUI/Container';
import Grid from 'components/MaterialUI/Grid';
import ModalValidaContatoGeral from 'components/ModalValidaContatoGeral';
import { useAppGlobal } from 'providers/AppGlobal';

import { useCreditoExpress } from '@credito-express/ce-components';

import LoadingListaInvestimentos from '../../../components/BuscaDeInvestimentos/ListaDeInvestimentos/LoadingListaInvestimentos';
import pushRota from '../../../routes/push';

export default function BoasVindas() {
  const {
    state: { pessoa },
  } = useCreditoExpress();
  const {
    actions: { exibirAlerta },
  } = useAppGlobal();
  const [openModalCodigoSMS, setOpenModalCodigoSMS] = useState(false);
  const [openModalCodigoEmail, setOpenModalCodigoEmail] = useState(false);
  const [emailVerificado, setEmailVerificado] = useState(false);
  const [telefoneVerificado, setTelefoneVerificado] = useState(false);

  useEffect(() => {
    if (pessoa) {
      const { perfilVerificado } = pessoa;
      if (perfilVerificado) {
        setEmailVerificado(true);
        setTelefoneVerificado(true);
        redirecionarParaInvestimentos();
      } else {
        realizaValidacaoDePerfil();
      }
    }
  }, [pessoa]); // eslint-disable-line react-hooks/exhaustive-deps

  const redirecionarParaInvestimentos = async () => {
    return pushRota('/investidor/busca-investimentos-disponiveis');
  };

  const realizaValidacaoDePerfil = () => {
    if (!emailVerificado) {
      setOpenModalCodigoEmail(true);
    } else if (!telefoneVerificado) {
      setOpenModalCodigoSMS(true);
    } else {
      // perfil ja verificado
    }
  };

  const handleAvancarCodigoEmail = () => {
    setEmailVerificado(true);
    setOpenModalCodigoEmail(false);
    setOpenModalCodigoSMS(true);
  };

  const handleAvancarCodigoSMS = () => {
    setTelefoneVerificado(true);
    setOpenModalCodigoSMS(false);
    exibirAlerta('Perfil verificado com sucesso!', 'success');
    // redirecionar();
  };

  if (!pessoa) {
    return <LoadingListaInvestimentos />;
  }

  const { email } = pessoa;

  return (
    <div style={{ padding: 12 }}>
      {openModalCodigoEmail && (
        <ModalValidaContatoGeral
          tipoValidacao="EMAIL"
          contato={email}
          open={openModalCodigoEmail}
          dismissHandler={() => setOpenModalCodigoEmail(false)}
          handleAvancar={handleAvancarCodigoEmail}
          maxWidth="sm"
        />
      )}
      {openModalCodigoSMS && (
        <ModalValidaContatoGeral
          tipoValidacao="TELEFONE"
          disableBackdropClick
          // celular={'34991853606'}
          open={openModalCodigoSMS}
          dismissHandler={() => setOpenModalCodigoSMS(false)}
          handleAvancar={handleAvancarCodigoSMS}
          maxWidth="sm"
        />
      )}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Header pessoa={pessoa} />
        </Grid>
        <Grid item xs={12}>
          {/* <InfoContainer> */}
          <Container maxWidth="lg">
            <BoasVindasInfo
              nome={pessoa ? pessoa.nome : ''}
              emailVerificado={emailVerificado}
              telefoneVerificado={telefoneVerificado}
              verificarPerfil={realizaValidacaoDePerfil}
              continuarHandler={() =>
                pushRota('/investidor/busca-investimentos-disponiveis')
              }
            />
          </Container>
          {/* </InfoContainer> */}
        </Grid>
      </Grid>
    </div>
  );
}
