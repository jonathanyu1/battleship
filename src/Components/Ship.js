import React, {useState,useEffect} from 'react';

const Ship = (props) => {

    const {shipSize, player, id} = props;
    const [shipUnits, setShipUnits] = useState([]);
    const [coords, setCoords] = useState({});
    const [rotate, setRotate] = useState(false);
    const [sunk, setSunk] = useState(false);

    const generateShipUnits = () =>{
        let tempShipUnits=[];
        for (let i=1;i<=shipSize;i++){
            tempShipUnits.push(<div className='shipUnit' data-unit={i}></div>);
        }
        setShipUnits(tempShipUnits);
    }

    const handleClick = (e) =>{
        // rotate 
        console.log(e);
        console.log(e.target);
        if (!rotate && player==='human'){
            e.target.parentNode.style.transform='rotate(90deg)';
        } else {
            e.target.parentNode.style.transform='';
        }
        setRotate(!rotate);
    }

    const drag = (e) => {
        let shipUnitIndex=0;
        if (rotate){
            // horizontal
            let section = e.target.getBoundingClientRect().width/shipSize;
            let posX = (e.clientX - e.target.getBoundingClientRect().left)/section;
            shipUnitIndex = Math.ceil(posX);
            console.log(shipUnitIndex);
        } else{
            // vertical
            let section = e.target.getBoundingClientRect().height/shipSize;
            let posY = (e.clientY - e.target.getBoundingClientRect().top)/section;
            shipUnitIndex = Math.ceil(posY);
            console.log(shipUnitIndex);
        }
        // if rotate true then horizontal, false then vertical
        const orientation = (rotate ? 'horizontal': 'vertical');
        const shipData = {
            shipSize,
            orientation,
            shipUnitIndex,
            id
        }
        e.dataTransfer.setData('shipData',JSON.stringify(shipData));
    }
    
    useEffect(()=>{
        console.log(shipSize);
        console.log(player);
        generateShipUnits();
    },[]);

    return (
        <div 
            // className={`ship ${props.isSunk}`}
            className={`ship ${sunk ? 'sunk':''}`}
            // draggable='true'
            draggable={props.draggable}
            onClick={(e)=>handleClick(e)}
            onDragStart={(e)=>drag(e)}
            id={id}
        >
            {shipUnits}
        </div>
    )
}

export default Ship;