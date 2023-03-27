import React from 'react'
import reactLogo from './assets/react.svg'
import Board from './features/game/Board';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { incrementMove } from './features/game/game-slice';
import './App.css'

function App() {
  const moves = useAppSelector((state) => state.game.moves);
  const dispatch = useAppDispatch();

  const handleMoveUpdate = () => {
    dispatch(incrementMove());
  }

  return (
    <div className="App">
      {/* <h1>^__^</h1> */}
      <Board />
      <div className="card">
        <button onClick={handleMoveUpdate}>
          moves: {moves}
        </button>
      </div>
    </div>
  )
}

export default App
