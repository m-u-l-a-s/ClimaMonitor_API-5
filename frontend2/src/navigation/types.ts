import { Cultivo } from "../@types/culturaDto";

// src/navigation/types.ts
export type RootStackParamList = {
    Home: undefined;
    Cadastro: undefined;
    Dashboard: {
      cultura: Cultivo
  };
    // Adicionar outras telas aqui
  };
  