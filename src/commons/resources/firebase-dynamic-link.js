import Api from './api/firebase-dynamic-link';

const path = '';

const FirebaseDynamicLink = {
  get({ link }) {
    const params = {
      dynamicLinkInfo: {
        domainUriPrefix: process.env.REACT_APP_FIREBASE_DYNAMIC_DOMAIN_PREFIX,
        link,
      },
    };
    return Api.request(path, {
      data: params,
      method: 'POST',
    });
  },
};

export default FirebaseDynamicLink;
