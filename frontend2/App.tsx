import { StyleSheet } from 'react-native';
import Routes from './src/routes/index.routes';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { CultivoProvider } from './src/context/CulturaContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';




export default function App() {
  return (
    <SafeAreaProvider>
    <CultivoProvider>
      <NavigationContainer>

        <Routes />

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
