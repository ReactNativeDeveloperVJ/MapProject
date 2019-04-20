import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import MapboxGL from '@mapbox/react-native-mapbox-gl';

MapboxGL.setAccessToken('pk.eyJ1IjoidmotYXBwaW52ZW50aXYiLCJhIjoiY2pkNXo3ZGtnMXJyYTMzbnd5ZndycjcwbCJ9.zXzd1U5oJhS8iCgrzu1ilA');

export default class MapScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            point: [],
            route:
            {
                "type": "FeatureCollection",
                "features": [
                    {
                        "type": "Feature",
                        "properties": {},
                        "geometry": {
                            "type": "LineString",
                            "coordinates": [
                                [
                                    77.391029,
                                    28.535517
                                ],
                                [
                                    77.363930,
                                    28.620764
                                ]
                            ]
                        }
                    }
                ]
            }
        }
    }

    onMapPress = (pointData) => {
        let items = [];
        items.push(
            <MapboxGL.PointAnnotation
                id={"1"}
                coordinate={pointData.geometry.coordinates} />
        );
        this.setState({ point: items });
    }

    render() {
        return (
            <MapboxGL.MapView
                zoomLevel={14}
                showUserLocation={false}
                onPress={this.onMapPress}
                styleURL={MapboxGL.StyleURL.Street}
                style={StyleSheet.absoluteFillObject}
                userTrackingMode={MapboxGL.UserTrackingModes.Follow}>
                {
                    this.state.point
                }
                <MapboxGL.ShapeSource id='line1' shape={this.state.route}>
                    <MapboxGL.LineLayer id='linelayer1' style={{ lineColor: 'red' }} />
                </MapboxGL.ShapeSource>
            </MapboxGL.MapView>
        );
    }
}

const styles = StyleSheet.create({
});
