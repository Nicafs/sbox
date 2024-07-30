import { app } from '@credito-express/ce-components/dist/hooks/firebase';

const storage = app.storage();

export const uploadBase64AndReturnUrl = async (filename, base64raw) => {
  const storageRef = storage.ref();
  const fileRef = storageRef.child(filename);
  const base64parts = base64raw.split('base64,');
  const base64 = base64parts[1];
  await fileRef.putString(base64, 'base64');
  return fileRef.getDownloadURL();
};

export const getFileUrl = async filename => {
  const storageRef = storage.ref();
  const fileRef = storageRef.child(filename);
  return fileRef.getDownloadURL();
};

export const getImage = async (filename, retornarImagemPadrao = true) => {
  try {
    return await getFileUrl(filename);
  } catch (ex) {
    return retornarImagemPadrao ? getImageNotFoundUrl() : false;
  }
};

export const getImageNotFoundUrl = () =>
  `${window.location.origin}/images/not-found.png`;

export const getLogoBancoUrl = filename =>
  `https://storage.googleapis.com/creditoexpress-icones/bancos/${filename}`;

export const getAudio = async filename => {
  try {
    return getFileUrl(filename);
  } catch (ex) {
    return false;
  }
};

export const getPdf = async filename => {
  try {
    return await getFileUrl(filename);
  } catch (ex) {}
};
