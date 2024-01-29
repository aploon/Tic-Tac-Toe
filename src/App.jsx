import {useMemo, useState} from 'react'
import './App.css'

function App() {

  const [nextPlayer, setNextPlayer] = useState('X')

  const squareClick = (e) => {
    // avoid click again
    if (e.target.innerText !== '') return

    // handle click
    setNextPlayer((nextPlayer) => nextPlayer === 'X' ? 'O' : 'X')
    e.target.innerText = nextPlayer

    // set event
    setEvent(
      [
          ...events, 
        {
          id: e.target.id,
          player: nextPlayer
        }
      ]
    )
  }

  const [events, setEvent] = useState([])

  return (
    <>
      {/* Jeu Tic.Tac.Toe */}

      <div className="container">
        <div className='col'>
          <div className="next-player">
            Next player: X  
          </div>
          <div className="game-tab">
            <button id='0' className="square" onClick={squareClick}></button>
            <button id='1' className="square" onClick={squareClick}></button>
            <button id='2' className="square" onClick={squareClick}></button>
            <br />
            <button id='3' className="square" onClick={squareClick}></button>
            <button id='4' className="square" onClick={squareClick}></button>
            <button id='5' className="square" onClick={squareClick}></button>
            <br />
            <button id='6' className="square" onClick={squareClick}></button>
            <button id='7' className="square" onClick={squareClick}></button>
            <button id='8' className="square" onClick={squareClick}></button>

          </div>
        </div>
        <div className='col'>
          <ul>
            <li><a href="#">Go to game start</a></li>
            {
              events.map((event, index) => (
                <li key={event.id}>
                  <a href="#" className="event-link">Go to move #{index + 1}</a>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </>
  )
}

export default App
