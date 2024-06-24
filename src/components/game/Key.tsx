import React from 'react';

interface KeyProps {
    k: string;
    handleMatch: (k: string) => void;
    pressed: boolean;
}

const Key = ({ k, handleMatch, pressed }: KeyProps) => {
    return (
        <div className="input-wrapper">
            <input
                type="text"
                maxLength={1}
                className={`letter-input ${pressed ? 'clicked' : ''}`}
                value={k}
                readOnly
                onClick={() => {
                    handleMatch(k);
                }}
                disabled={pressed}
            />
            {pressed && <span className="overlay-x">X</span>}
        </div>
    );
}

export default Key;
