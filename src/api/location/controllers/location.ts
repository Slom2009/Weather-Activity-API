/**
 * location controller
 */
import axios from 'axios'
import { factories } from '@strapi/strapi'
import { weather } from '../model/weather';

export default factories.createCoreController('api::location.location', ({ strapi }) => ({

    isItRaining: async (ctx) => {
        const url = process.env.Weather_Url;
        const appid = process.env.Weather_App_Id;
        try {
            let locationWeather: weather = {
                lon: "",
                lat: "",
                weatherMain: "",
                weatherDescription: "",
                isItRaining: false
            };
            const reqCtx = strapi.requestContext.get();
            reqCtx.url = reqCtx.url.toLowerCase();
            const qs1 = (reqCtx.url.trim().split("/api/v1/isitraining?")[1]).split("&")[0];
            const qs2 = (reqCtx.url.trim().split("/api/v1/isitraining?")[1]).split("&")[1];
            const feild1 = qs1.split('=');
            const feild2 = qs2.split('=');

            if (feild1[0] == 'lon' && feild2[0] == 'lat') {
                var lon = feild1[1];
                var lat = feild2[1];
                await axios.post(`${url}lon=${lon}&lat=${lat}&appid=${appid}`).then(
                    (response) => {
                        var weatherResponse = response.data.weather[0];
                        if (weatherResponse.main.includes("Rain") || weatherResponse.description.includes("rain")) {
                            locationWeather.isItRaining = true;
                            locationWeather.lon = lon;
                            locationWeather.lat = lat;
                            locationWeather.weatherMain = weatherResponse.main;
                            locationWeather.weatherDescription = weatherResponse.description;
                        }
                        else {
                            locationWeather.isItRaining = false;
                            locationWeather.lon = lon;
                            locationWeather.lat = lat;
                            locationWeather.weatherMain = weatherResponse.main;
                            locationWeather.weatherDescription = weatherResponse.description;
                        }
                    },
                    (error) => { console.log(error); }
                );
            }
            else if (feild1[0] == 'lat' && feild2[0] == 'lon') {
                var lat = feild1[1];
                var lon = feild2[1];
                await axios.post(`${url}lon=${lon}&lat=${lat}&appid=${appid}`).then(
                    (response) => {
                        var weatherResponse = response.data.weather[0];
                        if (weatherResponse.main.includes("Rain") || weatherResponse.description.includes("rain")) {
                            locationWeather.isItRaining = true;
                            locationWeather.lon = lon;
                            locationWeather.lat = lat;
                            locationWeather.weatherMain = weatherResponse.main;
                            locationWeather.weatherDescription = weatherResponse.description;
                        }
                        else {
                            locationWeather.isItRaining = false;
                            locationWeather.lon = lon;
                            locationWeather.lat = lat;
                            locationWeather.weatherMain = weatherResponse.main;
                            locationWeather.weatherDescription = weatherResponse.description;
                        }
                    },
                    (error) => { console.log(error); }
                );
            }
            else {

                throw new Error("Invalid Parameters // Longitude or latitude invalid");

            }

            return locationWeather;

        } catch (err) {
            console.log(err);
        }
    },

    whatToDo: async (ctx) => {
        const weatherUrl = process.env.Weather_Url;
        const activityUrl = process.env.Activity_Url;
        const appid = process.env.Weather_App_Id;
        let activityType: string = '';
        try {
            let weatherActivity = { recommendedActivity: "", type: "", weatherDescription: "" }
            const reqCtx = strapi.requestContext.get();
            reqCtx.url = reqCtx.url.toLowerCase();
            const qs1 = (reqCtx.url.trim().split("/api/v1/whattodo?")[1]).split("&")[0];
            const qs2 = (reqCtx.url.trim().split("/api/v1/whattodo?")[1]).split("&")[1];
            const feild1 = qs1.split('=');
            const feild2 = qs2.split('=');

            if (feild1[0] == 'lon' && feild2[0] == 'lat') {
                var lon = feild1[1];
                var lat = feild2[1];
                await axios.post(`${weatherUrl}lon=${lon}&lat=${lat}&appid=${appid}`).then(
                    (response) => {
                        var weatherResponse = response.data.weather[0];
                        weatherActivity.weatherDescription = weatherResponse.description;
                        var weatherResponseDescription = weatherResponse.description.toLowerCase();
                        if (weatherResponseDescription.includes('rain') || weatherResponseDescription.includes('cloud')) {
                            activityType = 'cooking';
                            weatherActivity.type = 'cooking';
                        }
                        else if (weatherResponseDescription.includes('sun') || weatherResponseDescription.includes('warm')) {
                            activityType = 'relaxation';
                            weatherActivity.type = 'relaxation';
                        }
                        else {
                            activityType = 'social';
                            weatherActivity.type = 'social';
                        }
                    },
                    (error) => { console.log(error); }
                );
                await axios.get(`${activityUrl}type=${activityType}`).then((res) => {
                    weatherActivity.recommendedActivity = res.data.activity;
                }, (err) => {
                    console.log(err)
                });

            }
            else if (feild1[0] == 'lat' && feild2[0] == 'lon') {
                var lat = feild1[1];
                var lon = feild2[1];
                await axios.post(`${weatherUrl}lon=${lon}&lat=${lat}&appid=${appid}`).then(
                    (response) => {
                        var weatherResponse = response.data.weather[0];
                        weatherActivity.weatherDescription = weatherResponse.description;
                        var weatherResponseDescription = weatherResponse.description.toLowerCase();
                        if (weatherResponseDescription.includes('rain') || weatherResponseDescription.includes('cloud')) {
                            activityType = 'cooking';
                            weatherActivity.type = 'cooking';
                        }
                        else if (weatherResponseDescription.includes('sun') || weatherResponseDescription.includes('warm')) {
                            activityType = 'relaxation';
                            weatherActivity.type = 'relaxation';
                        }
                        else {
                            activityType = 'social';
                            weatherActivity.type = 'social';
                        }
                    },
                    (error) => { console.log(error); }
                );
                await axios.get(`${activityUrl}type=${activityType}`).then((res) => {
                    weatherActivity.recommendedActivity = res.data.activity;
                }, (err) => {
                    console.log(err)
                });
            }
            else {

                throw new Error("Invalid Parameters // Longitude or latitude invalid");

            }
            return weatherActivity;
        }
        catch (err) {
            console.log(err);
        }
    }
}));
