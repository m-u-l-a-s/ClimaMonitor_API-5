import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {style} from './styles';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';

const CustomTabBar: React.FC<BottomTabBarProps> = ({navigation}) => {
  const handleNovoCadastro = () => {
    navigation.navigate('Cadastro');
  };

  const go = (screenName: string) => {
    navigation.navigate(screenName);
  };

  return (
    <View style={style.tabArea}>
      <TouchableOpacity onPress={() => go('Home')} style={style.tabButton}>
        <SimpleLineIcons name="home" style={style.icon} />
      </TouchableOpacity>

      <TouchableOpacity onPress={handleNovoCadastro} style={style.tabButton}>
        <SimpleLineIcons name="plus" style={style.icon} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => go('Profile')} style={style.tabButton}>
        <SimpleLineIcons name="user" style={style.icon} />
      </TouchableOpacity>
    </View>
  );
};

export default CustomTabBar;
