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