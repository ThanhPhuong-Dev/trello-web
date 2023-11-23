import { experimental_extendTheme as extendTheme } from '@mui/material/styles';
import { deepOrange, red, teal } from '@mui/material/colors';

// Create a theme instance.
const theme = extendTheme({
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
