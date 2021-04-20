import React, {useState,useEffect} from 'react';

const GameBoardTile = (props) => {

    const [tileStatus, setTileStatus] = useState('empty');
   
    const handleClick = () => {
        console.log(props.player);
        console.log(props.coord);
    }

    const updateTileStatus = () => {
        // console.log(props.shipTileStatus[0]);
        // need to change this to allow miss
        if (props.shipTileStatus[0]){
            setTileStatus((props.shipTileStatus[0].hit ? 'shipHit':'hasShip'));
        }
    }

    useEffect(()=>{
        updateTileStatus();
    },[props.shipTileStatus]);

    return (
        <div 
            className={`gameBoardTile ${tileStatus}`} 
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