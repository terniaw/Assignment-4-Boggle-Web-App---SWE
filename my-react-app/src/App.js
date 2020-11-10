import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Game from './components/mycomponents';
import Button from '@material-ui/core/Button';
import Board from './Board.js';
import RandomGrid from './random_grid.js'
import { Container } from '@material-ui/core';
import GuessInput from './GuessInput.js';
import { findAllSolutions } from './boggle_solver.js';
import data from './full-wordlist.json';
import foundSolutions from './FoundSolutions.js';
import FoundSolutions from './FoundSolutions.js';




const grid = RandomGrid();
const solutions = findAllSolutions(grid, data.words)





function App() {
  console.log("solutions", solutions);


  const [start, setStart] = useState(false);
  const [wasStarted, setWasStarted] = useState(false);
  const [found, setfound] = useState([]);
  const [missing, setMissing] = useState([...solutions]);
  console.log("missing", missing);





  function handleClick() {
    setStart(true);
    setWasStarted(true);
  }

  if (start == false && wasStarted == false) {
    return (




      <Button variant="contained" color= '#ffcc66' onClick={() => handleClick()} >
        Start Boggle Game
      </Button >



    );
  } else if (start == true) {
    return (


      <div className="App">
        <header className="App-header">






          <Board board={grid} />
          <GuessInput allSolutions={solutions} foundSolutions={found} correctAnswerCallback={setfound} remainder={missing} setRemainder={setMissing} />
          <Button variant="contained" color= "lightsalmon"  onClick={() => setStart(false)} >End the Game</Button >

          <FoundSolutions words={found} headerText={"Words Found"} />
        </header>
      </div >
    );
  }

  else if (start == false && wasStarted == true) {
    return (
      <div>
        <h4>
          Words that were Missed
        </h4>
        <ul>
          {missing.map((solution) => { return <li>{solution}</li> })}
        </ul>
      </div>
    );
  };
}

export default App;
