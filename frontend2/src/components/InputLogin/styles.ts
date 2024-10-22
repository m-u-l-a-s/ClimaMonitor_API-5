import { StyleSheet } from "react-native";
import { themas } from "../../global/themes";

export const style = StyleSheet.create({
    boxInput: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderRadius: 5,
        marginTop: 10,
        flexDirection: "row",
        alignItems: 'center',
        paddingHorizontal: 10,
        backgroundColor: themas.colors.inputLogin,
        borderColor: themas.colors.inputLogin,
    },

    input: {
        height: '100%',
        width: '90%',
        // backgroundColor:'red',
        borderRadius: 5,

    },
   
    titleInput: {
        marginLeft: 5,
        marginTop: 20,
    },

    icon:{
        width:'100%',
    },
    button:{
        width:'10%'
    }

})
