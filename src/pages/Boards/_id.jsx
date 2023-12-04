import { Container } from '@mui/material';
import AppBar from '../../components/AppBar';
import BoardBar from './BoardBar/boardBar';
import BoardContent from './BoardContent/boardContent';
import { mockData } from '~/apis/mock-data';
function BoardId() {
  return (
    <Container disableGutters maxWidth="false" sx={{ height: '100vh' }}>
      <AppBar></AppBar>
      <BoardBar board={mockData?.board}></BoardBar>
      <BoardContent board={mockData?.board}></BoardContent>
    </Container>
  );
}

export default BoardId;
