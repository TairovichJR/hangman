import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import CategoryPick from './components/category/CategoryPick';
import Game from './components/game/Game';

function App() {

  const [category, setCategory] = useState('');

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<CategoryPick setCategory={setCategory} category={category}/>} />
        <Route path="/game" element={<Game category={category}  />} />
      </Routes>
    </div>
  );
}

export default App;