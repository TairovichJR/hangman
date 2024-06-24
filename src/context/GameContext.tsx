import React, { createContext, useState, ReactNode, useContext } from 'react';
import { categoriesData } from '../data';

interface GameProviderProps {
  children: ReactNode;
}

interface GameContextProps {
   chances: number;
   decreaseChances: () => void;
   restart: () => void;
   setRandomWord: (category: string) => void;
   word: string;
}

const GameContext = createContext<GameContextProps | undefined>(undefined);

export const GameProvider = ({ children }: GameProviderProps) => {

    const[chances, setChances] =  useState(6);
    const[word, setWord] = useState('');

    const decreaseChances = () => {
        setChances(chances-1);
    }
    
    const restart = () => {
        setChances(6);
    }

    const setRandomWord = (category:string) => {
      if(category){
        const items = categoriesData[category];
        setWord( items[Math.floor(Math.random() * items.length)]);
      }else{
        setWord('');
      }      
    }

  return (
    <GameContext.Provider value={{chances, decreaseChances, restart, setRandomWord, word }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = (): GameContextProps => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};