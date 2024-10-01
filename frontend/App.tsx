import { StyleSheet } from 'react-native';
import Routes from './src/routes/index.routes';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { CultivoProvider } from './src/context/CulturaContext';



export default function App() {
  return (
    <CultivoProvider>
      <NavigationContainer>

        <Routes />

      </NavigationContainer>
    </CultivoProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
