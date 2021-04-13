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
        >
            {shipUnits}
        </div>
    )
}

export default Ship;