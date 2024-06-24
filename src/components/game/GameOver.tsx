import React from 'react';
import { useNavigate } from 'react-router-dom';

interface GameOverProps {
    header: string;
    onPlayAgain: () => void;
}

const GameOver = ({ header, onPlayAgain }: GameOverProps) => {
    const navigate = useNavigate();

    return (
        <div className="result">
            <h1>{header}</h1>
            <p className="play-again" onClick={onPlayAgain}>PLAY AGAIN</p>
            <p className="choose-category" onClick={() => navigate('/')}>CHOOSE ANOTHER CATEGORY</p>
        </div>
    );
}

export default GameOver;
