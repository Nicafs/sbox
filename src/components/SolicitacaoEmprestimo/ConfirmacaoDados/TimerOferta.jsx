import React from 'react';
import Countdown from 'react-countdown-now';

import { OfertaExpirada, CountdownContainer } from './style';

function renderContadorDeOferta(time) {
  const hours = time.hours.toString().padStart(2, '0');
  const minutes = time.minutes.toString().padStart(2, '0');
  const seconds = time.seconds.toString().padStart(2, '0');
  const diasPlural = time.days > 1 ? 's' : '';

  return (
    <>
      {time.days ? (
        <span>
          {time.days} dia{diasPlural}
        </span>
      ) : null}
      <span>
        {hours}:{minutes}:{seconds}
      </span>
    </>
  );
}

const TimerOferta = ({ dataExpiracao }) => {
  if (dataExpiracao) {
    if (new Date() > dataExpiracao) {
      return <OfertaExpirada>Essa oferta expirou!</OfertaExpirada>;
    }
    return (
      <CountdownContainer>
        <p>Essa oferta expira em</p>
        <Countdown date={dataExpiracao} renderer={renderContadorDeOferta} />
      </CountdownContainer>
    );
  }
  return null;
};

export default TimerOferta;
