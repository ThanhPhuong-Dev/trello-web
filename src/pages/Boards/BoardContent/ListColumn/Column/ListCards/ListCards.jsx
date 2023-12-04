import { Box } from '@mui/material';
import Cards from './Card/Card';

function ListCards() {
  return (
    <Box
      sx={{
        p: '0 5px',
        m: '0 5px',
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        overflowX: 'hidden',
        overflowY: 'auto',
        maxHeight: (theme) =>
          `calc( ${theme.trello.boardContentHeight} - ${theme.spacing(5)} - ${theme.trello.columnHeaderHeight} - ${
            theme.trello.columnFooterHeight
          })`,
        '& .MuiPaper-root': {
          overflow: 'unset'
        },
        '::-webkit-scrollbar-thumb': {
          backgroundColor: '#ced0da'
        },
        '::-webkit-scrollbar-thumb:hover': {
          backgroundColor: '#bfc2cf'
        }
      }}
    >
      <Cards></Cards>
      <Cards></Cards>
    </Box>
  );
}

export default ListCards;
