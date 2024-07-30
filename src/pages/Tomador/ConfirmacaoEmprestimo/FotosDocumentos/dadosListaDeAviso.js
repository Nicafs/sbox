export const dadosPadroesListaAvisos = {
  titulo: 'Como fazer',
  items: [
    {
      descricao: `Documentos originais
            (não enviar imagens de fotocópia).`,
    },
    {
      descricao: `A imagem do documento deve estar nítida.`,
    },
    {
      descricao: `Cuidado com reflexos que afetem a legibilidade.`,
    },
    {
      descricao: `Ao fotografar, se atente a iluminação do ambiente.`,
    },
    {
      descricao: `O lado da frente do documento é o que contém a foto 3x4.`,
    },
  ],
};

export const toggleItemListaDeAvisosFactory = (
  dadosListaDeAviso,
  setDadosListaDeAvisos,
) => item => {
  const { items: itemsEstadoAtual } = dadosListaDeAviso;
  const novosItems = itemsEstadoAtual.map(d => {
    if (d.descricao === item.descricao) {
      return {
        ...d,
        selecionado: !d.selecionado,
      };
    }
    return d;
  });
  setDadosListaDeAvisos({
    ...dadosListaDeAviso,
    items: novosItems,
  });
};
