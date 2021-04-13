import React, {useState,useEffect} from 'react';
import GameBoard from './GameBoard';

const GameController = () => {
    const [boardSize, setBoardSize] = useState(10);
    const [shipSizeArray, setShipSizeArray] = useState([5,4,3,3,2]);

    return (
        <div id='gameContainer'>
            <GameBoard 
                boardSize={boardSize}
                player='human'
                shipSizeArray={shipSizeArray}
            />
            <GameBoard 
                boardSize={boardSize}
                player='computer'
                shipSizeArray={shipSizeArray}
            />
        </div>
    )
}

export default GameController;