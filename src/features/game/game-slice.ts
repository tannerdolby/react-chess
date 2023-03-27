import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { cartesianToIdx, canMovePiece, initializeBoard } from './Util';
import { GameState } from './Types';

const initialState: GameState = {
    grid: initializeBoard(),
    currentMove: {
        pos: {
            from: [],
            to: [],
            fromIdx: 0,
            toIdx: 0,
        },
        canMove: false,
        piece: '',
        black: null,
        prettyName: '',
        firstMove: true,
    },
    moves: 0,
};

export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        incrementMove(state: GameState) {
            state.moves++;
        },

        movePiece(state: GameState, action: PayloadAction<Array<number>>) {
            const { piece, black } = state.currentMove;
            const [toX, toY] = action.payload;
            const [fromX, fromY] = state.currentMove.pos.from;
            const fromPosToIdx = cartesianToIdx(fromX, fromY);
            const destToIdx = cartesianToIdx(toX, toY);

            state.currentMove.pos.fromIdx = fromPosToIdx;
            state.currentMove.pos.toIdx = destToIdx;
            state.currentMove.prettyName = state.grid[fromPosToIdx].prettyName;

            const isValidMove = canMovePiece(
                piece,
                [fromX, fromY],
                [toX, toY],
                state.grid[fromPosToIdx].black,
                state.grid[destToIdx].black,
                state.grid
            );

            if (isValidMove) {
                state.currentMove.canMove = true;
                state.moves++;

                state.grid[fromPosToIdx] = {
                    pos: [],
                    piece: '',
                    black: null,
                    prettyName: "",
                }

                state.grid[destToIdx] = {
                    pos: [toX, toY],
                    piece: piece,
                    black: black,
                    prettyName: state.currentMove.prettyName
                }
            } else {
                state.currentMove.canMove = false;
            }
        },

        saveMoveFromPosition(state: GameState, action: PayloadAction) {
            state.currentMove.pos.from = action.payload;
        },

        saveMoveToPosition(state: GameState, action: PayloadAction) {
            state.currentMove.pos.to = action.payload;
        },

        saveMoveInfo(state: GameState, action: PayloadAction) {
            state.currentMove.piece = action.payload.piece;
            state.currentMove.black = action.payload.black;
            state.currentMove.firstMove = action.payload.firstMove;
        },

        // TODOs
        // #1
        // increment player captured collection
        // e.g. player 1 takes knight on e4
        // so knight should be added to their captured pieces

        // #2
        // keep track of move history
    }
});

export const {
    movePiece,
    incrementMove,
    saveMoveFromPosition,
    saveMoveToPosition,
    saveMoveInfo,
} = gameSlice.actions;
export default gameSlice.reducer;
