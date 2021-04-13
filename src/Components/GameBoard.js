import React, {useState,useEffect} from 'react';
import GameBoardTile from './GameBoardTile';
import Ship from './Ship';

const GameBoard = (props) => {

    const {boardSize, player, shipSizeArray} = props;
    const [boardArray, setBoardArray] = useState([]);
    const [shipList, setShipList] = useState([]);

    const generateShips = () => {
        let tempShipList = [];
        tempShipList = shipSizeArray.map((shipSize)=>{
            return (<Ship 
                        shipSize={shipSize}
                        player={player}
                    />)
        });
        setShipList(tempShipList);
    }

    const generateBoard = () => {
        let tempBoard = [];
        for (let i=0;i<boardSize;i++){
            for (let j=0;j<boardSize;j++){
                tempBoard.push(
                    <GameBoardTile 
                        key={`${player} ${j}, ${i}`}
                        coord={{x:j,y:i}}
                        player={player}
                    />
                )
            }
        }
        setBoardArray(tempBoard);
    }

    useEffect(()=>{
        // initialize board, randomly place ships
        generateBoard();
        generateShips();
    },[]);

    return (
        <div className='gameBoardWrapper'>
            <div className='gameBoardContainer'>
                {boardArray}
            </div>
            <div className='shipContainer'>
                {shipList}
            </div>
        </div>
    )
}

export default GameBoard;