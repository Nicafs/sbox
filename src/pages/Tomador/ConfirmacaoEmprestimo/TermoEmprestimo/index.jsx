import React, { useEffect, useState } from 'react';
import ReactHtmlParser from 'react-html-parser';
import PDF from 'react-pdf-js-infinite';

import { useFirebase, Button } from '@credito-express/ce-components';

import PrintIcon from '@material-ui/icons/Print';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

import Negociacao from '~/commons/resources/negociacao';
import VerificaPermissaoDeGps from '~/components/VerificaPermissaoDeGps';

import Loader from './loader';
import { DivPrincipalStyle } from './style';
import buscarDocumentosSemear from './firestoreSemear';

const TermoEmprestimo = ({
  negociacao,
  setCoordenadasGps,
  setExibirCheckBoxTermo,
  analyticsEventoSufixo,
  ehFluxoEp,
}) => {
  const firebase = useFirebase();
  const { id: idNegociacao } = negociacao;
  const [loading, setLoading] = useState(true);
  const [conteudoContrato, setConteudoContrato] = useState('');
  const [atualizaContratoEp, setAtualizaContratoEp] = useState(false);

  const buscarConteudoContrato = async () => {
    try {
      const { contrato: html } = await Negociacao.buscarContratoTomador(
        idNegociacao,
      );
      setConteudoContrato(html);
    } catch (err) {
      console.error(err);
    }
  };

  const onGpsCoordenadas = coord => {
    setCoordenadasGps(coord);
  };

  useEffect(() => {
    firebase
      .analytics()
      .logEvent(`acessou_aceite_termo${analyticsEventoSufixo}`);

    return () => setExibirCheckBoxTermo(false);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setLoading(true);
    ehFluxoEp
      ? buscarDocumentosSemear(idNegociacao, 'cedula', setConteudoContrato)
      : buscarConteudoContrato();
    setLoading(false);
  }, [atualizaContratoEp]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (conteudoContrato) {
      setExibirCheckBoxTermo(true);
    }
  }, [conteudoContrato]); // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) {
    return (
      <DivPrincipalStyle>
        <Loader />
      </DivPrincipalStyle>
    );
  }

  return (
    <DivPrincipalStyle>
      {conteudoContrato ? (
        <>
          <VerificaPermissaoDeGps
            onPermissaoAutorizadaHandler={onGpsCoordenadas}
          />
          {ehFluxoEp ? (
            <>
              <Hidden smUp>
                <PDF file={conteudoContrato} scale={1} />
              </Hidden>
              <Hidden xsDown>
                <PDF file={conteudoContrato} scale={1.5} />
              </Hidden>
              <Grid style={{ textAlign: 'end' }}>
                <Button
                  margin="0"
                  onClick={() => {
                    setAtualizaContratoEp(!atualizaContratoEp);
                    window.open(conteudoContrato);
                  }}
                >
                  <PrintIcon />
                </Button>
              </Grid>
            </>
          ) : (
            ReactHtmlParser(conteudoContrato) //uso correto<div dangerouslySetInnerHTML={{ __html: conteudoContrato }} />
          )}
        </>
      ) : (
        <Loader />
      )}
    </DivPrincipalStyle>
  );
};

TermoEmprestimo.label = 'Aceite os termos';
TermoEmprestimo.title = 'Aceite os termos';
TermoEmprestimo.precisaAceitarTermo = true;

export default TermoEmprestimo;
