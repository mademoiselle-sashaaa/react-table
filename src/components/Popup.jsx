import React from 'react';

function Popup({ onClose }) {
    return (
        <div className='popup' onClick={onClose}>
            <div className='popup_inner'>
                <button onClick={onClose}>x</button>
                <h1>Some text</h1>
            </div>
        </div>
    );
}

export default Popup;
