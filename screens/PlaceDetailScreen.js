import React from 'react';
import { ScrollView, Image, View, Text, StyleSheet, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import * as Sharing from 'expo-sharing';

import * as placesActions from '../store/places-actions';
import MapPreview from '../components/MapPreview';
import Colors from '../constants/Colors';

const PlaceDetailScreen = props => {
  const placeId = props.navigation.getParam('placeId');
  const selectedPlace = useSelector(state =>
    state.places.places.find(place => place.id === placeId)
  );

  const selectedLocation = { lat: selectedPlace.lat, lng: selectedPlace.lng };

  const dispatch = useDispatch();

  const showMapHandler = () => {
    props.navigation.navigate('Map', {
      readonly: true,
      initialLocation: selectedLocation
    });
  };

  const deletePlaceHandler = () => {
    dispatch(placesActions.removePlace(placeId));
    props.navigation.goBack();
  };

  const sharePlaceHandler = () => {
    var place = selectedPlace.address;
    Sharing.shareAsync(selectedPlace.imageUri,{dialogTitle:'Photo taken at '+ place});
    // Sharing.shareAsync(selectedPlace.imageUri);
  };

  return (
    <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
      <Image source={{ uri: selectedPlace.imageUri }} style={styles.image} />
      <Text style={styles.note}>{'Note: '+ props.navigation.getParam('placeTitle')}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Delete this place" onPress={deletePlaceHandler} />
        <Button title="Share this place" onPress={sharePlaceHandler} />
      </View>
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{selectedPlace.address}</Text>
        </View>
        <MapPreview
          style={styles.mapPreview}
          location={selectedLocation}
          onPress={showMapHandler}
        />
      </View>
    </ScrollView>
  );
};

PlaceDetailScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Place details'
  };
};

const styles = StyleSheet.create({
  note:{
    marginTop: 5,
  },
  image: {
    height: '35%',
    minHeight: 300,
    width: '100%',
    backgroundColor: '#ccc'
  },
  locationContainer: {
    marginVertical: 20,
    width: '90%',
    maxWidth: 350,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: 'white',
    borderRadius: 10
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    margin: 20
  },
  addressContainer: {
    padding: 20
  },
  address: {
    color: Colors.primary,
    textAlign: 'center'
  },
  mapPreview: {
    width: '100%',
    maxWidth: 350,
    height: 300,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  }
});

export default PlaceDetailScreen;
