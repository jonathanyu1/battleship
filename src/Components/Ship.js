import React, {useState,useEffect} from 'react';

const Ship = (props) => {

    const {shipSize, player} = props;
    const [shipUnits, setShipUnits] = useState([]);
    const [coords, setCoords] = useState({});
    const [rotate, setRotate] = useState(false);

    const hit = (coords) => {

    }

    const generateShipUnits = () =>{
        let tempShipUnits=[];
        for (let i=0;i<shipSize;i++){
            tempShipUnits.push(<div className='shipUnit'></div>);
        }
        setShipUnits(tempShipUnits);
    }

    const handleClick = (e) =>{
        // rotate 
        console.log(e);
        console.log(e.target);
        if (!rotate){
            e.target.parentNode.style.transform='rotate(90deg)';
        } else {
            e.target.parentNode.style.transform='';
        }
        setRotate(!rotate);
    }

    const drag = (e) => {
        console.log(e);
        // if rotate true then horizontal, false then vertical
        const orientation = (rotate ? 'horizontal': 'vertical');
        const shipData = {
            shipSize,
            orientation
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
            className='ship'
            draggable='true'
            onClick={(e)=>handleClick(e)}
            onDragStart={(e)=>drag(e)}
        >
            {shipUnits}
        </div>
    )
}

export default Ship;