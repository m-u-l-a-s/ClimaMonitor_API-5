import { StyleSheet } from "react-native";
import { themas } from "../../global/themes";

export const style = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: themas.colors.branco,
    },

    titulo:{
        alignItems:"center",
        marginTop:13, 

    },

    texto1:{
        fontSize:35,
    },
    texto2:{
        fontSize:20,
    },

    cards:{
        width:'100%',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection:'row',
        marginTop:30,

    }


})