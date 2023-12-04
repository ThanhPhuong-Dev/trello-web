import Box from '@mui/material/Box';
import ListColumn from './ListColumn/ListColumn';

function BoardContent() {
  return (
    <Box
      sx={{
        height: (theme) => theme.trello.boardContentHeight,
        backgroundColor: 'primary.main',
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#0288d1'),
        p: '10px 0'
      }}
    >
      <ListColumn></ListColumn>
    </Box>
  );
}

export default BoardContent;
