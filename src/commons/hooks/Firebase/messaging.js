import { app as firebase } from '@credito-express/ce-components';

let messaging;

if (firebase.messaging.isSupported()) {
  messaging = firebase.messaging();
}

const getToken = async () => {
  let token;
  if (messaging) {
    try {
      console.log('Obtendo token FCM atual');
      token = await messaging.getToken();
      return token;
    } catch (error) {
      console.error('Erro ao obter token FCM', error);
    }
  }
  return token;
};

const getMessagingModule = () => messaging;

export { getMessagingModule, getToken };
