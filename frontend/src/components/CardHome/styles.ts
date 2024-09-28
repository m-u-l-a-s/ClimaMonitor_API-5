import { StyleSheet } from "react-native";
import { themas } from "../../global/themes";

export const style = StyleSheet.create({

     container: {
        width: '90%',
        height: 60,
        alignItems: "center",
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: themas.colors.fundoCards,
        borderColor: themas.colors.bordaCards,
        borderRadius:5,
        marginBottom:15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        
        elevation: 4,

    },

    containerTexto:{
        width: '80%',
        height:'90%',
        alignItems: "flex-start",
        justifyContent:"center",  
        //backgroundColor:"red"
    },

    text: {
        fontSize: 20,
        marginLeft: 15,
    },

    icon: {
        width: "18%",
        height:'90%',
        alignItems: "flex-start",
        justifyContent:"center", 
        //backgroundColor: 'blue',
        
    },

    // Modal Styles
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo escuro transparente
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        elevation: 5, // Sombra para Android
        shadowColor: '#000', // Sombra para iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    modalText: {
        fontSize: 18,
        color: '#333',
        marginVertical: 10,
    },
    closeButton: {
        marginTop: 20,
        fontSize: 16,
        color: '#007BFF',
    },

})