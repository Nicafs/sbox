let ac = null;

export const getAudioContext = () => ac;

export const createAudioContext = () => {
  if (!window.AudioContext && !window.webkitAudioContext) {
    console.warn('Web Audio API not supported in this browser');
  } else {
    ac = new (window.AudioContext || window.webkitAudioContext)();
  }
  return ac;
};
