import { configureStore } from '@reduxjs/toolkit';
import gameReducer from '../features/game/game-slice';

// takes a reducer and makes a store
// and automatically sets up the store
// with default options

export const store = configureStore({
    reducer: {
        game: gameReducer,
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
