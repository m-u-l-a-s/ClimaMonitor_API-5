/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-shadow */
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, {Marker, MapPressEvent} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {mapStyles} from './styles';

interface MapScreenProps {
  latitude?: number;
  longitude?: number;
  onSelectLocation: (latitude: number, longitude: number) => void;
}

const MapScreen: React.FC<MapScreenProps> = ({
  latitude,
  longitude,
  onSelectLocation,
}) => {
  const [currentLocation, setCurrentLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPermissionDenied, setIsPermissionDenied] = useState(false);

  const checkLocationPermission = async () => {
    try {
      const status = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      switch (status) {
        case RESULTS.GRANTED:
          getCurrentLocation();
          break;
        case RESULTS.DENIED:
          requestLocationPermission();
          break;
        case RESULTS.BLOCKED:
          Alert.alert(
            'Permissão bloqueada',
            'Vá até as configurações do dispositivo para permitir o acesso à localização.',
          );
          setIsPermissionDenied(true);
          break;
        default:
          setIsPermissionDenied(true);
          break;
      }
    } catch (error) {
      console.error('Erro ao verificar permissão', error);
    }
  };

  const requestLocationPermission = async () => {
    try {
      const status = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      if (status === RESULTS.GRANTED) {
        getCurrentLocation();
      } else {
        setIsPermissionDenied(true);
      }
    } catch (error) {
      console.error('Erro ao solicitar permissão', error);
    }
  };

  const getCurrentLocation = () => {
    setIsLoading(true);
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setCurrentLocation({latitude, longitude});
        onSelectLocation(latitude, longitude);
        setIsPermissionDenied(false);
        setIsLoading(false);
      },
      error => {
        if (error.code === 2) {
          Alert.alert(
            'GPS desativado',
            'Por favor, ative o GPS para obter a localização.',
          );
        } else {
          Alert.alert('Erro ao obter localização', error.message);
        }
        setIsLoading(false);
        setIsPermissionDenied(true);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  useEffect(() => {
    if (latitude && longitude) {
      setCurrentLocation({latitude, longitude});
      setIsLoading(false);
    } else {
      checkLocationPermission();
    }
  }, [latitude, longitude]);

  const handleMapPress = (event: MapPressEvent) => {
    const {latitude, longitude} = event.nativeEvent.coordinate;
    setCurrentLocation({latitude, longitude});
    onSelectLocation(latitude, longitude);
  };

  if (isPermissionDenied) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', borderColor: 'black'}}>
        <Text style={{fontSize: 16, marginBottom: 20}}>
          O acesso à sua localização foi negado. Permita o acesso para
          continuar.
        </Text>
        <TouchableOpacity
          onPress={checkLocationPermission}
          style={mapStyles.gpsButton}>
          <Text style={mapStyles.gpsButtonText}>Permitir Localização</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (isLoading || !currentLocation) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#007BFF" />
        <Text style={{marginTop: 10}}>Carregando localização...</Text>
      </View>
    );
  }

  return (
    <View style={{flex: 1}}>
      <MapView
        style={mapStyles.map}
        initialRegion={{
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        onPress={handleMapPress}>
        <Marker
          coordinate={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
          }}
          title="Local selecionado"
        />
      </MapView>
      <TouchableOpacity
        style={mapStyles.gpsButton}
        onPress={getCurrentLocation}>
        <Text style={mapStyles.gpsButtonText}>📍</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MapScreen;
