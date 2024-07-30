import React, { useState } from 'react';

import Box from '@material-ui/core/Box';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

import { useAppGlobal } from '~/providers/AppGlobal';

import Button from '../../MaterialUI/Button';
import Modal from '../../Modal';
import { Icone } from '../../ModalDataNascimento/style';
import ModalDetalhesTermo from '../ModalDetalhesTermo';
import TermoDeAutorizacao from '../ModalDetalhesTermo/TermoDeAutorizacao';
import TermoDePoliticaPrivacidade from '../ModalDetalhesTermo/TermoDePoliticaPrivacidade';
import TermoDePoliticaPrivacidadeSemear from '../ModalDetalhesTermo/TermoDePoliticaPrivacidadeSemear';
// import TermoDeUso from '../ModalDetalhesTermo/TermoDeUso';

const ModalAceiteTermosDeUso = ({ btnAvancarClickHandler, open }) => {
  const [checkSelecionado1, setCheckSelecionado1] = useState(false);
  const [checkSelecionado2, setCheckSelecionado2] = useState(false);
  const [TermoEmExibicao, setTermoEmExibicao] = useState();
  const {
    tema: { artigoDefinido, nomeOrganizacao },
    actions: { getIcone },
  } = useAppGlobal();

  const ehBancoSemear = nomeOrganizacao === 'Banco Semear S.A.';

  const onChange = (evt, setFn) => setFn(!!evt.target.checked);

  const btnAceiteDisponivel = ehBancoSemear
    ? checkSelecionado2
    : checkSelecionado1 && checkSelecionado2;

  const exibirDetalhesDoTermo = (e, Termo) => {
    e.preventDefault();
    setTermoEmExibicao(() => Termo);
  };

  const fecharDetalhes = () => {
    setTermoEmExibicao(null);
  };

  return (
    <>
      {!!TermoEmExibicao && (
        <ModalDetalhesTermo
          open
          titulo={TermoEmExibicao.titulo}
          termoRender={() => <TermoEmExibicao />}
          dismissHandler={fecharDetalhes}
        />
      )}
      <Modal open={open}>
        <Box mt={5} mb={5}>
          <Grid container direction="column" spacing={1}>
            <Grid item container justify="center" xs={12}>
              <Icone alt="icone-calendar" src={getIcone('icone-seguranca')} />
            </Grid>
            <Grid item xs={12}>
              <Typography
                align="center"
                color="textSecondary"
                variant="h4"
                gutterBottom
              >
                Termos de Uso
              </Typography>
            </Grid>
            {!ehBancoSemear && (
              <Grid container item xs={12}>
                <FormControlLabel
                  style={{ alignItems: 'end' }}
                  control={
                    <Checkbox
                      checked={checkSelecionado1}
                      onChange={e => onChange(e, setCheckSelecionado1)}
                      style={{ paddingTop: 0 }}
                    />
                  }
                  label={
                    <Typography variant="h6">
                      Autorizo {artigoDefinido} {nomeOrganizacao} acessar meus
                      dados cadastrais e informações do meu holerite da minha
                      empresa.{' '}
                      <Link
                        href="#"
                        variant="h6"
                        onClick={e =>
                          exibirDetalhesDoTermo(e, TermoDeAutorizacao)
                        }
                      >
                        Termo de Autorização.
                      </Link>
                    </Typography>
                  }
                />
              </Grid>
            )}
            <Grid container item xs={12}>
              <FormControlLabel
                style={{ alignItems: 'end' }}
                control={
                  <Checkbox
                    checked={checkSelecionado2}
                    onChange={e => onChange(e, setCheckSelecionado2)}
                    style={{ paddingTop: 0 }}
                  />
                }
                label={
                  <Typography variant="h6">
                    Aceito a{' '}
                    <Link
                      href="#"
                      variant="h6"
                      onClick={e =>
                        exibirDetalhesDoTermo(
                          e,
                          ehBancoSemear
                            ? TermoDePoliticaPrivacidadeSemear
                            : TermoDePoliticaPrivacidade,
                        )
                      }
                    >
                      Política de Privacidade
                    </Link>
                  </Typography>
                }
              />
            </Grid>
            <Grid container direction="row-reverse">
              <Grid item container direction="row-reverse" xs={12} md={4}>
                <Box mt={2}>
                  <Button
                    cy-element="modalAceiteTermosBtnSubmit"
                    rounded="true"
                    primary="true"
                    fullWidth
                    onClick={btnAvancarClickHandler}
                    disabled={!btnAceiteDisponivel}
                  >
                    LI E ACEITO OS TERMOS
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
};

export default ModalAceiteTermosDeUso;
