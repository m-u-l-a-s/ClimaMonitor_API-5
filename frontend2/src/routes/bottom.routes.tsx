/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/react-in-jsx-scope */
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../pages/home/home';
import CustomTabBar from '../components/CustomTabBar';
import Cadastro from '../pages/cadastro/cadastro';
import Dashboard from '../pages/dashboard/dashboard';
import Notificacao from '../pages/notificacao/notificacao';
import UserProfile from '../pages/perfil/perfil';
import {View} from 'react-native';
import {style} from './styles';
import {Header} from '../components/Header/header';

const Tab = createBottomTabNavigator();

export default function BottomRoutes() {
  return (
    <View style={{flex: 1}}>
      <Header />
      <View style={style.content}>
        <Tab.Navigator
          screenOptions={{headerShown: false}}
          tabBar={props => <CustomTabBar {...props} />}>
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Dashboard" component={Dashboard} />
          <Tab.Screen name="Cadastro" component={Cadastro} />
          <Tab.Screen name="Profile" component={UserProfile} />
          <Tab.Screen name="Notificacao" component={Notificacao} />
        </Tab.Navigator>
      </View>
    </View>
  );
}
