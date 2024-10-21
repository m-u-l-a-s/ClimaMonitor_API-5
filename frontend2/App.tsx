import { StyleSheet } from 'react-native';
import Routes from './src/routes/index.routes';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { CultivoProvider } from './src/context/CulturaContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SyncComponent from './src/components/syncComponent/syncComponent';




export default function App() {
  return (
    <SafeAreaProvider>
      <CultivoProvider>
        <NavigationContainer>

          <Routes />
          <SyncComponent/> 
        </NavigationContainer>
      </CultivoProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
