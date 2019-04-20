import { observable, action } from 'mobx';
import MapboxClient from 'mapbox';
import { lineString as makeLineString } from '@turf/helpers';
const mapBoxClient = new MapboxClient('pk.eyJ1IjoidmotYXBwaW52ZW50aXYiLCJhIjoiY2pkNXo3ZGtnMXJyYTMzbnd5ZndycjcwbCJ9.zXzd1U5oJhS8iCgrzu1ilA');

class Store {
    @observable loc1Name = "Location 1";
    @observable loc2Name = "Location 2";
    @observable loc1Coord = { lat: 0.0, lng: 0.0 };
    @observable loc2Coord = { lat: 0.0, lng: 0.0 };
    @observable showModal = false;
    @observable currentFieldNum = 0;
    @observable route = undefined;

    @action showHideModal() {
        this.showModal = !this.showModal;
    }

    @action openModal(number) {
        this.currentFieldNum = number;
        this.showModal = true;
    }

    @action processLocation(data) {
        if (this.currentFieldNum == 1) {
            this.loc1Name = data.formatted_address;
            this.loc1Coord = data.geometry.location;
        } else if (this.currentFieldNum == 2) {
            this.loc2Name = data.formatted_address;
            this.loc2Coord = data.geometry.location;
        }
        this.showModal = false;
    }

    @action createPath() {
        if (this.loc1Coord.lat == 0.0 || this.loc2Coord.lat == 0.0) {
            alert("please select both points first")
            return;
        }
        mapBoxClient.getDirections([
            { latitude: this.loc1Coord.lat, longitude: this.loc1Coord.lng },
            { latitude: this.loc2Coord.lat, longitude: this.loc2Coord.lng },
        ], { profile: 'driving', geometry: 'polyline' }).then(res => {
            if (res) {
                this.route = makeLineString(res.entity.routes[0].geometry.coordinates);
            }
        });
    }
}

export default new Store();