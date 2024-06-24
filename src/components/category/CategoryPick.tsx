import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../../context/GameContext';
import { categoryTypes } from '../../data';
import { formatCategoryName } from '../../utils/utils';
import './CategoryPick.css';

interface CategoryPickProps {
    category: string;
    setCategory: (c: string) => void;
}

const CategoryPick = ({ setCategory, category }: CategoryPickProps) => {

    const [error, setError] = useState('');

    const navigate = useNavigate();
    const { restart, setRandomWord } = useGame();

    const startGame = () => {
        if (category.trim().length === 0) {
            setError('Please choose a category first.');
        } else {
            setError('');
            setRandomWord(category);
            navigate('/game');
            restart();
        }
    };

    const handleCategoryClick = (c: string) => {
        setCategory(category === c ? '' : c);
        setError('');
    };

    return (
        <div className="category-wrapper">
            <div className="category-container">
                <div className="category-inner">
                    <div className="category-container-header">
                        <div>
                            <h1>PICK A CATEGORY</h1>
                        </div>
                    </div>
                    <div className="categories-section">
                        <div className="categories">
                            {categoryTypes.map((c) => (
                                <div
                                    onClick={() => handleCategoryClick(c)}
                                    key={c}
                                    className={`category-type ${category === c ? 'selected' : ''}`}
                                >
                                    {formatCategoryName(c)}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="error-message">{error}</div>
                    <div className="play-btn-section">
                        <button className="play-btn" onClick={startGame}>Start Playing</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryPick;