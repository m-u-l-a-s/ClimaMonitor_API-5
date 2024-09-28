// src/navigation/types.ts
export type RootStackParamList = {
    Home: undefined;
    Cadastro: undefined;
    Dashboard: {
      temperatura: string;
      pluviometria: string;
      cultura: string;
  };
    // Adicionar outras telas aqui
  };
  