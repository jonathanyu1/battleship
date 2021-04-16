import React, {useState,useEffect} from 'react';
import GameBoard from './GameBoard';

const GameController = () => {
    const [boardSize, setBoardSize] = useState(10);
    const [shipSizeArray, setShipSizeArray] = useState([5,4,3,3,2]);
    const [shipOnBoard, setShipOnBoard] = useState([]);
    const [gameStart, setGameStart] = useState(false);

    const addShipOnBoard = (id) => {
        setShipOnBoard(prevShipOnBoard=>{
            return [...prevShipOnBoard,id];
        });
    }

    const handleStart = () => {
        setGameStart(true);
    }

    useEffect(()=>{
        console.log(shipOnBoard);
        console.log('shipOnBoard length: ' + shipOnBoard.length);
    },[shipOnBoard]);

    return (
        <div id='gameContainer'>
            <GameBoard 
                boardSize={boardSize}
                player='human'
                shipSizeArray={shipSizeArray}
                addShipOnBoard={addShipOnBoard}
                shipOnBoard={shipOnBoard}
                gameStart={gameStart}
            />
            <button
                className='btnStartGame'
                onClick={handleStart}
                disabled={(shipOnBoard.length===shipSizeArray.length && !gameStart) ? false:true}
            >
                Start Game
            </button>
            <GameBoard 
                boardSize={boardSize}
                player='computer'
                shipSizeArray={shipSizeArray}
                addShipOnBoard={addShipOnBoard}
                shipOnBoard={shipOnBoard}
                gameStart={gameStart}
            />
        </div>
    )
}

export default GameController;