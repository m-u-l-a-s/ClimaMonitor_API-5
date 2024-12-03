// src/components/syncComponent/syncComponent.tsx
import React, { useState } from 'react';
import { View, Text, Button, ActivityIndicator, StyleSheet } from 'react-native';
import { mySync } from '../../services/watermelon';
import { useAuth } from '../../context/AuthContext';

const SyncComponent: React.FC = () => {
    const [isSyncing, setIsSyncing] = useState(false);
    const [syncError, setSyncError] = useState<string | null>(null);
    const { userId } = useAuth()

    const handleSync = async () => {
        setIsSyncing(true);
        setSyncError(null);

        try {
            if (!userId) {
                return
            }
            await mySync(userId)
            console.log('Sincronização concluída com sucesso!');
        } catch (error) {
            console.error('Erro durante a sincronização:', error);
            setSyncError('Erro desconhecido');
        } finally {
            setIsSyncing(false);
        }
    };

    return (
        <View style={styles.container}>
            {isSyncing ? (
                <ActivityIndicator size="large" color="#007AFF" />
            ) : (
                <Button title="Sincronizar" onPress={handleSync} />
            )}
            {syncError && <Text style={styles.errorText}>{syncError}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    errorText: {
        marginTop: 10,
        color: 'red',
        fontSize: 14,
        textAlign: 'center',
    },
});

export default SyncComponent;
