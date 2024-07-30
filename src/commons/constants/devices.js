const size = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '425px',
  mobile: '425px',
  tablet: '768px',
  desktop: '1024px',
  desktopM: '1440px',
  desktopL: '2560px',
};

export default {
  // mobileS: `(max-width: ${size.mobileS})`,
  // mobileM: `(max-width: ${size.mobileM})`,
  // mobileL: `(max-width: ${size.mobileL})`,
  mobile: `(min-width: ${size.mobileS}) and (max-width: ${size.tablet})`,
  tablet: `(min-width: ${size.tablet}) and (max-width: ${size.desktop})`,
  desktop: `(min-width: ${size.desktop})`,
  // desktopM: `(max-width: ${size.desktopM})`,
  // desktopL: `(max-width: ${size.desktopL})`
};
