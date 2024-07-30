import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import { remove } from 'remove-accents';

import EnderecoApi from '../../commons/resources/endereco';
import Autocomplete from '../Autocomplete';

export default function CidadeSelect({
  uf,
  valor,
  handleChange,
  disabled,
  idCidade,
}) {
  const [cidades, setCidades] = useState([]);
  const [ufSelecionado, setUfSeleciondo] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if ((cidades.length === 0 && uf) || (uf && uf !== ufSelecionado)) {
      listarCidades(uf);
      handleChange(undefined);
    }
  }, [cidades, uf, ufSelecionado]); // eslint-disable-line react-hooks/exhaustive-deps

  const listarCidades = async paramUf => {
    setLoading(true);
    if (paramUf) {
      const cidadesResult = await EnderecoApi.listarCidadesPorUF(paramUf);
      setCidades(
        cidadesResult.map(({ id, nome }) => ({ value: id, label: nome })),
      );
    }
    setLoading(true);
    setUfSeleciondo(paramUf);
  };

  useEffect(() => {
    if (!disabled) {
      return;
    }

    if (cidades && cidades.length > 0 && idCidade) {
      const cidadeEncontrada = cidades.filter(
        ({ value }) => value === idCidade,
      );
      if (cidadeEncontrada && cidadeEncontrada.length > 0) {
        handleChange(cidadeEncontrada[0]);
      }
    }
  }, [disabled, cidades, idCidade]); // eslint-disable-line react-hooks/exhaustive-deps

  async function buscarDados(busca) {
    setLoading(true);
    const cidadesBusca = cidades.filter(({ label }) =>
      remove(label.toLowerCase()).includes(remove(busca.toLowerCase())),
    );
    setLoading(false);
    return cidadesBusca;
  }

  return (
    <Autocomplete
      idInput="selectCidade"
      placeholder="Digite aqui sua cidade"
      valor={valor}
      handleChange={handleChange}
      buscarOpcoes={buscarDados}
      opcoes={cidades.slice(0, 10)}
      async
      mensagemSemOpcao="Nenhuma cidade encontrada"
      isLoading={loading}
      isDisabled={disabled}
    />
  );
}

CidadeSelect.propTypes = {
  disabled: PropTypes.bool,
  handleChange: PropTypes.func.isRequired,
  idCidade: PropTypes.string,
  uf: PropTypes.string,
  valor: PropTypes.string,
};

CidadeSelect.defaultProps = {
  disabled: false,
  idCidade: undefined,
  uf: undefined,
  valor: '',
};
