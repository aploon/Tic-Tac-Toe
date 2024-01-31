import {useState} from 'react'
import './App.css'

function App() {

  const [squares, setSquares] = useState(new Array(9).fill(null))

  const [nextPlayer, setNextPlayer] = useState('X')

  const [history, setHistory] = useState([])

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

  const winner = calculateWinner(squares)
  let status
  let stop = false
  if (winner) {
    status = 'Winner: ' + winner
    stop = true
  } else {
    status = 'Next player: ' + nextPlayer
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
            <button className="square" onClick={() => squareClick(0)}>{squares[0]}</button>
            <button className="square" onClick={() => squareClick(1)}>{squares[1]}</button>
            <button className="square" onClick={() => squareClick(2)}>{squares[2]}</button>
            <br />
            <button className="square" onClick={() => squareClick(3)}>{squares[3]}</button>
            <button className="square" onClick={() => squareClick(4)}>{squares[4]}</button>
            <button className="square" onClick={() => squareClick(5)}>{squares[5]}</button>
            <br />
            <button className="square" onClick={() => squareClick(6)}>{squares[6]}</button>
            <button className="square" onClick={() => squareClick(7)}>{squares[7]}</button>
            <button className="square" onClick={() => squareClick(8)}>{squares[8]}</button>

          </div>
        </div>
        <div className='col'>
          <ul>
            <li><a href="#" onClick={() => jumpToMove(-1)}>Go to game start</a></li>
            {history.map((item, i) => {
              // if (i === 0) return null
              return <li key={item.index}>
                <a href="#" className='event-link' onClick={() => jumpToMove(i)}>Go to move #{i + 1}</a>
              </li>
            })}
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
