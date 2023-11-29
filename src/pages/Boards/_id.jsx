import { Container } from '@mui/material';
import AppBar from '../../components/AppBar';
import BoardBar from './BoardBar/boardBar';
import BoardContent from './BoardContent/boardContent';

function BoardId() {
  return (
    <Container disableGutters maxWidth="false" sx={{ height: '100vh' }}>
      <AppBar></AppBar>
      <BoardBar></BoardBar>
      <BoardContent></BoardContent>
    </Container>
  );
}

export default BoardId;
