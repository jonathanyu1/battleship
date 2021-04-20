import React, {useState,useEffect} from 'react';

const GameBoardTile = (props) => {

    const {gameStart, player, coord} = props;
    const [tileStatus, setTileStatus] = useState('empty');
   
    const handleClick = () => {
        console.log(player);
        console.log(coord);
        if (gameStart && player==='computer'){
            console.log('attack');
            props.receiveAttack(coord);
        }
    }

    const updateTileStatus = () => {
        // checks if ship exists on this tile (From shipCoordsArray)
        if (props.shipTileStatus[0]){
            if (props.shipTileStatus[0].miss){
                setTileStatus('miss');
            } else {
                setTileStatus((props.shipTileStatus[0].hit ? 'shipHit':'hasShip'));
            }
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