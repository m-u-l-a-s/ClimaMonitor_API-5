import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../pages/home/home";
import CustomTabBar from "../components/CustomTabBar";
import Cadastro from "../components/Cadastro/cadastro";
import Dashboard from "../pages/dashboard/dashboard";
import { View, Text} from "react-native";
import { style } from "./styles";
import { Header } from "../components/Header/header";


const Tab = createBottomTabNavigator();

export default function BottomRoutes() {

    return(
        
        <View style={{ flex: 1 }}>
        <Header />
        <View style={style.content}>
            <Tab.Navigator screenOptions={{ headerShown: false }} tabBar={props => <CustomTabBar {...props} />}>
                <Tab.Screen name="Home" component={Home} />
                <Tab.Screen name="Dashboard" component={Dashboard} />
                <Tab.Screen name="Cadastro" component={Cadastro} />
            </Tab.Navigator>
        </View>
        </View>
  
    )
}