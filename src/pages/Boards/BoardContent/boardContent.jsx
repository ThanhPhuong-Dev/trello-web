import Box from '@mui/material/Box';
import ListColumn from './ListColumn/ListColumn';
import { mapOrder } from '~/utils/sort';
import {
  DndContext,
  useSensor,
  PointerSensor,
  useSensors,
  MouseSensor,
  TouchSensor,
  DragOverlay,
  defaultDropAnimationSideEffects
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { useEffect, useState } from 'react';
import Column from './ListColumn/Column/Column';
import Cards from './ListColumn/Column/ListCards/Card/Card';

const ACTIVE_DARG_ITEM_TYPE = {
  columns: 'ACTIVE_DARG_ITEM_TYPE_COLUMNS',
  card: 'ACTIVE_DARG_ITEM_TYPE_CARD'
};

function BoardContent({ board }) {
  const [orderedColumns, setOrderedColumns] = useState([]);
  const [activeDragItemId, setActiveDragItemId] = useState(null);
  const [activeDragType, setActiveDragType] = useState(null);
  const [activeDragData, setActiveDragData] = useState(null);
  // const pointerSensor = useSensor(PointerSensor, {
  //   activationConstraint: {
  //     distance: 10
  //   }
  // });
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10
    }
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250,
      tolerance: 5
    }
  });
  const sensor = useSensors(mouseSensor, touchSensor);

  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board.columnOrderIds, '_id'));
  }, [board]);

  //handle darg drog
  const handleDragStart = (event) => {
    setActiveDragItemId(event?.active?.id);
    setActiveDragType(
      event?.active?.data?.current?.columnId ? ACTIVE_DARG_ITEM_TYPE.card : ACTIVE_DARG_ITEM_TYPE.columns
    );
    setActiveDragData(event?.active?.data?.current);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    //kiểm tra xem nó kéo thả ra không
    if (!over) return;

    //kéo thả ra khỏi vị trí ban đầu
    if (active.id !== over.id) {
      const oldIndex = orderedColumns.findIndex((c) => c._id === active.id);
      const newIndex = orderedColumns.findIndex((c) => c._id === over.id);

      setOrderedColumns(arrayMove(orderedColumns, oldIndex, newIndex));
    }
  };

  //animation không giật
  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.5'
        }
      }
    })
  };

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} sensors={sensor}>
      <Box
        sx={{
          height: (theme) => theme.trello.boardContentHeight,
          backgroundColor: 'primary.main',
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#0288d1'),
          p: '10px 0'
        }}
      >
        <ListColumn columns={orderedColumns}></ListColumn>
        <DragOverlay dropAnimation={dropAnimation}>
          {!activeDragType && null}
          {activeDragType === ACTIVE_DARG_ITEM_TYPE.columns && <Column column={activeDragData}></Column>}
          {activeDragType === ACTIVE_DARG_ITEM_TYPE.card && <Cards card={activeDragData}></Cards>}
        </DragOverlay>
      </Box>
    </DndContext>
  );
}

export default BoardContent;
