import React, {useState,useEffect} from 'react';

const GameBoardTile = (props) => {
   
    const handleClick = () => {
        console.log(props.player);
        console.log(props.coord);
    }

    // useEffect(()=>{
    //     console.log(props.coord);
    // },[]);

    return (
        <div 
            className='gameBoardTile' 
            onClick={handleClick}
            onDragOver={props.onDragOver}
            onDrop={props.onDrop}
            data-coord-x={props.coord.x}
            data-coord-y={props.coord.y}
        >
        </div>
    )
}

export default GameBoardTile;