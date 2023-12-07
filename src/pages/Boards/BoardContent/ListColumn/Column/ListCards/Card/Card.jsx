import { Typography, Button } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import GroupIcon from '@mui/icons-material/Group';
import CommentIcon from '@mui/icons-material/Comment';
import AttachmentIcon from '@mui/icons-material/Attachment';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function Cards({ card }) {
  //kéo thả card
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: card?._id,
    data: { ...card }
  });

  const dndKitColumnsStyle = {
    touchAction: 'none',
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? '0.5' : undefined
  };

  ///show khi có action
  const showCardActions = () => {
    return !!card?.memberIds.length || !!card?.comments?.length || !!card?.attachments?.length;
  };
  return (
    <Card
      ref={setNodeRef}
      style={dndKitColumnsStyle}
      {...attributes}
      {...listeners}
      sx={{ cursor: 'pointer', boxShadow: '0 1px 1px rgba(0,0,0,0.2)' }}
    >
      {card?.cover && <CardMedia sx={{ height: 140 }} image={card?.cover} title={card.title} />}

      <CardContent sx={{ p: 1.5 }}>
        <Typography sx={{ fontWeight: 'bold' }}>{card?.title}</Typography>
      </CardContent>
      {showCardActions() && (
        <CardActions sx={{ p: '0px 4px 8px 4px' }}>
          {!!card?.memberIds.length && (
            <Button size="small" startIcon={<GroupIcon></GroupIcon>}>
              {card?.memberIds.length}
            </Button>
          )}
          {!!card?.comments?.length && (
            <Button size="small" startIcon={<CommentIcon></CommentIcon>}>
              {card?.comments?.length}
            </Button>
          )}
          {!!card?.attachments?.length && (
            <Button size="small" startIcon={<AttachmentIcon></AttachmentIcon>}>
              {card?.attachments?.length}
            </Button>
          )}
        </CardActions>
      )}
    </Card>
  );
}

export default Cards;
