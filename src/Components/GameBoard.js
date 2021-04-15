import React, {useState,useEffect} from 'react';
import uniqid from 'uniqid';
import GameBoardTile from './GameBoardTile';
import Ship from './Ship';

const GameBoard = (props) => {

    const {boardSize, player, shipSizeArray} = props;
    const [boardArray, setBoardArray] = useState([]);
    const [shipList, setShipList] = useState([]);
    const [shipCoordsArray, setShipCoordsArray] = useState([]);
    const [shipOnBoard, setShipOnBoard] = useState([]);

    const generateShips = () => {
        let tempShipList = [];
        tempShipList = shipSizeArray.map((shipSize)=>{
            let id = uniqid();
            return (<Ship 
                        shipSize={shipSize}
                        player={player}
                        key={uniqid()}
                        id={id}
                        // draggable='true'
                        draggable={(shipOnBoard.indexOf(id)===-1 ? 'true':'false')}
                    />)
        });
        setShipList(tempShipList);
    }

    const placeShip = (data, coords) => {
        let coordsArray = [];
        let shipCoords = {};
        let valid = true;
        let result = '';
        const orientation = data.orientation;
        const index = data.shipUnitIndex;
        const size = data.shipSize;
        const id = data.id;

        if (shipOnBoard.indexOf(id)!==-1){
            // already on board
            return;
        }
        // check if valid destination (too up, down, left, right) (if another ship occupies space)
        if (orientation==='vertical'){
            for (let i=1;i<=size;i++){
                let coordX = Number(coords.x);
                let coordY = Number(coords.y)-(index-i);
                console.log('x: '+coordX+' y: '+coordY);
                shipCoords = {x: coordX, y: coordY, ship: id, hit: false};
                coordsArray.push(shipCoords);
            }
            
        } else {
            for (let i=1;i<=size;i++){
                let coordX = Number(coords.x)-(index-i);
                let coordY = Number(coords.y)
                console.log('x: '+coordX+' y: '+coordY);
                shipCoords = {x: coordX, y: coordY, ship: id, hit: false};
                coordsArray.push(shipCoords);
            }
        }
        console.log(coordsArray);
        coordsArray.forEach((coord)=>{
            // still need to check if board array already contains tile with ship, or if board contains same ship
            if (coord.x <0 || coord.x > 9 || coord.y < 0 || coord.y > 9){
                valid=false;
            };
            console.log(coord);
            console.log(shipCoordsArray);
            for (let i=0;i<shipCoordsArray.length;i++){
                result = shipCoordsArray[i].filter(shipCoord=>{
                    return shipCoord.x === coord.x && shipCoord.y === coord.y;
                });
                if (result.length>0){
                    valid=false;
                    return;
                }
            }
        });
        console.log(valid);
        if (valid) {
            // setShipCoordsArray([...shipCoordsArray, coordsArray]);
            setShipCoordsArray(prevShipCoordsArray => {
                return [...prevShipCoordsArray, coordsArray];
            }); 
            setShipOnBoard(prevShipOnBoard=>{
                return [...prevShipOnBoard,id];
            });
        }
        
    }

    const drop = (e) =>{
        console.log(e.target);
        let coords = {x:e.target.getAttribute('data-coord-x'),y:e.target.getAttribute('data-coord-y')};
        console.log(coords);
        e.preventDefault();
        let data = JSON.parse(e.dataTransfer.getData('shipData'));
        console.log(data);
        placeShip(data, coords);
    }

    const dragOver = (e) => {
        e.preventDefault();
    }

    const shipTileStatus = (coord) => {
        let result = '';
        for (let i=0;i<shipCoordsArray.length;i++){
            result = shipCoordsArray[i].filter(shipCoord=>{
                return shipCoord.x === coord.j && shipCoord.y === coord.i;
            }); 
            if (result.length>0){return result;}
        }
        return result;

        // this does not work as result gets replaced since cannot break out of loop

        // shipCoordsArray.forEach((shipCoords)=>{
        //     console.log(shipCoords);
        //     result = shipCoords.filter(shipCoord=>{
        //         return shipCoord.x === coord.j && shipCoord.y === coord.i;
        //     }); 
        // });
    }

    const generateBoard = () => {
        let tempBoard = [];
        for (let i=0;i<boardSize;i++){
            for (let j=0;j<boardSize;j++){
                tempBoard.push(
                    <GameBoardTile 
                        key={uniqid()}
                        coord={{x:j,y:i}}
                        player={player}
                        onDragOver={(e)=>dragOver(e)}
                        onDrop={(e)=>drop(e)}
                        shipTileStatus={shipTileStatus({j,i})}
                        // need hasShip and hit property
                    />
                )
            }
        }
        setBoardArray(tempBoard);
    }


    useEffect(()=>{
        // update boardArray
        console.log(shipCoordsArray);
        generateBoard();
    },[shipCoordsArray]);

    useEffect(()=>{
        // initialize board
        generateBoard();
        generateShips();
    },[]);

    useEffect(()=>{
        console.log(shipOnBoard);
    },[shipOnBoard])

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