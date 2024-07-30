import React, { useEffect, useState } from 'react';

import { ExpandMoreIcon, ExpandLessIcon } from 'components/MaterialUI/Icon';

import { IconContainer } from './style';

const InstitucionalScrollButton = ({ sectionsRefs, ocultarBotaoSobreRef }) => {
  const [botaoVisivel, setBotaoVisivel] = useState(true);
  const [direcaoDescendo, setDirecaoDescendo] = useState(true);

  useEffect(() => {
    window.addEventListener('scroll', scrollHandler);

    return () => window.removeEventListener('scroll', scrollHandler);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getWindowScrollTop = () =>
    window.pageYOffset || document.documentElement.scrollTop;

  const getProximaSectionRef = () => {
    const windowScrollTop = getWindowScrollTop();
    return sectionsRefs.find(
      ({ current: { offsetTop } }) => offsetTop > windowScrollTop,
    );
  };

  const getPrimeiraSectionRef = () => {
    return sectionsRefs[0];
  };

  // const getUltimaSectionRef = () => {
  //   return sectionsRefs[sectionsRefs.length - 1];
  // };

  const elementoApareceuNaTela = el => {
    const rect = el.getBoundingClientRect();
    return rect.top >= 0 && rect.top <= window.innerHeight;
  };

  const scrollAtualPassouLimiteBotao = () => {
    if (elementoApareceuNaTela(ocultarBotaoSobreRef.current)) {
      return true;
    }
    return false;
  };

  // const scrollAtualPassouLimiteBotao = () => {
  //   const windowScrollTop = getWindowScrollTop();
  //   const {
  //     current: { offsetTop: sectionOffsetTop },
  //   } = getUltimaSectionRef();
  //   const distancia = windowScrollTop - sectionOffsetTop;
  //   const distanciaLimite = 170;
  //   if (distancia > distanciaLimite) {
  //     return true;
  //   }
  //   return false;
  // };

  const scrollHandler = () => {
    if (scrollAtualPassouLimiteBotao()) {
      setBotaoVisivel(false);
    } else {
      setBotaoVisivel(true);
    }

    const proximaSectionRef = getProximaSectionRef();
    if (proximaSectionRef) {
      setDirecaoDescendo(true);
    } else {
      setDirecaoDescendo(false);
    }
  };

  const btnScrollHandler = () => {
    const proximaSectionRef = direcaoDescendo
      ? getProximaSectionRef()
      : getPrimeiraSectionRef();
    if (proximaSectionRef) {
      const {
        current: { offsetTop: sectionOffsetTop },
      } = proximaSectionRef;
      window.scrollTo(0, sectionOffsetTop);
    }
  };

  if (botaoVisivel) {
    return (
      <IconContainer onClick={btnScrollHandler}>
        {direcaoDescendo ? (
          <ExpandMoreIcon fontSize="large" />
        ) : (
          <ExpandLessIcon fontSize="large" />
        )}
      </IconContainer>
    );
  }
  return null;
};

export default InstitucionalScrollButton;
