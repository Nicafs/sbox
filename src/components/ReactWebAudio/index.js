import AudioPlayer from './AudioPlayer';
import AudioRecorder from './AudioRecorder';

// if (navigator.userAgent.toLowerCase().includes('iphone')) {
//   // polyfill also works for Chrome on Android, however there are some noises, so here it will use the standard Chrome MediaRecorder API
//   // eslint-disable-next-line global-require
//   window.MediaRecorder = require('audio-recorder-polyfill');
// }
// window.MediaRecorder = require('audio-recorder-polyfill');

const checkAudioPermission = async () => {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    let hasAudioPermissao = false;
    devices.forEach(device => {
      if (device.kind === 'audioinput' && device.label)
        hasAudioPermissao = true;
    });
    return hasAudioPermissao;
  } catch (e) {
    console.error(e);
  }
  return false;
};

export { AudioRecorder, AudioPlayer, checkAudioPermission };
