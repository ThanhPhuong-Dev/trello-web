import { Box } from '@mui/material';
import Cards from './Card/Card';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
function ListCards({ cards }) {
  return (
    <SortableContext items={cards?.map((c) => c._id)} strategy={verticalListSortingStrategy}>
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
          '& .MuiCardContent-root:last-child ': {
            paddingBottom: '12px'
          },
          '::-webkit-scrollbar-thumb': {
            backgroundColor: '#ced0da'
          },
          '::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#bfc2cf'
          }
        }}
      >
        {cards?.map((card) => (
          <Cards key={card._id} card={card}></Cards>
        ))}
      </Box>
    </SortableContext>
  );
}

export default ListCards;
