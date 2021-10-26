import React, { useEffect } from 'react';
import { View, Button, StyleSheet, Platform, FlatList } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import HeaderButton from '../components/HeaderButton';
import PlaceItem from '../components/PlaceItem';
import * as placesActions from '../store/places-actions';
import Colors from '../constants/Colors';

const PlacesListScreen = props => {
  const places = useSelector(state => state.places.places);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(placesActions.loadPlaces());
  }, [dispatch]);

  return (
    <View >
      <FlatList
      data={places}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <PlaceItem
          image={itemData.item.imageUri}
          title={itemData.item.title}
          address={null}
          onSelect={() => {
            props.navigation.navigate('PlaceDetail', {
              placeTitle: itemData.item.title,
              placeId: itemData.item.id
            });
          }}
        />
      )}
      />
      <View style={styles.buttonContainer}>
        <Button
          title="Add New Photo"
          color={Colors.primary}
          onPress={() => {
            props.navigation.navigate('NewPlace');
          }}
        />
      </View>
    </View>
  );
};

//这里是首页顶部导航菜单，要把add place改成位于底部的大按钮或者浮动按钮
PlacesListScreen.navigationOptions = navData => {
  return {
    headerTitle: 'All Place Photos',
    headerRight: () =>
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Add Place"
          iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
          onPress={() => {
            navData.navigation.navigate('NewPlace');
          }}
        />
      </HeaderButtons>
    
  };
};

const styles = StyleSheet.create({
  buttonContainer: {
    margin: 30
  }
});

export default PlacesListScreen;
