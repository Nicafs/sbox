import React, { useState } from 'react';

import BotaoOutlineComIcone from 'components/BotaoOutlineComIcone';
import Grid from 'components/MaterialUI/Grid';
import Hidden from 'components/MaterialUI/Hidden';
import ModalQrCode from 'components/ModalQrCode';
import { useAppGlobal } from 'providers/AppGlobal';

import { AvisoItem, AvisoLista, AvisoTitulo, CheckboxStyled } from './styles';

export default function AvisosList({
  data,
  exibirContinuarNoCelular,
  comCheckbox,
  toggleItemListaDeAvisos,
}) {
  const [modalQrCodeVisivel, setModalQrCodeVisivel] = useState(false);
  const {
    actions: { getIcone },
  } = useAppGlobal();

  const icon = getIcone('icon-cel');

  return (
    <>
      {data && (
        <Grid container>
          <Grid item xs={12}>
            <AvisoTitulo variant="h5">{data.titulo}</AvisoTitulo>
          </Grid>
          <Grid item xs={12}>
            <AvisoLista comCheckbox={comCheckbox}>
              {modalQrCodeVisivel && (
                <ModalQrCode
                  open={modalQrCodeVisivel}
                  dismissHandler={() => setModalQrCodeVisivel(false)}
                  fecharHandler={() => setModalQrCodeVisivel(false)}
                  maxWidth="md"
                />
              )}
              {data.items.map(item => {
                const { descricao, destaque, selecionado } = item;
                return (
                  <li key={descricao}>
                    <AvisoItem destaque={destaque}>
                      {comCheckbox ? (
                        <>
                          <CheckboxStyled
                            defaultChecked={selecionado}
                            onChange={() => toggleItemListaDeAvisos(item)}
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                          />
                        </>
                      ) : null}
                      {descricao}
                    </AvisoItem>
                  </li>
                );
              })}
              {exibirContinuarNoCelular && (
                <Hidden smDown>
                  <AvisoItem>
                    <BotaoOutlineComIcone
                      cy-element="botaoContinuarNoCelular"
                      fullWidth
                      onClick={() => setModalQrCodeVisivel(true)}
                    >
                      <img src={icon} alt="Continuar no celular" />
                      Continuar no celular
                    </BotaoOutlineComIcone>
                  </AvisoItem>
                </Hidden>
              )}
            </AvisoLista>
          </Grid>
        </Grid>
      )}
    </>
  );
}

AvisosList.defaultProps = {
  exibirContinuarNoCelular: true,
};
