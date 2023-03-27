import React from 'react';
import renderSquare from './render-square';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useAppSelector } from '../../app/hooks';
import { SquareInfo } from './Types';

export default function Board() {
    const squares = useAppSelector((state) => state.game.grid);

    return (
        <DndProvider backend={HTML5Backend}>
            <div style={{
                width: '100%',
                maxWidth: '600px',
                minWidth: '300px',
                height: '100%',
                display: 'flex',
                flexWrap: 'wrap',
                margin: '0 auto'
            }}>
                {squares.map((posInfo: SquareInfo, i: number) => {
                    return renderSquare(i, posInfo.piece, posInfo.black, posInfo.pos);
                })}
            </div>
        </DndProvider>
    )
}