import React, { useRef, useState } from 'react';

import FooterInstitucional from 'components/FooterInstitucional';
import { useAppGlobal } from 'providers/AppGlobal';

import {
  CircularProgress,
  IconButton,
  Snackbar,
  Typography,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import SectionApresentacao from '../../components/Institucional/SectionApresentacao';
import SectionGraficos from '../../components/Institucional/SectionGraficos';
import SectionOqueFazemos from '../../components/Institucional/SectionOqueFazemos';
import SectionQuemSomos from '../../components/Institucional/SectionQuemSomos';
import InstitucionalScrollButton from '../../components/InstitucionalScrollButton';
import { Alert } from '~/containers/Institucional/style';

export default function InstitucionalContainer({ dadosSelic, taxas }) {
  const sectionsRefs = [
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    // useRef()
  ];
  const footerRef = useRef();

  const [alerta, setAlerta] = useState(true);

  const {
    tema: { loaded },
    actions: { getIcone },
  } = useAppGlobal();

  return !loaded ? (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <CircularProgress />
    </div>
  ) : (
    <>
      {alerta && (
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          open={alerta}
        >
          <Alert>
            <Typography>
              Atenção: Não pedimos pagamento antecipado para aprovação do
              empréstimo.
            </Typography>
            <IconButton
              id="close-alert"
              color="inherit"
              onClick={() => setAlerta(false)}
            >
              <CloseIcon />
            </IconButton>
          </Alert>
        </Snackbar>
      )}
      <SectionApresentacao getIcone={getIcone} sectionRef={sectionsRefs[0]} />
      <SectionQuemSomos sectionRef={sectionsRefs[1]} />
      <SectionOqueFazemos sectionRef={sectionsRefs[2]} getIcone={getIcone} />
      <SectionGraficos
        sectionRef={sectionsRefs[3]}
        dadosSelic={dadosSelic}
        taxas={taxas}
      />
      {/* <SectionEmpresasConectadas */}
      {/*  sectionRef={sectionsRefs[4]} */}
      {/*  nomeOrganizacao={nomeOrganizacao} */}
      {/* /> */}
      <FooterInstitucional Ref={footerRef} />
      <InstitucionalScrollButton
        sectionsRefs={sectionsRefs}
        ocultarBotaoSobreRef={footerRef}
      />
    </>
  );
}
