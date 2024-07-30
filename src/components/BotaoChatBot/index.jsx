import React from 'react';

import WhatsappImg from '../../assets/images/whatsapp-atendimento.png';
import { useChatBot } from '../../providers/ChatBot';
import { Container, ImagemWhatsapp } from './style';

const BotaoChatBot = () => {
  const { visivel } = useChatBot();

  const onClick = () => {
    window.open(
      'https://api.whatsapp.com/send/?phone=5534999562676&text=%22Quero+ajuda%22&app_absent=0',
      '__blank',
    );
  };

  if (!visivel) {
    return null;
  }

  return (
    <Container onClick={onClick}>
      <ImagemWhatsapp src={WhatsappImg} />
    </Container>
  );
};

export default BotaoChatBot;
