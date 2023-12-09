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
import { cloneDeep } from 'lodash';
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

  // điều chỉnh rơ của chuột từ moblie đồng bộ với pc
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

  //tìm kiếm columns theo cardid
  const findCoulumByCardId = (cardID) => {
    return orderedColumns.find((columns) => columns?.cards?.map((card) => card._id)?.includes(cardID));
  };

  //handle khi drag
  const handleDragOver = (event) => {
    if (activeDragData === ACTIVE_DARG_ITEM_TYPE.columns) {
      return;
    }

    const { active, over } = event;

    if (!over) return;

    //activeDragCardId là cái card được kéo
    const {
      id: activeDragCardId,
      data: { current: activeDragCardData }
    } = active;

    //overDragId là cái card đang được tương tác đến bởi card active
    const { id: overDragId } = over;
    //tìm 2 cái coulums theo cardId
    const activeColumn = findCoulumByCardId(activeDragCardId);
    const overColumn = findCoulumByCardId(overDragId);

    if (!activeColumn || !overColumn) return;

    //xử lý khi kéo card qua column khác
    if (activeColumn._id !== overColumn._id) {
      setOrderedColumns((prev) => {
        //nơi mà active card sắp được thả
        const overCardIdenx = overColumn?.cards.findIndex((card) => card._id === overDragId);

        //logic tính toán cardIndex mới (trên dưới card OverCard ) lấy chuẩn từ code của thư viện
        let newCardIdex;
        const isBelowOverItem =
          active.rect.current.translated && active.rect.current.translated.top > over.rect.top + over.rect.height;
        const modifier = isBelowOverItem ? 1 : 0;
        newCardIdex = overCardIdenx >= 0 ? overCardIdenx + modifier : overColumn?.cards?.length + 1;

        const nextColumns = cloneDeep(prev);
        const nextActiveColumn = nextColumns.find((columns) => columns._id === activeColumn._id);
        const nextOverColumn = nextColumns.find((columns) => columns._id === overColumn._id);

        //columns cũ
        if (nextActiveColumn) {
          ///xóa card ra khỏi column cũ
          nextActiveColumn.cards = nextActiveColumn.cards.filter((card) => card._id !== activeDragCardId);
          nextActiveColumn.columnOrderIds = nextActiveColumn.cards.map((card) => card._id);
          console.log(nextActiveColumn.columnOrderIds);
        }

        //column mới
        if (nextOverColumn) {
          //kiểm tra xem card đang kéo nó có tồn tại ở overColumn chưa , nếu có thì xóa bỏ nó trước
          nextOverColumn.cards = nextOverColumn.cards.filter((card) => card._id !== activeDragCardId);
          //tiếp theo là thêm cái card đang kéo vào overColumn theo vị trí index mới
          nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIdex, 0, activeDragCardData);
          //cập nhật lại mảng cardOrderIds cho chuẩn dữ liệu
          nextOverColumn.columnOrderIds = nextOverColumn.cards.map((card) => card._id);
        }

        return nextColumns;
      });
    }
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
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} onDragOver={handleDragOver} sensors={sensor}>
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
