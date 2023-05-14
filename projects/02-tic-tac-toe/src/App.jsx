import { useState } from "react"
import confetti from 'canvas-confetti'
import { Square } from "./components/Square"
import { TURNS } from "./constants"
import { checkWinner, checkEndGame } from "./logic/board"
import { WinnerModal } from "./components/WinnerModal"
import { Board } from "./components/Board"
import { saveGameToStorage, resetGameStorage } from "./logic/storage/index"


function App() {
  const [board, setBoard] = useState(()=>{
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) :
    Array(9).fill(null)
  })
  const [turn, setTurn] = useState(()=>{
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  })
  const [winner, setWinner] = useState(null)

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    resetGameStorage()
  }
  
  const updateBoard = (index) => {
    if(board[index] || winner) return
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    // Store to local storage
    saveGameToStorage({
      board: newBoard,
      turn: newTurn
    })
    const newWinner = checkWinner(newBoard)
    if(newWinner){
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
  }
  

  return (
    <main className="board">
      <h1>Tic tac toe</h1>
      <button onClick={resetGame}>Reset game</button>
      <Board board={board} updateBoard={updateBoard} />

      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      <WinnerModal winner={winner} resetGame={resetGame} />
    </main>
  )
}

export default App
