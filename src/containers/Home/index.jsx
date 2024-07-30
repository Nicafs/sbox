import React from 'react';

import Header from 'components/Header';

import { ContainerPrincipalStyled, Titulo } from './style';

export default function Home() {
  return (
    <>
      <Header />
      <ContainerPrincipalStyled maxWidth="md">
        <Titulo>Home</Titulo>
      </ContainerPrincipalStyled>
    </>
  );
}
