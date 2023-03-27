import Piece from './Piece';
import BoardSquare from './BoardSquare';
import React from 'react';
import { calc } from './Util';

export default function renderSquare(i: number, pieceName: string, black: boolean | null, pos: Array<number>) {
    if (!pos) pos = [];
    const x = i % 8;
    const y = Math.floor(i / 8);
    const isOccupied = (pos[0] === x && pos[1] === y);
    let piece = null;

    if (isOccupied && pieceName) {
        piece = <Piece name={pieceName} black={black} pos={[x, y]} />;
    }

    return (
        <div
            key={`game-square-${i}`}
            style={{
                '--area': '10',
                width: calc('--area'),
                height: calc('--area'),
                border: '0.35px solid lightgray',
            }}>
            <BoardSquare x={x} y={y} pieceName={pieceName} isBlack={black}>
                {piece}
            </BoardSquare>
        </div>
    )
}