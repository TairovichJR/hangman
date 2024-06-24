import React, { useEffect, useState } from 'react';
import { useGame } from '../../context/GameContext';
import { keyboard } from '../../data';
import { allValuesTrue, convertWordToMap, formatCategoryName } from '../../utils/utils';
import './Game.css';
import GameOver from './GameOver';
import Key from './Key';
import { useNavigate } from 'react-router-dom';

interface GameProps {
    category: string;
}
const Game = ({ category }: GameProps) => {

    const { chances, decreaseChances, restart, word, setRandomWord } = useGame();
    const [wordMap, setWordMap] = useState<{ [key: string]: boolean }>({});
    const [pressedKeys, setPressedKeys] = useState<{ [key: string]: boolean }>({});
    const [win, setWin] = useState(false);
    const wordLines = word.split(' ');
    const navigate = useNavigate();

    useEffect(() => {
        if (!category) {
            navigate('/');
        } else {
            setWordMap(convertWordToMap(word));
            setPressedKeys({});
        }
    }, [word, category, navigate]);

    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            e.preventDefault();
            e.returnValue = '';
            sessionStorage.setItem('confirmedReload', 'true');
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    useEffect(() => {
        if (sessionStorage.getItem('confirmedReload') === 'true') {
            sessionStorage.removeItem('confirmedReload');
            navigate('/');
        }
    }, [navigate]);
    

    const handleMatch = (k: string) => {
        if (k in wordMap) {
            setWordMap(prev => {
                const newWordMap = { ...prev, [k]: true };
                if (Object.keys(wordMap).length !== 0 && allValuesTrue(newWordMap)) {
                    setWin(true);
                }
                return newWordMap;
            });
        } else {
            decreaseChances();
        }
        setPressedKeys(prev => ({
            ...prev,
            [k]: true
        }));
    };

    const handlePlayAgain = () => {
        setPressedKeys({});
        setRandomWord(category);
        setWordMap(convertWordToMap(word));
        restart();
        setWin(false);
    };

    return (
        <div className="game-wrapper">
            <div className="game-container">
                <div className="game-inner">
                    <div className="top-section">
                        <h1>{formatCategoryName(category)}</h1>
                        {/* <span>CHANCES LEFT {chances}</span> */}
                    </div>
                    <div className="hangman-img-container">
                        <img className="img-style" src={require(`../../images/hangman_${6-chances}.png`)} alt=""/>
                    </div>
                    <div className="middle-section">
                        <div className="underscores">
                            {(win || chances === 0) &&
                                <GameOver header={chances === 0 ? "YOU LOST :(" : "YOU WON :)"}
                                          onPlayAgain={handlePlayAgain} />}

                            {wordLines.map((part, partIndex) => (
                                <div key={partIndex} className="underscore-line">
                                    {Array.from(part).map((letter, charIndex) => (
                                        <input
                                            key={charIndex}
                                            type="text"
                                            maxLength={1}
                                            className="underscore-input"
                                            disabled
                                            value={wordMap[letter] ? letter : ''}
                                        />
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    <div className="bottom-section">
                        {keyboard.map((k) => (
                            <Key key={k} k={k} handleMatch={handleMatch} pressed={pressedKeys[k]} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Game;
