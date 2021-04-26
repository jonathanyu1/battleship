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
    const [shipSunk, setShipSunk] = useState([]);
    const [compShipSunk, setCompShipSunk] = useState([]);
    const [gameStart, setGameStart] = useState(false);
    const [currPlayerTurn, setCurrPlayerTurn] = useState('human');
    const [status, setStatus] = useState('Place Ships');
    const [gameWin, setGameWin] = useState();
    const [winner, setWinner] = useState();

    useEffect(()=>{
        if (winner){
            newGame();
        }
    },[winner]);

    const newGame = () => {
        setShipOnBoard([]);
        setShipCoordsArray([]);
        setCompShipOnBoard([]);
        setCompShipCoordsArray([]);
        setBoardAttackCoords([]);
        setCompBoardAttackCoords([]);
        setShipSunk([]);
        setCompShipSunk([]);
        setGameStart(false);
        setCurrPlayerTurn('human');
        setWinner();
        // issue on replaying game: ids are gone from ships
    }

    const updateStatus = () => {
        // if (gameStart && winner) {
        //     setStatus(`${winner} wins!`);
        // } else if (gameStart) {
        //     setStatus('Attack!');
        // } else {
        //     setStatus('Place Ships');
        // }
        if (gameStart && winner) {
            setGameWin(`${winner.charAt(0).toUpperCase()+winner.slice(1)} wins!`);
        } else if (gameStart){
            setStatus('Attack!');
            setGameWin();
        } else {
            setStatus('Place Ships');
        }
    }

    const updateTurn = () => {
        (currPlayerTurn === 'human' ? setCurrPlayerTurn('computer') : setCurrPlayerTurn('human'));
    }

    // check win here

    const checkWin = (player) => {
        // player is the person that just got attacked
        if ((player==='human'?shipSunk:compShipSunk).length>=shipSizeArray.length){
            setWinner((player==='human'?'computer':'human'));
        }
    }

    const checkSink = (player, id) => {
        for (let i=0; i<(player==='human'?shipCoordsArray:compShipCoordsArray).length;i++){
            let result = (player==='human'?shipCoordsArray:compShipCoordsArray)[i].filter(shipCoord=>{
                return shipCoord.ship === id;
            });
            if (result.length>0){
                let shipSize = result.length;
                let hitCount = 0;
                result.forEach(coord=>{
                    if (coord.hit===true){hitCount++;};
                });
                if (hitCount===shipSize){
                    (player==='human' ? setShipSunk([...shipSunk,id]) : setCompShipSunk([...compShipSunk,id]));
                }
                return;
            }
        }
    }

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
        updateStatus();
    },[gameStart, winner]);

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
                shipSunk={shipSunk}
                checkSink={checkSink}
                checkWin={checkWin}
                currPlayerTurn={currPlayerTurn}
                updateTurn={updateTurn}
                winner={winner}
            />
            <div id='gameStatusContainer'>
                <div id='gameWinMessage'>{gameWin}</div>
                <div id='statusMessage'>{status}</div>
                <button
                    className='btnStartGame'
                    onClick={handleStart}
                    disabled={(shipOnBoard.length===shipSizeArray.length && !gameStart) ? false:true}
                >
                    Start Game
                </button>
            </div>
            
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
                shipSunk={compShipSunk}
                checkSink={checkSink}
                checkWin={checkWin}
                currPlayerTurn={currPlayerTurn}
                updateTurn={updateTurn}
                winner={winner}
            />
        </div>
    )
}

export default GameController;