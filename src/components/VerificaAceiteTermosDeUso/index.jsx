import React, { useState } from 'react';

import Pessoa from '../../commons/resources/pessoa';
import Loader from './loader';
import ModalAceiteTermosDeUso from './ModalAceiteTermosDeUso';

const VerificaAceiteTermosDeUso = ({ btnAceitoClickHandler }) => {
  const [loading, setLoading] = useState(false);

  const aceiteUsuarioHandler = async () => {
    setLoading(true);
    try {
      await Pessoa.aceitarTermoPrivacidade();
      btnAceitoClickHandler();
    } catch (err) {
      console.error('Ocorreu um erro ao aceitar o termo de privacidade!');
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <ModalAceiteTermosDeUso
      open
      btnAvancarClickHandler={aceiteUsuarioHandler}
    />
  );
};

export default VerificaAceiteTermosDeUso;
