import HttpCommunicator from './http-communicator';

export default class Data {

    constructor() {
        this.http = new HttpCommunicator();
    }

    getEuropeData(callback) {
        this.http.addGetToBuffer("https://www.worldometers.info/coronavirus/coronavirus-cases/", result => {
            callback(result);
        });
    }

    getCountryData(country, callback) {
        if (country == "sKorea") {
            country = "south-korea";
        }
        if (country == "hongkong") {
            country = "china-hong-kong-sar";
        }
        this.http.addGetToBuffer("https://www.worldometers.info/coronavirus/country/" + country + "/", result => {
            callback(result);
        });
    }

}