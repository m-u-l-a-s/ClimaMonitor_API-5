import { Cultivo } from "../@types/culturaDto";

// src/navigation/types.ts
export type RootStackParamList = {
    Home: undefined;
    Cadastro: undefined;
    Dashboard: {
      temperatura: string;
      pluviometria: string;
      cultura: Cultivo;
  };
    // Adicionar outras telas aqui
  };
  