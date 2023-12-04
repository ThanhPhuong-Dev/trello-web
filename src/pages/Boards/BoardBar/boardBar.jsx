import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import AvatarGroup from '@mui/material/AvatarGroup';
import DashboardIcon from '@mui/icons-material/Dashboard';
import VpnLockIcon from '@mui/icons-material/VpnLock';
import AddToDriveIcon from '@mui/icons-material/AddToDrive';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import FilterListIcon from '@mui/icons-material/FilterList';
import { Tooltip } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { capitalizeFirstLetter } from '~/capitalizeFirstLetter';
function BoardBar({ board }) {
  return (
    <Box
      px={2}
      sx={{
        width: '100%',
        height: (theme) => theme.trello.boardBarHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        overflowX: 'auto',

        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#0288d1')
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          '& .MuiChip-root': {
            color: 'white',
            fontSize: '14px',
            border: 'none',
            paddingX: '5px',

            '& .MuiSvgIcon-root': {
              color: 'white'
            },

            '&:hover': {
              bgcolor: 'primary.50'
            }
          }
        }}
      >
        <Chip icon={<DashboardIcon></DashboardIcon>} label={board?.title} clickable />
        <Chip icon={<VpnLockIcon></VpnLockIcon>} label={capitalizeFirstLetter(board?.type)} clickable />
        <Chip icon={<AddToDriveIcon></AddToDriveIcon>} label="Add To Google Drive" clickable />
        <Chip icon={<FlashOnIcon></FlashOnIcon>} label="Automation" clickable />
        <Chip icon={<FilterListIcon></FilterListIcon>} label="Filters" clickable />
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button
          startIcon={<PersonAddIcon></PersonAddIcon>}
          sx={{ color: 'white', border: '1px solid white' }}
          variant="outlined"
        >
          Invite
        </Button>
        <AvatarGroup
          max={7}
          sx={{
            // gap: '10px',
            '& .MuiAvatar-root': {
              width: '34px',
              height: '34px',
              fontSize: 16,
              color: 'white',
              cursor: 'pointer',

              '&:first-of-type': { bgcolor: '#bdc3c7' }
            }
          }}
        >
          <Tooltip title="ThanhPhuongDev">
            <Avatar
              alt="Remy Sharp"
              src="https://scontent.fdad1-4.fna.fbcdn.net/v/t1.6435-9/31064309_258390688037005_2079259999468519424_n.jpg?stp=dst-jpg_s851x315&_nc_cat=103&ccb=1-7&_nc_sid=c21ed2&_nc_ohc=P_9CrPk5gYMAX-PtugC&_nc_ht=scontent.fdad1-4.fna&oh=00_AfDrLSG9HIMMEoTDIsS0EaReBlXDt8EBlIgAu_S1cyx0Xg&oe=658FE750"
            />
          </Tooltip>
          <Tooltip title="ThanhPhuongDev">
            <Avatar
              alt="Remy Sharp"
              src="https://scontent.fdad1-4.fna.fbcdn.net/v/t1.6435-9/31064309_258390688037005_2079259999468519424_n.jpg?stp=dst-jpg_s851x315&_nc_cat=103&ccb=1-7&_nc_sid=c21ed2&_nc_ohc=P_9CrPk5gYMAX-PtugC&_nc_ht=scontent.fdad1-4.fna&oh=00_AfDrLSG9HIMMEoTDIsS0EaReBlXDt8EBlIgAu_S1cyx0Xg&oe=658FE750"
            />
          </Tooltip>
          <Tooltip title="ThanhPhuongDev">
            <Avatar
              alt="Remy Sharp"
              src="https://scontent.fdad1-4.fna.fbcdn.net/v/t1.6435-9/31064309_258390688037005_2079259999468519424_n.jpg?stp=dst-jpg_s851x315&_nc_cat=103&ccb=1-7&_nc_sid=c21ed2&_nc_ohc=P_9CrPk5gYMAX-PtugC&_nc_ht=scontent.fdad1-4.fna&oh=00_AfDrLSG9HIMMEoTDIsS0EaReBlXDt8EBlIgAu_S1cyx0Xg&oe=658FE750"
            />
          </Tooltip>
          <Tooltip title="ThanhPhuongDev">
            <Avatar
              alt="Remy Sharp"
              src="https://scontent.fdad1-4.fna.fbcdn.net/v/t1.6435-9/31064309_258390688037005_2079259999468519424_n.jpg?stp=dst-jpg_s851x315&_nc_cat=103&ccb=1-7&_nc_sid=c21ed2&_nc_ohc=P_9CrPk5gYMAX-PtugC&_nc_ht=scontent.fdad1-4.fna&oh=00_AfDrLSG9HIMMEoTDIsS0EaReBlXDt8EBlIgAu_S1cyx0Xg&oe=658FE750"
            />
          </Tooltip>
          <Tooltip title="ThanhPhuongDev">
            <Avatar
              alt="Remy Sharp"
              src="https://scontent.fdad1-4.fna.fbcdn.net/v/t1.6435-9/31064309_258390688037005_2079259999468519424_n.jpg?stp=dst-jpg_s851x315&_nc_cat=103&ccb=1-7&_nc_sid=c21ed2&_nc_ohc=P_9CrPk5gYMAX-PtugC&_nc_ht=scontent.fdad1-4.fna&oh=00_AfDrLSG9HIMMEoTDIsS0EaReBlXDt8EBlIgAu_S1cyx0Xg&oe=658FE750"
            />
          </Tooltip>
          <Tooltip title="ThanhPhuongDev">
            <Avatar
              alt="Remy Sharp"
              src="https://scontent.fdad1-4.fna.fbcdn.net/v/t1.6435-9/31064309_258390688037005_2079259999468519424_n.jpg?stp=dst-jpg_s851x315&_nc_cat=103&ccb=1-7&_nc_sid=c21ed2&_nc_ohc=P_9CrPk5gYMAX-PtugC&_nc_ht=scontent.fdad1-4.fna&oh=00_AfDrLSG9HIMMEoTDIsS0EaReBlXDt8EBlIgAu_S1cyx0Xg&oe=658FE750"
            />
          </Tooltip>
          <Tooltip title="ThanhPhuongDev">
            <Avatar
              alt="Remy Sharp"
              src="https://scontent.fdad1-4.fna.fbcdn.net/v/t1.6435-9/31064309_258390688037005_2079259999468519424_n.jpg?stp=dst-jpg_s851x315&_nc_cat=103&ccb=1-7&_nc_sid=c21ed2&_nc_ohc=P_9CrPk5gYMAX-PtugC&_nc_ht=scontent.fdad1-4.fna&oh=00_AfDrLSG9HIMMEoTDIsS0EaReBlXDt8EBlIgAu_S1cyx0Xg&oe=658FE750"
            />
          </Tooltip>
          <Tooltip title="ThanhPhuongDev">
            <Avatar
              alt="Remy Sharp"
              src="https://scontent.fdad1-4.fna.fbcdn.net/v/t1.6435-9/31064309_258390688037005_2079259999468519424_n.jpg?stp=dst-jpg_s851x315&_nc_cat=103&ccb=1-7&_nc_sid=c21ed2&_nc_ohc=P_9CrPk5gYMAX-PtugC&_nc_ht=scontent.fdad1-4.fna&oh=00_AfDrLSG9HIMMEoTDIsS0EaReBlXDt8EBlIgAu_S1cyx0Xg&oe=658FE750"
            />
          </Tooltip>
          <Tooltip title="ThanhPhuongDev">
            <Avatar
              alt="Remy Sharp"
              src="https://scontent.fdad1-4.fna.fbcdn.net/v/t1.6435-9/31064309_258390688037005_2079259999468519424_n.jpg?stp=dst-jpg_s851x315&_nc_cat=103&ccb=1-7&_nc_sid=c21ed2&_nc_ohc=P_9CrPk5gYMAX-PtugC&_nc_ht=scontent.fdad1-4.fna&oh=00_AfDrLSG9HIMMEoTDIsS0EaReBlXDt8EBlIgAu_S1cyx0Xg&oe=658FE750"
            />
          </Tooltip>
          <Tooltip title="ThanhPhuongDev">
            <Avatar
              alt="Remy Sharp"
              src="https://scontent.fdad1-4.fna.fbcdn.net/v/t1.6435-9/31064309_258390688037005_2079259999468519424_n.jpg?stp=dst-jpg_s851x315&_nc_cat=103&ccb=1-7&_nc_sid=c21ed2&_nc_ohc=P_9CrPk5gYMAX-PtugC&_nc_ht=scontent.fdad1-4.fna&oh=00_AfDrLSG9HIMMEoTDIsS0EaReBlXDt8EBlIgAu_S1cyx0Xg&oe=658FE750"
            />
          </Tooltip>
          <Tooltip title="ThanhPhuongDev">
            <Avatar
              alt="Remy Sharp"
              src="https://scontent.fdad1-4.fna.fbcdn.net/v/t1.6435-9/31064309_258390688037005_2079259999468519424_n.jpg?stp=dst-jpg_s851x315&_nc_cat=103&ccb=1-7&_nc_sid=c21ed2&_nc_ohc=P_9CrPk5gYMAX-PtugC&_nc_ht=scontent.fdad1-4.fna&oh=00_AfDrLSG9HIMMEoTDIsS0EaReBlXDt8EBlIgAu_S1cyx0Xg&oe=658FE750"
            />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  );
}

export default BoardBar;
