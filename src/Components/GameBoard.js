import React, {useState,useEffect} from 'react';
import uniqid from 'uniqid';
import GameBoardTile from './GameBoardTile';
import Ship from './Ship';

const GameBoard = (props) => {

    const {boardSize, player, shipSizeArray, shipOnBoard, gameStart, shipCoordsArray, boardAttackCoords, shipSunk, winner, currPlayerTurn} = props;
    const [boardArray, setBoardArray] = useState([]);
    const [shipList, setShipList] = useState([]);
    // const [shipCoordsArray, setShipCoordsArray] = useState([]);
    // const [shipOnBoard, setShipOnBoard] = useState([]);

    const generateShips = () => {
        let tempShipList = [];
        tempShipList = shipSizeArray.map((shipSize)=>{
            let id = uniqid();
            if (player==='computer'){
                props.addShipOnBoard(player, id);
            }
            return (<Ship 
                        shipSize={shipSize}
                        player={player}
                        key={uniqid()}
                        id={id}
                        draggable={(shipOnBoard.indexOf(id)===-1 && player==='human'? 'true':'false')}
                        isSunk = {isSunk(id)}
                    />)
        });
        setShipList(tempShipList);
    }

    const updateShips = () => {
        let tempShipList = [];
        tempShipList = shipSizeArray.map((shipSize, i)=>{
            return (<Ship
                        shipSize={shipSize}
                        player={player}
                        key={uniqid()}
                        id={shipOnBoard[i]}
                        draggable={(shipOnBoard.indexOf(shipOnBoard[i])===-1 && player==='human'? 'true':'false')}
                        isSunk = {isSunk(shipOnBoard[i])}
                    />)
        });
        setShipList(tempShipList);
    }

    const isSunk = (id) => {
        console.log((shipSunk.indexOf(id)===-1 ? false : true));
        return (shipSunk.indexOf(id)===-1 ? false : true);
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
        if (shipOnBoard.indexOf(id)!==-1 || player==='computer'){
            // already on board or computer
            console.log('already on board ');
            return;
        }
        // check if valid destination (too up, down, left, right) (if another ship occupies space)
        // if (orientation==='vertical'){
        //     for (let i=1;i<=size;i++){
        //         let coordX = Number(coords.x);
        //         let coordY = Number(coords.y)-(index-i);
        //         console.log('x: '+coordX+' y: '+coordY);
        //         shipCoords = {x: coordX, y: coordY, ship: id, hit: false};
        //         coordsArray.push(shipCoords);
        //     }
        // } else {
        //     for (let i=1;i<=size;i++){
        //         let coordX = Number(coords.x)-(index-i);
        //         let coordY = Number(coords.y)
        //         console.log('x: '+coordX+' y: '+coordY);
        //         shipCoords = {x: coordX, y: coordY, ship: id, hit: false};
        //         coordsArray.push(shipCoords);
        //     }
        // }
        for (let i=1;i<=size;i++){
            let coordX = (orientation==='vertical' ? Number(coords.x) : Number(coords.x)-(index-i) );
            let coordY = (orientation==='horizontal' ? Number(coords.y) : Number(coords.y)-(index-i));
            console.log('x: '+coordX+' y: '+coordY);
            shipCoords = {x: coordX, y: coordY, ship: id, hit: false};
            coordsArray.push(shipCoords);
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
            props.addShipCoordsArray(player,coordsArray);
            props.addShipOnBoard(player,id);
        }
    }

    const placeCompShip = (id, size, tempShipCoordsArray) => {
        let coordsArray = [];
        let shipCoords = {};
        let valid = true;
        let result = '';
        let index = (Math.floor(Math.random()*size)+1);
        const orientation = (Math.floor(Math.random()*2) ? 'horizontal' : 'vertical');
        const randX = Math.floor(Math.random()*10);
        const randY = Math.floor(Math.random()*10);
        console.log(shipOnBoard);
        console.log('index: '+index);
        console.log(orientation);
        console.log(id);
        console.log(size);
        // need to randomize coordinates
        for (let i=1;i<=size;i++){
            let coordX = (orientation==='vertical' ? randX : randX-(index-i) );
            let coordY = (orientation==='horizontal' ? randY : randY-(index-i));
            console.log('x: '+coordX+' y: '+coordY);
            shipCoords = {x: coordX, y: coordY, ship: id, hit: false};
            coordsArray.push(shipCoords);
        }
        console.log(coordsArray);
        coordsArray.forEach((coord)=>{
           if (coord.x <0 || coord.x > 9 || coord.y < 0 || coord.y > 9){
               valid=false;
           } 
           // need temporary array
           console.log(tempShipCoordsArray);
           console.log(tempShipCoordsArray.length);
           for (let i=0;i<tempShipCoordsArray.length;i++){

               console.log(tempShipCoordsArray.length);
                result = tempShipCoordsArray[i].filter(shipCoord=>{
                    return shipCoord.x === coord.x && shipCoord.y === coord.y;
                });
                if (result.length>0){
                    console.log('overlap');
                    valid=false;
                    return;
                }
            }
        });
        if (valid) {
            // tempShipCoordsArray = [...tempShipCoordsArray,coordsArray];
            tempShipCoordsArray.push(coordsArray);
            props.addShipCoordsArray(player,coordsArray);
        }
        return valid;
    }

    const placeCompShips = () => {
        let tempShipCoordsArray = [];
        for (let i=0;i<shipOnBoard.length;i++){
            let valid=true;
            do{
                valid=placeCompShip(shipOnBoard[i], shipSizeArray[i], tempShipCoordsArray);
                console.log(valid);
            } while (!valid);
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
        for (let i=0;i<boardAttackCoords.length;i++){;
            result = boardAttackCoords.filter(attackCoord=>{
                return attackCoord.x === coord.j && attackCoord.y === coord.i;
            });
            if (result.length>0){
                result[0].miss=true;
                return result;
            }
        }
        return result;
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
                        gameStart={gameStart}
                        receiveAttack={receiveAttack}
                        winner={winner}
                        // need hasShip and hit property
                    />
                )
            }
        }
        setBoardArray(tempBoard);
    }

    const checkHit = () => {
        // check last added attack coord
        let tempShipCoordsArray=[...shipCoordsArray];
        let attackCoord = boardAttackCoords[boardAttackCoords.length-1];
        for (let i=0; i<tempShipCoordsArray.length;i++){
            let index = tempShipCoordsArray[i].findIndex(
                shipCoord=>shipCoord.x === attackCoord.x && shipCoord.y === attackCoord.y);
            if (index!==-1){
                // if hit, set hit and check if ship is sunk
                tempShipCoordsArray[i][index].hit = true;
                console.log(tempShipCoordsArray[i][index]);
                console.log(tempShipCoordsArray[i][index].ship);
                props.checkSink(player, tempShipCoordsArray[i][index].ship);
            }
        }
        props.updateShipCoordsArray(player, tempShipCoordsArray);
    }

    const receiveAttack = (coord) => {
        // check if already clicked
        let result = '';
        console.log(boardAttackCoords);
        // prevents duplicate clicks
        for (let i=0;i<boardAttackCoords.length;i++){
            result = boardAttackCoords.filter(attackCoord=>{
                return attackCoord.x === coord.x && attackCoord.y === coord.y;
            });
            // return result prevents updating boardAttackCoords and re-rendering
            if (result.length>0){return result;}
        }
        console.log(result);
        // add attack to boardAttackCoords
        props.addBoardAttackCoords(player, coord);
    }

    const computerAttack = () => {
        let result = '';
        do{
            let coordx = Math.floor(Math.random()*10);
            let coordy = Math.floor(Math.random()*10);
            let coord = {x: coordx, y: coordy}
            console.log(coord);
            result = receiveAttack(coord);
        } while (result);
    }

    useEffect(()=>{
        // if board is humans and currPlayerTurn is computer, make computer attack
        console.log('curr turn is: '+currPlayerTurn);
        if (player==='human' && currPlayerTurn==='computer' && !winner && gameStart){
            console.log('computers turn to attack');
            computerAttack();
            // props.updateTurn();
        }
    },[currPlayerTurn]);

    useEffect(()=>{
        console.log(player);
        console.log(shipSunk);
        if (gameStart){
            updateShips();
            props.checkWin(player);
        } else {
            generateShips();
        }
    },[shipSunk]);

    useEffect(()=>{
        if (gameStart){
            console.log(boardAttackCoords);
            // check for hit / miss, check for sink ship,  update board
            checkHit();
            // props.checkWin(player);
            // check for win
            props.updateTurn();
            // call for computer attack, then check for sunk ship, win
        }
    },[boardAttackCoords]);

    useEffect(()=>{
        // update boardArray
        console.log(shipCoordsArray);
        generateBoard();
    },[shipCoordsArray]);

    useEffect(()=>{
        if (gameStart && player==='computer'){
            // place the 5 ships randomly, put into shipCoordsArray
            placeCompShips();
        }
    },[gameStart]);

    useEffect(()=>{
        // initialize board
        console.log(player);
        generateBoard();
        generateShips();
    },[]);

    return (
        <div className='gameBoardWrapper'>
            <div className='gameBoardContainer' id={`${player}GameBoard`}>
                {boardArray}
            </div>
            <div className='shipContainer'>
                {shipList}
            </div>
        </div>
    )
}

export default GameBoard;