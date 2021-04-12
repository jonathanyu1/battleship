import React, {useState,useEffect} from 'react';
import GameBoardTile from './GameBoardTile';

const GameBoard = (props) => {

    const [boardArray, setBoardArray] = useState([]);

    const generateBoard = () => {
        let tempBoard = [];
        for (let i=0;i<props.boardSize;i++){
            for (let j=0;j<props.boardSize;j++){
                console.log('i: '+i);
                console.log('j:'+j);
                tempBoard.push(
                    <GameBoardTile 
                        coord={[i,j]}
                    />
                )
            }
        }
        setBoardArray(tempBoard);
    }

    useEffect(()=>{
        console.log(props.boardSize);
        generateBoard();
    },[]);

    return (
        <div className='gameBoardContainer'>
            {boardArray}
        </div>
    )
}

export default GameBoard;