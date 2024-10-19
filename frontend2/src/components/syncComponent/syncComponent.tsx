import React, { useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { database } from '../../database/index'
import { mySync } from '../../services/watermelon';


const SyncComponent = () => {

    useEffect(() => {
        // Adiciona um listener para monitorar mudanças na conectividade
        const unsubscribe = NetInfo.addEventListener(state => {
            if (state.isConnected) {
                console.log("Conectado")
                sincronizarDados(); // Sincroniza quando a conexão for detectada
            } else {
                console.log("sem conexão")
            }
        });

        // Limpa o listener quando o componente for desmontado
        return () => {
            unsubscribe();
        };
    }, []);

    async function sincronizarDados() {
        await mySync()
    }

    return null;
};

export default SyncComponent;
