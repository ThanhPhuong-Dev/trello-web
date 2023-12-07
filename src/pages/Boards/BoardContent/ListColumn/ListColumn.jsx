import { Box, Button } from '@mui/material';
import Column from './Column/Column';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
function ListColumn({ columns }) {
  //SortableContext này phải nhận là một mảng [1,2,3] chứ k phải là một mảng [{1},{2},{3}] chứa các object bên trong
  return (
    <SortableContext items={columns?.map((c) => c._id)} strategy={horizontalListSortingStrategy}>
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
        {columns?.map((column) => (
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
    </SortableContext>
  );
}

export default ListColumn;
