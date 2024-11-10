import React, { useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { database } from '../../database/index'
import { mySync } from '../../services/watermelon';
import { useAuth } from '../../context/AuthContext';


const SyncComponent = () => {
    const auth = useAuth()

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
        if (auth.userId) {
            await mySync(auth.userId)
        }
    }

    return null;
};

export default SyncComponent;
