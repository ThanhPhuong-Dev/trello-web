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
  defaultDropAnimationSideEffects,
  closestCorners,
  closestCenter,
  pointerWithin,
  rectIntersection,
  getFirstCollision
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { useCallback, useEffect, useRef, useState } from 'react';
import { cloneDeep, isEmpty } from 'lodash';
import Column from './ListColumn/Column/Column';
import Cards from './ListColumn/Column/ListCards/Card/Card';
import { generatePlaceHolderCard } from '~/utils/capitalizeFirstLetter';

const ACTIVE_DARG_ITEM_TYPE = {
  columns: 'ACTIVE_DARG_ITEM_TYPE_COLUMNS',
  card: 'ACTIVE_DARG_ITEM_TYPE_CARD'
};

function BoardContent({ board }) {
  const [orderedColumns, setOrderedColumns] = useState([]);

  const [activeDragItemId, setActiveDragItemId] = useState(null);
  const [activeDragType, setActiveDragType] = useState(null);
  const [activeDragData, setActiveDragData] = useState(null);
  const [oldColumnsDragingCard, setOldColumnsDragingCard] = useState(null);

  const lastOverId = useRef();
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

  // cập nhập lại state khi di chuyển giữa 2 function khác nhau
  const moveCardBetwwenDifferentColumns = (
    overColumn,
    overDragId,
    active,
    over,
    activeColumn,
    activeDragCardId,
    activeDragCardData
  ) => {
    setOrderedColumns((prev) => {
      //nơi mà active card sắp được thả
      
      const overCardIdenx = overColumn?.cards.findIndex((card) => card._id === overDragId);
      console.log(overCardIdenx);
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

        //thêm placeholderCard nếu card là mảng rỗng
        if (isEmpty(nextActiveColumn.cards)) {
          nextActiveColumn.cards = [generatePlaceHolderCard(nextActiveColumn)];
        }

        nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map((card) => card._id);
      }

      //column mới
      if (nextOverColumn) {
        //kiểm tra xem card đang kéo nó có tồn tại ở overColumn chưa , nếu có thì xóa bỏ nó trước
        nextOverColumn.cards = nextOverColumn.cards.filter((card) => card._id !== activeDragCardId);
        //tiếp theo là thêm cái card đang kéo vào overColumn theo vị trí index mới

        const rebuild_activeDragCardData = {
          ...activeDragCardData,
          columnId: nextOverColumn._id
        };

        nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIdex, 0, rebuild_activeDragCardData);

        //nếu có card placeholder thì xóa nó
        nextOverColumn.cards.filter((card) => !card?.FE_placeholderCard);
        //cập nhật lại mảng cardOrderIds cho chuẩn dữ liệu
        nextOverColumn.cardOrderIds = nextOverColumn.cards.map((card) => card._id);
      }
      return nextColumns;
    });
  };

  //handle darg drog
  const handleDragStart = (event) => {
    setActiveDragItemId(event?.active?.id);
    setActiveDragType(
      event?.active?.data?.current?.columnId ? ACTIVE_DARG_ITEM_TYPE.card : ACTIVE_DARG_ITEM_TYPE.columns
    );
    setActiveDragData(event?.active?.data?.current);
    setOldColumnsDragingCard(findCoulumByCardId(event?.active?.id));
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
      moveCardBetwwenDifferentColumns(
        overColumn,
        overDragId,
        active,
        over,
        activeColumn,
        activeDragCardId,
        activeDragCardData
      );
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    //kiểm tra xem nó kéo thả ra không
    if (!over) return;

    if (activeDragType === ACTIVE_DARG_ITEM_TYPE.card) {
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

      if (oldColumnsDragingCard._id !== overColumn._id) {
        moveCardBetwwenDifferentColumns(
          overColumn,
          overDragId,
          active,
          over,
          activeColumn,
          activeDragCardId,
          activeDragCardData
        );
      } else {
        console.log('kéo thả card giữa 1 columns');

        const oldCardIndex = oldColumnsDragingCard.cards.findIndex((c) => c._id === activeDragItemId);
        const newCardIndex = overColumn?.cards.findIndex((c) => c._id === overDragId);

        const dndOreredCards = arrayMove(oldColumnsDragingCard.cards, oldCardIndex, newCardIndex);

        setOrderedColumns((prev) => {
          const nextColumns = cloneDeep(prev);

          //targetColumns
          const targetColumns = nextColumns.find((columns) => columns._id === overColumn._id);
          targetColumns.cards = dndOreredCards;
          targetColumns.cardOrderIds = dndOreredCards.map((cards) => cards._id);
          return nextColumns;
        });
      }
    }

    //drag drop columns
    if (activeDragType === ACTIVE_DARG_ITEM_TYPE.columns) {
      if (active.id !== over.id) {
        const oldColumnsIndex = orderedColumns.findIndex((c) => c._id === active.id);
        const newColumnsIndex = orderedColumns.findIndex((c) => c._id === over.id);
        setOrderedColumns(arrayMove(orderedColumns, oldColumnsIndex, newColumnsIndex));
      }
    }

    //kéo thả ra khỏi vị trí ban đầu

    setActiveDragItemId(null);
    setActiveDragType(null);
    setActiveDragData(null);
    setOldColumnsDragingCard(null);
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

  //hàm fix bug đưa card giữa 2 column khác nhau xảy giật thuật toán va chạm
  const collisionDetectionStrategy = useCallback(
    (args) => {
      if (activeDragType === ACTIVE_DARG_ITEM_TYPE.columns) {
        return closestCorners({ ...args });
      }

      // tìm các điểm giao nhau , va chạm -intersections với con trỏ
      const pointerIntersections = pointerWithin(args);
      if (!pointerIntersections?.length) return;
      //thuật toán va chạm
      const intersections = !!pointerIntersections?.length ? pointerIntersections : rectIntersection(args);

      let overId = getFirstCollision(intersections, 'id');

      if (overId) {
        const checkColumn = orderedColumns.find((column) => column._id === overId);
        if (checkColumn) {
          overId = closestCenter({
            ...args,
            droppableContainers: args.droppableContainers.filter((container) => {
              return container.id != overId && checkColumn?.cardOrderIds?.includes(container.id);
            })
          })[0]?.id;
        }

        lastOverId.current = overId;
        return [{ id: overId }];
      }

      return lastOverId.current ? [{ id: lastOverId.current }] : [];
    },
    [activeDragType, orderedColumns]
  );
  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      //giùm cái closestCorners thì sẽ lỗi bug là kéo card giữa 2 columns nó bug
      // collisionDetection={closestCorners}
      collisionDetection={collisionDetectionStrategy}
      sensors={sensor}
    >
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
