import React, {createContext, useContext, useState, ReactNode} from 'react';
import {Cultivo} from '../@types/culturaDto';
import {BASE_URL} from '../variables';

interface CultivoContextType {
  cultivos: Cultivo[];
  setCultivos: React.Dispatch<React.SetStateAction<Cultivo[]>>;
  fetchCultivos: (userId: string) => void;
}

const CultivoContext = createContext<CultivoContextType | undefined>(undefined);

export const CultivoProvider: React.FC<{children: ReactNode}> = ({
  children,
}) => {
  const [cultivos, setCultivos] = useState<Cultivo[]>([]);

  const fetchCultivos = async (userId: string) => {
    try {
      const response = await fetch(`${BASE_URL}/cultura/user/${userId}`);
      if (response.ok) {
        const data: Cultivo[] = await response.json();
        const activeCultivos = data.filter(cultivo => !cultivo.deletedAt);
        setCultivos(activeCultivos);
      } else {
        console.error('Erro ao obter as culturas else:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao obter as culturas:', error);
    }
  };

  return (
    <CultivoContext.Provider value={{cultivos, setCultivos, fetchCultivos}}>
      {children}
    </CultivoContext.Provider>
  );
};

export const useCultivoContext = () => {
  const context = useContext(CultivoContext);
  if (!context) {
    throw new Error('useCultivoContext must be used within a CultivoProvider');
  }
  return context;
};
