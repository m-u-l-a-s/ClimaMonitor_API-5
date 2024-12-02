import {Cultivo, Pluviometria, Temperatura} from '../@types/culturaDto';
import CulturasModel from '../models/Cultura';

export type RootStackParamList = {
  Login: undefined;
  CadastroUsuario: undefined;
  BottomRoutes: undefined;
  Home: undefined;
  Dashboard: {
    cultura: CulturasModel;
  };
  Cadastro: undefined;
  Profile: undefined;
  Notificacao: undefined;
  Relatorio:{
    cultura: CulturasModel;
  };
  EditarCultura: {
    cultura: CulturasModel
  };
};
