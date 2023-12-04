import { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ContentCut from '@mui/icons-material/ContentCut';
import ContentCopy from '@mui/icons-material/ContentCopy';
import ContentPaste from '@mui/icons-material/ContentPaste';
import ArchiveIcon from '@mui/icons-material/Archive';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddCardIcon from '@mui/icons-material/AddCard';
import DragHandleIcon from '@mui/icons-material/DragHandle';

import { Typography, Box, Tooltip, Button } from '@mui/material';
import ListCards from './ListCards/ListCards';

function Column({ column }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box
      sx={{
        minWidth: '300px',
        maxWidth: '300px',
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#333643' : '#ebecf0'),
        borderRadius: '10px',
        ml: 2,
        height: 'fit-content',
        maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`
      }}
    >
      {/*Header column*/}
      <Box
        sx={{
          height: (theme) => theme.trello.columnHeaderHeight,
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Typography sx={{ fontWeight: 'bold' }}>{column?.title}</Typography>
        <Box>
          <Tooltip title="DropDown">
            <ExpandMoreIcon
              sx={{ color: 'text.primary', cursor: 'pointer', mt: 1 }}
              id="basic-button-dropdown"
              aria-controls={open ? 'basic-menu-dropdown' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            ></ExpandMoreIcon>
          </Tooltip>
          <Menu
            id="basic-menu-dropdown"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button-dropdown'
            }}
          >
            <MenuItem>
              <ListItemIcon>
                <AddCardIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Add New Card</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <ContentCut fontSize="small" />
              </ListItemIcon>
              <ListItemText>Cut</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <ContentCopy fontSize="small" />
              </ListItemIcon>
              <ListItemText>Copy</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <ContentPaste fontSize="small" />
              </ListItemIcon>
              <ListItemText>Paste</ListItemText>
            </MenuItem>
            <Divider />
            <MenuItem>
              <ListItemIcon>
                <DeleteForeverIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Remove This Column</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <ArchiveIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Archive This Column</ListItemText>
            </MenuItem>
          </Menu>
        </Box>
      </Box>

      {/* List Card */}
      <ListCards cards={column?.cards}></ListCards>

      {/* Footer Column */}
      <Box
        sx={{
          p: 2,
          height: (theme) => theme.trello.columnFooterHeight,
          display: ' flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Button startIcon={<AddCardIcon></AddCardIcon>}>Add Card</Button>
        <Tooltip>
          <DragHandleIcon sx={{ cursor: 'pointer' }}></DragHandleIcon>
        </Tooltip>
      </Box>
    </Box>
  );
}

export default Column;
