import {Cultivo} from '../@types/culturaDto';

export type RootStackParamList = {
  Login: undefined;
  CadastroUsuario: undefined;
  BottomRoutes: undefined;
  Home: undefined;
  Dashboard: {
    cultura: Cultivo;
  };
  Cadastro: undefined;
  Profile: undefined;
  Notificacao: undefined;
  Relatorio:{
    cultura: Cultivo;
  };
};
