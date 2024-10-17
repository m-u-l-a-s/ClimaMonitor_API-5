import React from "react";
import {Text, TouchableOpacity, View} from 'react-native';
import { style } from "./styles";
import { NavigationProp } from '@react-navigation/native';
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";





type Props = {
    navigation: NavigationProp<any>; 
  };

  const CustomTabBar: React.FC<BottomTabBarProps> = ({navigation}) => {
    const go = (screenName:string)=>{
        navigation.navigate(screenName)
    }

    return(
          <View style={style.tabArea}>

            <TouchableOpacity onPress={()=>go('Home')}>
                {/* <SimpleLineIcons name="home" style={{fontSize:32}} /> */}
                <Text>Home</Text>
            </TouchableOpacity>

          </View>

        

    )
}

export default CustomTabBar;