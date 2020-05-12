import React from 'react';

type PopupProps = {
    onClose: (e: React.MouseEvent<HTMLElement>) => void
}

const Popup: React.FC<PopupProps> = ({ onClose }) => {
    return (
        <div className='layout' onClick={onClose}>
            <div className='popup'>
                <button onClick={onClose}>x</button>
                <h1>Some text</h1>
            </div>
        </div>
    );
}

export default Popup;
