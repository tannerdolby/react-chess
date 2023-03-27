import React from 'react';
import Square from './Square';
import { ItemTypes } from './Constants';
import { useDrop } from 'react-dnd';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { movePiece, saveMoveFromPosition, saveMoveToPosition } from './game-slice';

export default function BoardSquare({ x, y, pieceName, isBlack, children }) {
  const dispatch = useAppDispatch();
  const black = (x + y) % 2 === 1;

  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.PIECE,
    drop: () => {
      dispatch(saveMoveToPosition([x, y]));
      dispatch(movePiece([x, y]));
    },
    collect: monitor => ({
      isOver: Boolean(monitor.isOver()),
    }),
  }), [x, y])
  return (
    <div
      onDragStart={() => {
        dispatch(saveMoveFromPosition([x, y]));
      }}
      ref={drop}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
      }}
    >
      <Square black={black}>{children}</Square>
      {isOver && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            zIndex: 1,
            opacity: 0.5,
            border: 'none',
            backgroundColor: 'yellow',
          }}
        />
      )}
    </div>
  )
}
