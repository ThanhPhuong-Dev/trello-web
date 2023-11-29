import { experimental_extendTheme as extendTheme } from '@mui/material/styles';
import { deepOrange, teal } from '@mui/material/colors';

// Create a theme instance.
const theme = extendTheme({
  trello: {
    appBarHeight: '60px',
    boardBarHeight: '58px',
  },

  colorSchemes: {
    light: {
      palette: {
        primary: teal,
        secondary: deepOrange,
      },
    },

    dark: {
      palette: {
        primary: teal,
        secondary: deepOrange,
      },
    },
  },
  // ...other properties
});

export default theme;
