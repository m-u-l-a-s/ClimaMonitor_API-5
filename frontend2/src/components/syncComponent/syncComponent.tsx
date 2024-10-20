import React, { useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { database } from '../../database/index'
import { mySync } from '../../services/watermelon';


const SyncComponent = () => {

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            if (state.isConnected) {
                console.log("conectado")
                sincronizarDados();
            } else {
                console.log("sem conexão")
            }
        });

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
