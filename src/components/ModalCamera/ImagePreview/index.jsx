import React, { useState } from 'react';

import Modais from './Modais';
import { Image, Container, CloseStyled, CheckStyled } from './styles';

const ImagePreview = ({ handleFinish, handleClose, img, handleNextStep }) => {
  const [confirm, setConfirm] = useState(false);
  const [typeModal, setTypeModal] = useState('loading');
  const [erro, setErro] = useState(null);

  const handleSubmit = async () => {
    setConfirm(true);
    setTypeModal('loading');
    try {
      await handleFinish(img);
      setTypeModal('success');
    } catch (error) {
      setErro(error.erro);
      setTypeModal('error');
    }
  };

  const handleRestart = () => {
    setConfirm(false);
    handleClose();
  };

  return (
    <Container>
      {confirm && (
        <Modais
          erro={erro}
          typeModal={typeModal}
          handleRestart={handleRestart}
          handleNextStep={handleNextStep}
        />
      )}
      <CloseStyled onClick={handleClose} />
      <Image alt="image" src={img} />
      <CheckStyled onClick={handleSubmit} />
    </Container>
  );
};

export default ImagePreview;
