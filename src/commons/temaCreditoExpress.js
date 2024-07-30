import { createMuiTheme } from '@material-ui/core/styles';

const temaCreditoExpress = createMuiTheme({
  palette: {
    primary: {
      light: '#00f769',
      main: '#00d867',
      dark: '#009c4e',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff9956',
      main: '#fa7934',
      dark: '#d09229',
      contrastText: '#fff',
    },
  },
  typography: {
    useNextVariants: true,
    fontFamily: 'FlexoSoft',
  },
});

export default temaCreditoExpress;
