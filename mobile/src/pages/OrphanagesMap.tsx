import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import api from '../services/api';

import mapMarker from '../images/map-marker.png';

interface HostHouse {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

export default function OrphanagesMap() {
  const navigation = useNavigation();
  const [hostHouses, setHostHouses] = useState<HostHouse[]>([]);

  useFocusEffect(() => {
    async function loadHostHouses() {
      await api.get('orphanages').then(response => {
        setHostHouses(response.data);
      });
    }

    loadHostHouses();
  });

  function handleNavigateToOrphanageDetails(id: number) {
    navigation.navigate('OrphanageDetails', { id });
  }

  function handleNavigateToCreateOrphanage() {
    navigation.navigate('SelectMapPosition');
  }

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: -6.489902,
          longitude: -35.637461,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
      >
        {hostHouses.map(hostHouse => (
          <Marker
            key={hostHouse.id}
            icon={mapMarker}
            calloutAnchor={{
              x: 2.7,
              y: 0.8,
            }}
            coordinate={{
              latitude: hostHouse.latitude,
              longitude: hostHouse.longitude,
            }}
          >
            <Callout
              tooltip
              onPress={() => handleNavigateToOrphanageDetails(hostHouse.id)}>
              <View style={styles.calloutContainer}>
                <Text style={styles.calloutText}>{hostHouse.name}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {hostHouses.length} orfanatos encontrados
        </Text>

        <RectButton
          style={styles.createOrphanageButton}
          onPress={handleNavigateToCreateOrphanage}
        >
          <Feather name="plus" size={20} color="#FFFFFF" />
        </RectButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  calloutContainer: {
    justifyContent: 'center',
    width: 160,
    height: 46,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
  },
  calloutText: {
    fontFamily: 'Nunito_700Bold',
    fontSize: 14,
    color: '#0089A5',
  },
  footer: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 56,
    left: 24,
    right: 24,
    bottom: 32,
    paddingLeft: 24,
    borderRadius: 20,
    elevation: 3,
    backgroundColor: '#FFFFFF',
  },
  footerText: {
    fontFamily: 'Nunito_700Bold',
    color: '#8FA7B3',
  },
  createOrphanageButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 56,
    height: 56,
    borderRadius: 20,
    backgroundColor: '#15C3D6',
  },
});
