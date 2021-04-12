import React, {useState,useEffect} from 'react';

const GameBoardTile = (props) => {
   
    const handleClick = () => {
        console.log(props.coord);
    }

    // useEffect(()=>{
    //     console.log(props.coord);
    // },[]);

    return (
        <div className='gameBoardTile' onClick={handleClick}>
        </div>
    )
}

export default GameBoardTile;