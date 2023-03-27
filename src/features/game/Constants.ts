export const ItemTypes = {
    PIECE: 'piece',
};

export const pieces = {
    pawn: { black: '♟︎', white: '♙' },
    knight: { black: '♞', white: '♘' },
    bishop: { black: '♝', white: '♗' },
    rook: { black: '♜', white: '♖' },
    queen: { black: '♛', white: '♕' },
    king: { black: '♚', white: '♔' }
};

export const mainRanks = [
    'rook',
    'knight',
    'bishop',
    'queen',
    'king',
    'bishop',
    'knight',
    'rook',
];
