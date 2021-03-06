import React, {useState,useEffect} from 'react';

const GameBoardTile = (props) => {

    const {gameStart, player, coord, winner} = props;
    const [tileStatus, setTileStatus] = useState('empty');
   
    const handleClick = () => {
        if (gameStart && player==='computer' && !winner){
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
            onClick={(winner?null:handleClick)}
            onDragOver={props.onDragOver}
            onDrop={props.onDrop}
            data-coord-x={props.coord.x}
            data-coord-y={props.coord.y}
        >
        </div>
    )
}

export default GameBoardTile;