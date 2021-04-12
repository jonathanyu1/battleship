import React, {useState,useEffect} from 'react';
import GameBoard from './GameBoard';

const GameController = () => {
    const [boardSize, setBoardSize] = useState(10);

    return (
        <div id='gameContainer'>
            <GameBoard boardSize={boardSize}/>
            <GameBoard boardSize={boardSize}/>
        </div>
    )
}

export default GameController;