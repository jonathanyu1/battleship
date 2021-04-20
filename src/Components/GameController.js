import React, {useState,useEffect} from 'react';
import GameBoard from './GameBoard';

const GameController = () => {
    const [boardSize, setBoardSize] = useState(10);
    const [shipSizeArray, setShipSizeArray] = useState([5,4,3,3,2]);
    const [shipOnBoard, setShipOnBoard] = useState([]);
    const [shipCoordsArray, setShipCoordsArray] = useState([]);
    const [compShipOnBoard, setCompShipOnBoard] = useState([]);
    const [compShipCoordsArray, setCompShipCoordsArray] = useState([]);
    const [boardAttackCoords, setBoardAttackCoords] = useState([]);
    const [compBoardAttackCoords, setCompBoardAttackCoords] = useState([]);
    const [gameStart, setGameStart] = useState(false);

    // check win here

    const addBoardAttackCoords = (player, coord) => {
        if (player==='human'){
            setBoardAttackCoords(prevBoardAttackCoords=>{
                return [...prevBoardAttackCoords, coord];
            });
        } else {
            setCompBoardAttackCoords(prevCompBoardAttackCoords=>{
                return [...prevCompBoardAttackCoords, coord];
            });
        }
    }

    const updateShipCoordsArray = (player, coordsArray) => {
        if (player==='human'){
            setShipCoordsArray(coordsArray);
        } else {
            setCompShipCoordsArray(coordsArray);
        }
    }

    const addShipCoordsArray = (player,coordsArray) => {
        if (player==='human'){
            setShipCoordsArray(prevShipCoordsArray => {
                return [...prevShipCoordsArray, coordsArray];
            }); 
        } else {
            setCompShipCoordsArray(prevCompShipCoordsArray => {
                return [...prevCompShipCoordsArray, coordsArray];
            }); 
        }

    }

    const addShipOnBoard = (player,id) => {
        console.log(player);
        if (player==='human'){
            setShipOnBoard(prevShipOnBoard=>{
                return [...prevShipOnBoard,id];
            });
        } else {
            setCompShipOnBoard(prevShipOnBoard=>{
                return [...prevShipOnBoard,id];
            });
        }
    }

    const handleStart = () => {
        setGameStart(true);
    }

    useEffect(()=>{
        console.log(shipOnBoard);
        console.log('shipOnBoard length: ' + shipOnBoard.length);
    },[shipOnBoard]);

    useEffect(()=>{
        console.log('comp ship on board: ');
        console.log(compShipOnBoard);
    },[compShipOnBoard]);

    useEffect(()=>{
        console.log(shipCoordsArray);
    },[shipCoordsArray]);

    return (
        <div id='gameContainer'>
            <GameBoard 
                boardSize={boardSize}
                player='human'
                shipSizeArray={shipSizeArray}
                addShipOnBoard={addShipOnBoard}
                shipOnBoard={shipOnBoard}
                gameStart={gameStart}
                addShipCoordsArray={addShipCoordsArray}
                shipCoordsArray={shipCoordsArray}
                boardAttackCoords={boardAttackCoords}
                addBoardAttackCoords={addBoardAttackCoords}
                updateShipCoordsArray={updateShipCoordsArray}
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
                shipOnBoard={compShipOnBoard}
                gameStart={gameStart}
                addShipCoordsArray={addShipCoordsArray}
                shipCoordsArray={compShipCoordsArray}
                boardAttackCoords={compBoardAttackCoords}
                addBoardAttackCoords={addBoardAttackCoords}
                updateShipCoordsArray={updateShipCoordsArray}
            />
        </div>
    )
}

export default GameController;