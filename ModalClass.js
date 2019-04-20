import React, { Component } from 'react';
import { Modal, View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { observer } from 'mobx-react';
import Store from './mobx/Store';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

@observer
export default class ModalClass extends Component {
    render() {
        return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={Store.showModal}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                }}>
                <View style={styles.viewContainer}>
                    <TouchableOpacity activeOpacity={1} style={styles.closeBtn} onPress={() => Store.showHideModal()}>
                        <Text>Close</Text>
                    </TouchableOpacity>
                    <GooglePlacesAutocomplete
                        placeholder='Search'
                        minLength={2}
                        autoFocus={false}
                        fetchDetails={true}
                        onPress={(data, details = null) => {
                            Store.processLocation(details);
                        }}
                        query={{
                            key: 'AIzaSyDlqZiOaQpenzlw8xStny0vFBQOuuSVTkk',
                            language: 'en'
                        }}
                        styles={{
                            description: {
                                fontWeight: 'bold',
                            },
                            predefinedPlacesDescription: {
                                color: '#1faadb',
                            },
                        }}
                        nearbyPlacesAPI='GooglePlacesSearch'
                        GooglePlacesSearchQuery={{
                            rankby: 'distance',
                            types: 'food',
                        }}
                        GooglePlacesDetailsQuery={{
                            fields: 'formatted_address',
                        }}
                        filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']}
                    />
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    viewContainer: {
        flex: 1,
        paddingTop: 100,
        backgroundColor: 'rgba(255,255,255,0.4)'
    },
    closeBtn: {
        flex: 1,
        top: 50,
        right: 20,
        position: 'absolute'
    }
})