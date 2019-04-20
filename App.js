import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Dimensions, Modal } from 'react-native';
import MapboxGL from '@mapbox/react-native-mapbox-gl';
import Store from './mobx/Store';
import { observer } from 'mobx-react';
import ModalClass from './ModalClass';

const { width, height } = Dimensions.get('window');

MapboxGL.setAccessToken('pk.eyJ1IjoidmotYXBwaW52ZW50aXYiLCJhIjoiY2pkNXo3ZGtnMXJyYTMzbnd5ZndycjcwbCJ9.zXzd1U5oJhS8iCgrzu1ilA');

@observer
export default class App extends Component {

  renderPointers = () => {
    let items = [];
    if (Store.loc1Coord.lat !== 0.0) {
      items.push(
        <MapboxGL.PointAnnotation
          id={"1"}
          coordinate={[Store.loc1Coord.lng, Store.loc1Coord.lat]} />
      );
    }
    if (Store.loc2Coord.lat !== 0.0) {
      items.push(
        <MapboxGL.PointAnnotation
          id={"1"}
          coordinate={[Store.loc2Coord.lng, Store.loc2Coord.lat]} />
      );
    }
    return items;
  }

  renderRoute() {
    if (!Store.route) {
      return null;
    }

    return (
      <MapboxGL.ShapeSource id='routeSource' shape={Store.route}>
        <MapboxGL.LineLayer id='routeFill' style={{
          lineWidth: 3,
          lineColor: '#000',
          lineOpacity: 0.84,
        }} />
      </MapboxGL.ShapeSource>
    );
  }

  renderUpperView = () => {
    return (
      <View style={styles.inputsContainer}>
        <TouchableOpacity style={styles.inputContainer} activeOpacity={1} onPress={() => Store.openModal(1)}>
          <Text numberOfLines={1} style={styles.textStyle}>{Store.loc1Name}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.inputContainer} activeOpacity={1} onPress={() => Store.openModal(2)}>
          <Text numberOfLines={1} style={styles.textStyle}>{Store.loc2Name}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} activeOpacity={1} onPress={() => Store.createPath()}>
          <Text numberOfLines={1} style={styles.textStyle}>{"Show Path"}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    return (
      <View style={StyleSheet.absoluteFill}>
        {
          this.renderUpperView()
        }
        <ModalClass />
        <View style={styles.mapContainer}>
          <MapboxGL.MapView
            zoomLevel={14}
            showUserLocation={false}
            onPress={this.onMapPress}
            styleURL={MapboxGL.StyleURL.Street}
            style={StyleSheet.absoluteFillObject}
            userTrackingMode={MapboxGL.UserTrackingModes.Follow}>
            {
              this.renderPointers()
            }
            {
              this.renderRoute()
            }
          </MapboxGL.MapView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputsContainer: {
    flex: 0.2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  mapContainer: {
    flex: 0.8
  },
  inputContainer: {
    width,
    flex: 0.4,
    alignItems: 'center',
    borderBottomWidth: 0.5,
    justifyContent: 'center',
    borderBottomColor: 'gray',
  },
  textStyle: {
    width: '89%'
  },
  button: {
    padding: 5,
    marginTop: 5,
    width: 'auto',
    height: 'auto',
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
