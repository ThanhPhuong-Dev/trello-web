import { Typography, Button } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import GroupIcon from '@mui/icons-material/Group';
import CommentIcon from '@mui/icons-material/Comment';
import AttachmentIcon from '@mui/icons-material/Attachment';
function Cards() {
  return (
    <Card sx={{ cursor: 'pointer', boxShadow: '0 1px 1px rgba(0,0,0,0.2)' }}>
      <CardMedia
        sx={{ height: 140 }}
        image="https://i.pinimg.com/originals/8b/2d/fa/8b2dfa166a9a93243c1c8eb699450e80.jpg"
        title="green iguana"
      />
      <CardContent sx={{ p: 1.5 }}>
        <Typography sx={{ fontWeight: 'bold' }}>ThanhPhuongDev</Typography>
      </CardContent>
      <CardActions sx={{ p: '0px 4px 8px 4px' }}>
        <Button size="small" startIcon={<GroupIcon></GroupIcon>}>
          20
        </Button>
        <Button size="small" startIcon={<CommentIcon></CommentIcon>}>
          15
        </Button>
        <Button size="small" startIcon={<AttachmentIcon></AttachmentIcon>}>
          10
        </Button>
      </CardActions>
    </Card>
  );
}

export default Cards;
