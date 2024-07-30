export const possuiPermissaoDeMidia = async inputType => {
  // inputType: ['audioinput', 'videoinput']

  if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
    console.error('enumerateDevices() not supported.');
    return;
  }
  const devices = await navigator.mediaDevices.enumerateDevices();
  const possuiPermissao = devices.find(
    ({ kind, label }) => kind === inputType && label,
  );
  return !!possuiPermissao;
};

export const possuiPermissao = async tipoPermissao => {
  // ex. tipoPermissao: geolocation
  const { state } = await navigator.permissions.query({ name: tipoPermissao });
  return state === 'granted';
};
