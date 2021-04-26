import React from 'react';
import Header from './Components/Header';
import GameController from './Components/GameController';
import './App.css'

const App = () => {
  return (
    <div id="appContainer">
      <Header/>
      <GameController/>
    </div>
  );
}

export default App;
