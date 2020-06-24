import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  // #1
  palette: {
    secondary: {
      light: '#ff8a50',
      main: '#ff5722',
      dark: '#c41c00',
      contrastText: '#000000'
    }
  }
});
