import React, {useState,useEffect} from 'react';
import uniqid from 'uniqid';

const Ship = (props) => {

    const {shipSize, player, id} = props;
    const [shipUnits, setShipUnits] = useState([]);
    const [rotate, setRotate] = useState(false);

    const generateShipUnits = () =>{
        let tempShipUnits=[];
        for (let i=1;i<=shipSize;i++){
            tempShipUnits.push(<div className='shipUnit' data-unit={i} key={uniqid()}></div>);
        }
        setShipUnits(tempShipUnits);
    }

    const handleClick = (e) =>{
        // rotate 
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
        } else{
            // vertical
            let section = e.target.getBoundingClientRect().height/shipSize;
            let posY = (e.clientY - e.target.getBoundingClientRect().top)/section;
            shipUnitIndex = Math.ceil(posY);
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
        generateShipUnits();
    },[]);

    return (
        <div 
            // className={`ship ${props.isSunk}`}
            className={`ship ${props.isSunk ? 'sunk':''}`}
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