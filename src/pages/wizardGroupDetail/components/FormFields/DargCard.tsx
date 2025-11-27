import type { Identifier, XYCoord } from 'dnd-core'
import type { FC, PropsWithChildren } from 'react'
import { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'

export const ItemTypes = {
  CARD: 'card',
}

type CardProps = {
  index: number;
  className?: string;
  moveCard: (
    dragIndex: number,
    hoverIndex: number
  ) => void;
}

type DragItem = {
  index: number;
  type: string;
}

type CollectedProps = {
  handlerId: Identifier | null;
}

const DargCard: FC<PropsWithChildren<CardProps>> = (props) => {
  const { index, moveCard } = props;
  const ref = useRef<HTMLDivElement>(null)

  const [{ handlerId }, drop] = useDrop<DragItem, void, CollectedProps>({
    accept: ItemTypes.CARD,
    collect: (m) => ({ handlerId: m.getHandlerId() }),
    hover(item: DragItem, monitor) {
      const ele = ref.current!;
      const dragIndex = item.index
      const hoverIndex = index

      if (dragIndex === hoverIndex) return;

      const clientOffset = monitor.getClientOffset();
      const hoverBoundingRect = ele.getBoundingClientRect();

      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      const didDrop = monitor.didDrop()

      if (!didDrop) {
        moveCard(dragIndex, hoverIndex)
        item.index = hoverIndex
      }
    },
  })

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: () => ({ index }),
    collect: (monitor) => ({ isDragging: monitor.isDragging() })
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={props.className}
      data-handler-id={handlerId}
      style={{ opacity: isDragging ? 0 : 1 }}
    >
      {props.children}
    </div>
  );
}

export default DargCard;
