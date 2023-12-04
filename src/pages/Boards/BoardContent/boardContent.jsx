import Box from '@mui/material/Box';
import ListColumn from './ListColumn/ListColumn';
import { mapOrder } from '~/utils/sort';
function BoardContent({ board }) {
  const orderedColumns = mapOrder(board?.columns, board.columnOrderIds, '_id');
  return (
    <Box
      sx={{
        height: (theme) => theme.trello.boardContentHeight,
        backgroundColor: 'primary.main',
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#0288d1'),
        p: '10px 0'
      }}
    >
      <ListColumn columns={orderedColumns}></ListColumn>
    </Box>
  );
}

export default BoardContent;
