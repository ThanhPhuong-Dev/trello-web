import Box from '@mui/material/Box';

function BoardContent() {
  return (
    <Box
      sx={{
        height: (theme) => `calc( 100vh - ${theme.trello.appBarHeight} - ${theme.trello.boardBarHeight})`,
        backgroundColor: 'primary.main',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      Content
    </Box>
  );
}

export default BoardContent;
