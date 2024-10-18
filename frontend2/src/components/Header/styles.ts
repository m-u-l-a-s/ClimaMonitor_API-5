import { StyleSheet } from "react-native";
import { themas } from "../../global/themes";


export const style = StyleSheet.create({
    container: {
        height: 80, // Defina uma altura apropriada
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: "row",
        backgroundColor: themas.colors.tabs, 
        padding: 10,
    },

    usuario:{
        flexDirection: "row",
        justifyContent: 'space-between',
        marginTop: 5, 
        
    },

    texto:{
        fontSize: 20,
        marginLeft: 15,
        marginTop: 7,

    },

    notificacao:{
        marginTop: 5,
    },

    content: {
        flex: 1,
    },
})