import { mainRanks } from './Constants';
import { SquareInfo } from './Types';

export function calc(variable: string, scaler: string | undefined) {
    return `calc(var(${variable}) * ${scaler || '1vmin'})`;
};

export function cartesianToIdx(x: number, y: number) {
    return 8 * y + x;
};

export function initializeBoard(): Array<SquareInfo> {
    const squares: Array<SquareInfo> = [];

    for (let i = 0; i < 64; i++) {
        if (i < 8) {
            squares.push({
                pos: [i % 8, 0],
                piece: mainRanks[i],
                black: true,
                prettyName: `black_${mainRanks[i]}_${i < 5 ? 1 : 2}`
            })
        } else if (i > 7 && i < 16) {
            squares.push({
                pos: [i % 8, 1],
                piece: 'pawn',
                black: true,
                prettyName: `black_pawn_${i % 8}`,
                firstMove: true,
            });
        } else if (i > 15 && i < 48) {
            squares.push({
                pos: [i % 8, Math.floor(i / 8)],
                piece: '',
                black: null,
                prettyName: '',
            });
        } else if (i > 47 && i < 56) {
            squares.push({
                pos: [i % 8, Math.floor(i / 8)],
                piece: 'pawn',
                black: false,
                prettyName: `white_pawn_${i % 8}`,
                firstMove: true,
            });
        } else {
            squares.push({
                pos: [i % 8, Math.floor(i / 8)],
                piece: mainRanks[i % 8],
                black: false,
                prettyName: `white_${mainRanks[i % 8]}_${i < 61 ? 1 : 2}`,
            });
        }
    }

    return squares;
}

function isSameColorPieceInPath(fromColorIsBlack: boolean | null, squareInPathIsBlack: boolean) {
    return (
        fromColorIsBlack && squareInPathIsBlack ||
        !fromColorIsBlack && squareInPathIsBlack == false
    );
}

export function canMovePiece(piece: string, from: Array<number>, to: Array<number>, fromColorIsBlack: boolean | null, toColorIsBlack: boolean | null, squares) {
    const [fromX, fromY] = from;
    const [toX, toY] = to;
    const dx = toX - fromX;
    const dy = toY - fromY;

    // console.log('PIECE', piece);
    // console.log('FROM:', from);
    // console.log('TO:', to);
    // console.log(cartesianToIdx(fromX, fromY), cartesianToIdx(toX, toY))
    // console.log(dx, dy)

    // can't land on pieces of same type
    if (fromColorIsBlack === toColorIsBlack) {
        return false;
    }

    // pawn first move can be two squares
    if (
        piece === 'pawn' &&
        squares[cartesianToIdx(fromX, fromY)]?.firstMove &&
        Math.abs(dx) == 0 &&
        Math.abs(dy) <= 2
    ) {
        return true;
    }

    // check vertical paths
    if (dx == 0 && (piece === 'rook' || piece === 'queen')) {
        let startY = fromY > toY ? fromY - 1 : fromY + 1
        for (let y = startY; y != toY; y > toY ? y-- : y++) {
            const idx = cartesianToIdx(fromX, y);
            if (isSameColorPieceInPath(fromColorIsBlack, squares[idx]?.black)) {
                return false;
            }
        }
    }

    // check horizontal paths
    if ((dx != 0 && dy == 0) && (piece === 'rook' || piece === 'queen')) {
        let startX = fromX > toX ? fromX - 1 : fromX + 1;
        for (let x = startX; x != toX; x > toX ? x-- : x++) {
            const idx = cartesianToIdx(x, fromY);
            if (isSameColorPieceInPath(fromColorIsBlack, squares[idx]?.black)) {
                return false;
            }
        }
    }

    // check diagonal paths
    if ((dx != 0 && dy != 0) && (piece === 'bishop' || piece === 'queen')) {
        let startX = fromX > toX ? fromX - 1 : fromX + 1;
        let startY = fromY > toY ? fromY - 1 : fromY + 1;
        for (let x = startX, y = startY; x != toX && y != toY; x > toX ? x-- : x++ , y > toY ? y-- : y++) {
            const idx = cartesianToIdx(x, y);
            if (isSameColorPieceInPath(fromColorIsBlack, squares[idx]?.black)) {
                return false;
            }
        }
    }

    return canMoveHelper(piece, dx, dy, fromColorIsBlack, toColorIsBlack);
}

// TODO: remove some duplication for movement checks
function canMoveHelper(piece: string, dx: number, dy: number, fromColorIsBlack: boolean | null, toColorIsBlack: boolean | null) {
    switch (piece) {
        case 'rook':
            return (
                Math.abs(dx) === 0 && Math.abs(dy) >= 0 ||
                Math.abs(dx) >= 0 && Math.abs(dy) === 0
            );
        case 'knight':
            return (
                Math.abs(dx) === 2 && Math.abs(dy) === 1 ||
                Math.abs(dx) === 1 && Math.abs(dy) === 2
            );
        case 'bishop':
            return (Math.abs(dx) - Math.abs(dy)) === 0;
        case 'queen':
            return (
                (Math.abs(dx) - Math.abs(dy)) === 0 ||
                Math.abs(dx) >= 0 && Math.abs(dy) === 0 ||
                Math.abs(dx) === 0 && Math.abs(dy) >= 0
            )
        case 'king':
            // TODO
            // 1. when pieces are around the king its
            // movement will be checked, as it can't take if
            // capturing puts it in check

            // 2. castling! (rook is part of this logic) :)

            return (
                Math.abs(dy) === 1 && Math.abs(dx) === 0 ||
                Math.abs(dy) === 0 && Math.abs(dx) === 1 ||
                Math.abs(dx) - Math.abs(dy) === 0 &&
                Math.abs(dx) === 1 || Math.abs(dy) === 1
            );
        case 'pawn':
            // TODO
            // 1. en passant (if a white pawn uses its first move to jump forward
            // two squares to center squares (e4, etc), then an adjacent
            // attacking black pawn can "pass" by going to the square behind
            // the white pawn (e3, etc), this results in a capture for black

            if (
                fromColorIsBlack && toColorIsBlack === false ||
                fromColorIsBlack === false && toColorIsBlack
            ) {
                return Math.abs(dx) - Math.abs(dy) === 0
            }

            return (
                dy === 1 && fromColorIsBlack && Math.abs(dx) === 0 ||
                dy === -1 && !fromColorIsBlack && Math.abs(dx) === 0
            );
    }
}
