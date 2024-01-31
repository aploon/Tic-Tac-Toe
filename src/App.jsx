import {useState} from 'react'
import Square from './components/Square.jsx'
import './App.css'

function App() {

  const [squares, setSquares] = useState(new Array(9).fill(null))

  const [nextPlayer, setNextPlayer] = useState('X')

  const [history, setHistory] = useState([])

  const winner = calculateWinner(squares)

  let stop = false
  let status = ''

  if (winner) {
    status = 'Winner: ' + winner
    stop = true
  } else {
    status = 'Next player: ' + nextPlayer
  }

  const squareClick = (i) => {
    // avoid click again
    if (squares[i] !== null || stop) return

    // handle click
    let newSquares = [...squares];
    newSquares[i] = nextPlayer;
    setSquares(newSquares);

    // Add an history
    setHistory([...history, {index: i, Player: nextPlayer}]);

    // Change next player
    setNextPlayer(nextPlayer === 'X' ? 'O' : 'X');
  }

  const jumpToMove = (move) => {

    let newHistory = history.splice(0, move + 1);
    setHistory(newHistory);

    let newSquares = new Array(9).fill(null);
    newHistory.forEach((item) => {
      newSquares[item.index] = item.Player;
    })
    setSquares(newSquares);

    setNextPlayer(newHistory[newHistory.length - 1].Player === 'X' ? 'O' : 'X');

    stop = false;
  }

  return (
    <>
      {/* Jeu Tic.Tac.Toe */}
      <div className="container">
        <div className='col'>
          <div className="next-player">
            {status}
          </div>
          <div className="game-tab">
            <Square value={squares[0]} onSquareClick={() => squareClick(0)}></Square>
            <Square value={squares[1]} onSquareClick={() => squareClick(1)}></Square>
            <Square value={squares[2]} onSquareClick={() => squareClick(2)}></Square>
            <br />
            <Square value={squares[3]} onSquareClick={() => squareClick(3)}></Square>
            <Square value={squares[4]} onSquareClick={() => squareClick(4)}></Square>
            <Square value={squares[5]} onSquareClick={() => squareClick(5)}></Square>
            <br />
            <Square value={squares[6]} onSquareClick={() => squareClick(6)}></Square>
            <Square value={squares[7]} onSquareClick={() => squareClick(7)}></Square>
            <Square value={squares[8]} onSquareClick={() => squareClick(8)}></Square>
          </div>
        </div>
        <div className='col'>
          <ul>
            <li><a href="#" onClick={() => jumpToMove(-1)}>Go to game start</a></li>
            {history.map((item, i) => 
              <li key={item.index}>
                <a href="#" className='event-link' onClick={() => jumpToMove(i)}>Go to move #{i + 1}</a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  )
}

function calculateWinner(squares) {
 const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  for(let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null
}

export default App
