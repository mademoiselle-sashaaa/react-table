import React from 'react';

function Popup({ onClose }) {
    return (
        <div className='popup'>
            <div className='popup_inner'>
                <h1>Some text</h1>
                <button onClick={onClose}>x</button>
            </div>
        </div>
    );
}

export default Popup;
