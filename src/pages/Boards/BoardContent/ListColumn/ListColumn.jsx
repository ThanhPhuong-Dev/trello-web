import { Box, Button } from '@mui/material';
import Column from './Column/Column';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
function ListColumn({ columns }) {
  return (
    <Box
      sx={{
        bgColor: 'inherit',
        width: '100%',
        height: '100%',
        display: 'flex',
        overflowX: 'auto',
        overflowY: 'hidden'
      }}
    >
      {columns.map((column) => (
        <Column key={column?._id} column={column}></Column>
      ))}

      <Box
        sx={{
          minWidth: '200px',
          maxWidth: '200px',
          height: 'fit-content',
          bgcolor: '#ffffff3d',
          mx: 2,
          borderRadius: '10px'
        }}
      >
        <Button sx={{ color: 'white', width: '100%', py: 1 }} startIcon={<NoteAddIcon></NoteAddIcon>}>
          Add New Column
        </Button>
      </Box>
    </Box>
  );
}

export default ListColumn;
