import SelectMode from '~/components/SelectMode/selectMode';
import Box from '@mui/material/Box';
import AppsIcon from '@mui/icons-material/Apps';
import { ReactComponent as TrelloIcon } from '~/asstes/trello.svg';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Badge from '@mui/material/Badge';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { SvgIcon, Tooltip, Typography } from '@mui/material';
import WorkSpaces from './Menus/WorkSpaces';
import Recent from './Menus/Recent';
import Starred from './Menus/Starred';
import Templates from './Menus/Templates';
import Avatars from './Menus/Avatar';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
function AppBar() {
  const [search, setSearch] = useState('');
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
        overflowX: 'auto',
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#2c3e50' : '#01579b')
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, color: 'white' }}>
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
          <Button
            sx={{
              color: 'white',
              border: 'none',
              '&:hover': {
                border: 'none'
              }
            }}
            startIcon={<AddCircleOutlineIcon></AddCircleOutlineIcon>}
            variant="outlined"
          >
            Create
          </Button>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <TextField
          size="small"
          id="outlined-search"
          label="Search"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            minWidth: 120,
            maxWidth: 170,
            color: 'white',
            '& label': { color: 'white' },
            '& input': { color: 'white' },
            '& label.Mui-focused': { color: 'white' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: 'white' },
              '&:hover fieldset': { borderColor: 'white' },
              '&.Mui-focused fieldset': { borderColor: 'white' }
            }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'white' }}></SearchIcon>
              </InputAdornment>
            ),

            endAdornment: (
              <CloseIcon
                onClick={() => setSearch('')}
                fontSize="small"
                sx={{ color: search ? 'white' : 'transparent', cursor: 'pointer' }}
              ></CloseIcon>
            )
          }}
        />
        <SelectMode></SelectMode>

        <Tooltip title="Notification">
          <Badge color="error" variant="dot" sx={{ cursor: 'pointer' }}>
            <NotificationsNoneIcon sx={{ color: 'white' }}></NotificationsNoneIcon>
          </Badge>
        </Tooltip>

        <Tooltip title="Question">
          <Badge variant="dot" sx={{ cursor: 'pointer' }}>
            <HelpOutlineIcon sx={{ color: 'white' }}></HelpOutlineIcon>
          </Badge>
        </Tooltip>

        <Avatars></Avatars>
      </Box>
    </Box>
  );
}

export default AppBar;
