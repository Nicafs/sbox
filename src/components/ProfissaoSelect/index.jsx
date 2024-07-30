import React, { useEffect } from 'react';

import ProfissaoApi from '../../commons/resources/profissao';
import Autocomplete from '../Autocomplete';

// import { Container } from './styles';

export default function ProfissaoSelect({ handleChange, valor, valorId }) {
  const [listaDefault, setListaDefault] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    if (listaDefault.length === 0) {
      buscaInicial();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const buscaInicial = async () => {
    const profs = await buscarOpcoes('');
    setListaDefault(profs);
  };

  useEffect(() => {
    buscarProfissaoDoDB();
  }, [valorId]); // eslint-disable-line react-hooks/exhaustive-deps

  async function buscarProfissaoDoDB() {
    if (valorId) {
      const profissaoResult = await ProfissaoApi.getProfissao(valorId);
      const { id, nome } = profissaoResult;
      const profissaoEncontrada = { value: id, label: nome };
      setListaDefault(listaAtual => [...listaAtual, profissaoEncontrada]);
      handleChange(profissaoEncontrada);
    }
  }

  const buscarProfissoes = (str = '') => {
    return ProfissaoApi.buscarProfissoes(str);
  };

  const buscarOpcoes = async busca => {
    let profissoesResponse;
    try {
      setLoading(true);
      profissoesResponse = await buscarProfissoes(busca);
    } finally {
      setLoading(false);
    }
    if (profissoesResponse) {
      const profissoesArr = profissoesResponse.map(p => ({
        value: p.id,
        label: p.nome,
      }));
      return profissoesArr;
    }
    return [];
  };

  return (
    <Autocomplete
      idInput="selectProfissao"
      placeholder="Digite aqui sua profissão"
      valor={valor}
      handleChange={handleChange}
      buscarOpcoes={buscarOpcoes}
      opcoes={listaDefault}
      async
      mensagemSemOpcao="Nenhuma profissão encontrada"
      isLoading={loading}
    />
  );
}
