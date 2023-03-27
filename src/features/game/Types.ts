export type Positions = {
    [key: string]: Array<number>;
};

export type PieceProps = {
    name: string;
    black: boolean | null;
    pos: Array<number>;
    pieceSize?: number;
    firstMove?: boolean;
};

export type SquareInfo = {
    pos: Array<number>;
    piece: string,
    black: boolean | null,
    prettyName: string,
    firstMove?: boolean,
};

export interface GameState {
    grid: Array<SquareInfo>;
    currentMove: {
        pos: {
            from: Array<number>;
            to: Array<number>;
            fromIdx: number;
            toIdx: number;
        },
        canMove: boolean;
        piece: string;
        black: boolean | null;
        firstMove: boolean;
        prettyName: string;
    },
    moves: number;
};
