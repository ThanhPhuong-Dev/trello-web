import Box from '@mui/material/Box';

function BoardContent() {
  return (
    <Box
      sx={{
        height: (theme) => `calc( 100vh - ${theme.trello.appBarHeight} - ${theme.trello.boardBarHeight})`,
        backgroundColor: 'primary.main',
        display: 'flex',
        alignItems: 'center',
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#0288d1')
      }}
    >
      Content
    </Box>
  );
}

export default BoardContent;
