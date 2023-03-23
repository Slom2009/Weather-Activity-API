/**
 * location service
 */

import { factories } from '@strapi/strapi';
import { weather } from '../model/weather';

export default factories.createCoreService('api::location.location', ({ strapi }) => ({

    extractQueryStrings: async (url: any, endpointName: string) => {
        try {
            let result = { lon: 0, lat: 0 };

            const urlQuery: string[] = (url.trim().split(`/api/v1/${endpointName}?`)[1]).split("&");

            if (urlQuery.length > 2 || urlQuery.length < 2) {
                throw new Error("Invalid longtitude or latitude or both" + "Line: 17 s");
            }
            const qs1 = urlQuery[0];
            const qs2 = urlQuery[1];

            const feild1 = qs1.split('=');
            const feild2 = qs2.split('=');

            if (feild1.length > 2 || feild2.length > 2 || feild1.length < 2 || feild2.length < 2) {
                throw new Error("Invalid longtitude or latitude or both" + "Line: 26 s");
            }


            if (feild1[0] == 'lon' && feild2[0] == 'lat') {
                let lon: number = + feild1[1];
                let lat: number = + feild2[1];

                if (isNaN(lat) || isNaN(lon)) {
                    throw new Error("Invalid Longtitude or latitude or both" + "Line: 35 s");
                }
                result.lat = lat;
                result.lon = lon;
                if (result.lat === 0 || result.lon === 0) { throw new Error("Invalid Longtitude or latitude or both" + "Line: 39 s"); }
                else {
                    return result;
                };
            }
            else if (feild1[0] == 'lat' && feild2[0] == 'lon') {
                let lat: number = + feild1[1];
                let lon: number = + feild2[1];

                if (isNaN(lat) || isNaN(lon)) {
                    throw new Error("Invalid Longtitude or latitude or both" + "Line: 50 s");
                }

                result.lat = lat;
                result.lon = lon;
                if (result.lat === 0 || result.lon === 0) { throw new Error("Invalid Longtitude or latitude or both" + "Line: 55 s"); }

            }
            else {
                throw new Error("Invalid Parameters");
            }

            return result;

        }
        catch (err) {
            console.log(err);
        }
    },

    mapLocationWeather: async (isRaining: boolean, result: any, weatherMain: string, weatherDescription: string) => {
        let locationWeather: weather = {
            lon: result.lon.toString(),
            lat: result.lat.toString(),
            weatherMain: weatherMain,
            weatherDescription: weatherDescription,
            isItRaining: true
        };
        if (!isRaining) {
            locationWeather.isItRaining = false;
        }
        else {
            locationWeather.isItRaining = true;
        }

        return locationWeather;
    },

}));
