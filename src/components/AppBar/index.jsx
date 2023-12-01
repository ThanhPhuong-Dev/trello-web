import SelectMode from '~/components/SelectMode/selectMode';
import Box from '@mui/material/Box';
import AppsIcon from '@mui/icons-material/Apps';
import { ReactComponent as TrelloIcon } from '~/asstes/trello.svg';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Badge from '@mui/material/Badge';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

import { SvgIcon, Typography } from '@mui/material';
import WorkSpaces from './Menus/WorkSpaces';
import Recent from './Menus/Recent';
import Starred from './Menus/Starred';
import Templates from './Menus/Templates';
import Avatars from './Menus/Avatar';

function AppBar() {
  return (
    <Box
      px={2}
      sx={{
        width: '100%',
        color: 'primary.main',
        height: (theme) => theme.trello.appBarHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <AppsIcon></AppsIcon>
        <Box sx={{ display: 'flex', alignItem: 'center', gap: 0.5 }}>
          <SvgIcon component={TrelloIcon} inheritViewBox />
          <Typography variant="span" sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
            Trello
          </Typography>
        </Box>
        <WorkSpaces></WorkSpaces>
        <Recent></Recent>
        <Starred></Starred>
        <Templates></Templates>
        <Button variant="outlined">Create</Button>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <TextField size="small" id="outlined-search" label="Search field" type="search" />
        <Badge color="secondary" variant="dot" sx={{ cursor: 'pointer' }}>
          <NotificationsNoneIcon></NotificationsNoneIcon>
        </Badge>
        <Badge color="secondary" variant="dot" sx={{ cursor: 'pointer' }}>
          <HelpOutlineIcon></HelpOutlineIcon>
        </Badge>
        <SelectMode></SelectMode>
        <Avatars></Avatars>
      </Box>
    </Box>
  );
}

export default AppBar;
