import React, { useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { mySync } from '../../services/watermelon';
import { useAuth } from '../../context/AuthContext';

const SyncComponent: React.FC = () => {
    const [isSyncing, setIsSyncing] = useState(false);
    const [syncError, setSyncError] = useState<string | null>(null);
    const { userId } = useAuth();

    const handleSync = async () => {
        setIsSyncing(true);
        setSyncError(null);

        try {
            if (!userId) {
                return;
            }
            await mySync(userId);
            console.log('Sincronização concluída com sucesso!');
        } catch (error) {
            console.error('Erro durante a sincronização:', error);
            setSyncError('Erro desconhecido');
        } finally {
            setIsSyncing(false);
        }
    };

    return (
        <ScrollView
            contentContainerStyle={styles.container}
            refreshControl={
                <RefreshControl
                    refreshing={isSyncing}
                    onRefresh={handleSync}
                    colors={["#007AFF"]} // Cor do indicador de carregamento
                />
            }
        
        >
            {isSyncing ? (
                <ActivityIndicator size="large" color="#007AFF" />
            ) : (
                <Text style={styles.infoText}></Text>
            )}
            {syncError && <Text style={styles.errorText}>{syncError}</Text>}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        height: 2
    },
    errorText: {
        marginTop: 0,
        color: 'red',
        fontSize: 14,
        textAlign: 'center',
    },
    infoText: {
        fontSize: 1,
        color: '#555',
        textAlign: 'center',
    },
});

export default SyncComponent;
