import React from 'react';

import Header from 'components/Header';
import Box from 'components/MaterialUI/Box';
import Button from 'components/MaterialUI/Button';
import Divider from 'components/MaterialUI/Divider';
import Grid from 'components/MaterialUI/Grid';
import TextField from 'components/MaterialUI/TextField';

import { ContainerPrincipalStyled, Titulo } from './style';

export default function MeusDados() {
  const [numTelefone, setNumTelefone] = React.useState('');
  const [dtaNascimento, setDtaNascimento] = React.useState('');
  const [emailCorporativo, setEmailCorporativo] = React.useState('');
  const [emailPessoal, setEmailPessoal] = React.useState('');
  const [cep, setCep] = React.useState('');
  const [logradouro, setLogradouro] = React.useState('');
  const [numeroEndereco, setNumeroEndereco] = React.useState('');
  const [bairro, setBairro] = React.useState('');
  const [complemento, setComplemento] = React.useState('');
  const [profissao, setProfissao] = React.useState('');
  const [estadoCivil, setEstadoCivil] = React.useState('');

  function renderDadosPessoais() {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="numTelefone"
            label="Telefone"
            name="numTelefone"
            value={numTelefone}
            autoFocus
            onChange={evt => setNumTelefone(evt.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="dtaNascimento"
            label="Data de nascimento"
            name="dtaNascimento"
            value={dtaNascimento}
            onChange={evt => setDtaNascimento(evt.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="emailCorporativo"
            label="E-mail corporativo"
            name="emailCorporativo"
            value={emailCorporativo}
            autoComplete="email"
            onChange={evt => setEmailCorporativo(evt.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="emailPessoal"
            label="E-mail pessoal"
            name="emailPessoal"
            value={emailPessoal}
            autoComplete="email"
            onChange={evt => setEmailPessoal(evt.target.value)}
          />
        </Grid>
      </Grid>
    );
  }

  function renderEndereco() {
    return (
      <>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="cep"
              label="CEP"
              name="cep"
              value={cep}
              onChange={evt => setCep(evt.target.value)}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="logradouro"
              label="Logradouro"
              name="logradouro"
              value={logradouro}
              onChange={evt => setLogradouro(evt.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="numeroEndereco"
              label="Número endereço"
              name="numeroEndereco"
              value={numeroEndereco}
              onChange={evt => setNumeroEndereco(evt.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="bairro"
              label="Bairro"
              name="bairro"
              value={bairro}
              onChange={evt => setBairro(evt.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="complemento"
              label="Complemento"
              name="complemento"
              value={complemento}
              onChange={evt => setComplemento(evt.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="profissao"
              label="Profissão"
              name="profissao"
              value={profissao}
              onChange={evt => setProfissao(evt.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="estadoCivil"
              label="Estado civil"
              name="estadoCivil"
              value={estadoCivil}
              onChange={evt => setEstadoCivil(evt.target.value)}
            />
          </Grid>
        </Grid>
      </>
    );
  }

  return (
    <>
      <Header withSubMenu={false} />
      <ContainerPrincipalStyled maxWidth="md">
        <Titulo>Meus dados</Titulo>
        {renderDadosPessoais()}
        <Box mt={3} mb={3}>
          <Divider dashed="true" />
        </Box>
        {renderEndereco()}
        <Grid container direction="row-reverse">
          <Grid item xs={12} md={2}>
            <Box mt={4} mb={4}>
              <Button primary="true" rounded="true">
                Salvar
              </Button>
            </Box>
          </Grid>
        </Grid>
      </ContainerPrincipalStyled>
    </>
  );
}
