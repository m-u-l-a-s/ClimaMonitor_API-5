import { Dimensions, StyleSheet } from "react-native";
import { themas } from "../../global/themes"

export const style = StyleSheet.create({

        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: themas.colors.branco,

        },

        boxTop: {
            height: Dimensions.get('window').height /1,
            width: '100%',
            backgroundColor:'red',
            alignItems: 'center',
            justifyContent: 'center',
        },

        boxMid: {
            height: Dimensions.get('window').height /2,
            width: '100%',
            backgroundColor:'green',
            paddingHorizontal: 37,

        },

        text:{
            fontSize: 25,
            marginTop: -160,
           
        }


    

})