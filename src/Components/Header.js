import React, {useState,useEffect} from 'react';

const Header = () => {
    return (
        <div id='header'>
            <div id='headerContainer'>
                <span className="material-icons">
                    directions_boat_filled
                </span>
                <div id='headerTitle'>Battleship!</div>
            </div>
        </div>
    )
}

export default Header;