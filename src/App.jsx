import { useColorScheme } from '@mui/material/styles';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';
import { Box, Container } from '@mui/material';

function SelectMode() {
  const { mode, setMode } = useColorScheme();

  const handleChange = (event) => {
    setMode(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="label-dark-light-mode">Mode</InputLabel>
      <Select
        labelId="select-dark-light-mode"
        id="select-dark-light-mode"
        value={mode}
        label="Mode"
        onChange={handleChange}
      >
        <MenuItem value="light">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <LightModeIcon></LightModeIcon>
            Light
          </div>
        </MenuItem>
        <MenuItem value="dark">
          <DarkModeOutlinedIcon></DarkModeOutlinedIcon>
          Dark
        </MenuItem>
        <MenuItem value="system">
          <SettingsBrightnessIcon></SettingsBrightnessIcon>
          System
        </MenuItem>
      </Select>
    </FormControl>
  );
}

function App() {
  return (
    <Container disableGutters maxWidth="false" sx={{ height: '100vh' }}>
      <Box
        sx={{
          width: '100%',
          height: (theme) => theme.trello.appBarHeight,
          backgroundColor: 'primary.light',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <SelectMode></SelectMode>
      </Box>
      <Box
        sx={{
          width: '100%',
          height: (theme) => theme.trello.boardBarHeight,
          backgroundColor: 'primary.dark',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        Board Bar
      </Box>
      <Box
        sx={{
          height: (theme) => `calc( 100vh - ${theme.trello.appBarHeight} - ${theme.trello.boardBarHeight})`,
          backgroundColor: 'primary.main',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        Content
      </Box>
    </Container>
  );
}

export default App;
