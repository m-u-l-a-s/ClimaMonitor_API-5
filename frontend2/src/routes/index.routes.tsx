import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../pages/login/login';
import BottomRoutes from './bottom.routes';
import CadastroUsuario from '../pages/cadUsuario/cadUsuario';
import EditarCultivo from '../pages/editarCultivo/editarCultivo'

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="CadastroUsuario" component={CadastroUsuario} />
      <Stack.Screen name="BottomRoutes" component={BottomRoutes} />
      <Stack.Screen name="EditarCultivo" component={EditarCultivo} />
    </Stack.Navigator>
  );
}
