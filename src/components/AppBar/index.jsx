import SelectMode from '~/components/SelectMode/selectMode';
import Box from '@mui/material/Box';
import AppsIcon from '@mui/icons-material/Apps';
import { ReactComponent as TrelloIcon } from '~/asstes/trello.svg';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Badge from '@mui/material/Badge';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

import { SvgIcon, Tooltip, Typography } from '@mui/material';
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
        height: (theme) => theme.trello.appBarHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        overflowX: 'auto'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, color: 'primary.main' }}>
        <AppsIcon></AppsIcon>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <SvgIcon component={TrelloIcon} inheritViewBox fontSize="small" />
          <Typography variant="span" sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
            Trello
          </Typography>
        </Box>
        <Box sx={{ display: { sx: 'none', md: 'flex' } }}>
          <WorkSpaces></WorkSpaces>
          <Recent></Recent>
          <Starred></Starred>
          <Templates></Templates>
          <Button variant="outlined">Create</Button>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <TextField size="small" id="outlined-search" label="Search field" type="search" sx={{ minWidth: 120 }} />
        <SelectMode></SelectMode>

        <Tooltip title="Notification">
          <Badge color="secondary" variant="dot" sx={{ cursor: 'pointer' }}>
            <NotificationsNoneIcon sx={{ color: 'primary.main' }}></NotificationsNoneIcon>
          </Badge>
        </Tooltip>

        <Tooltip title="Question">
          <Badge color="secondary" variant="dot" sx={{ cursor: 'pointer' }}>
            <HelpOutlineIcon sx={{ color: 'primary.main' }}></HelpOutlineIcon>
          </Badge>
        </Tooltip>

        <Avatars></Avatars>
      </Box>
    </Box>
  );
}

export default AppBar;
