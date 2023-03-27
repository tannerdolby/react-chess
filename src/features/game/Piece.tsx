import React from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes, pieces } from './Constants';
import { PieceProps } from './Types';
import { calc } from './Util';
import { saveMoveInfo } from './game-slice';
import { useAppDispatch } from '../../app/hooks';

export default function Piece({ name, black, pieceSize, pos, firstMove }: PieceProps) {
    const dispatch = useAppDispatch();
    const piece = pieces[name] || null;

    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.PIECE,
        collect: monitor => ({
            isDragging: Boolean(monitor.isDragging()),
        }),
    }));

    return (
        <div
            onDragStart={() => {
                dispatch(saveMoveInfo({ piece: name, black: black, firstMove: firstMove }));
            }}
            ref={drag}
            style={{
                '--size': `${pieceSize || 7}`,
                fontSize: calc('--size'),
                opacity: isDragging ? 0.5 : 1,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                width: '100%',
                border: 'none',
                transform: 'translate(0, 0)'
            }}
        >
            {black ? piece.black : piece.white}
        </div>
    )
}
