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
            //extracting query strings
            const requestContext = strapi.requestContext.get();
            var result = await strapi
                .service('api::location.location')
                .extractQueryStrings(requestContext.url.toLowerCase(), "isitraining");

            //Initiate request to Weather API
            var { data } = await axios.post(`${url}lon=${result.lon}&lat=${result.lat}&appid=${appid}`);

            var response = data.weather[0];

            if (response.main.includes("Rain") || response.description.includes("rain")) {
                var locationWeather: weather = await strapi
                    .service('api::location.location')
                    .mapLocationWeather(true, result, response.main, response.description);
                return locationWeather;
            }
            else {
                var locationWeather: weather = await strapi
                    .service('api::location.location')
                    .mapLocationWeather(false, result, response.main, response.description);

                return locationWeather;
            }


        }
        catch (err) {
            //Maintain Response Code
            console.log(JSON.stringify(ctx.response));
            ctx.response.status = 400;
            ctx.response.body = { error: { status: 400, message: 'Bad Request - Invalid Parameters' } }

        }
    },

    whatToDo: async (ctx) => {
        const weatherUrl = process.env.Weather_Url;
        const activityUrl = process.env.Activity_Url;
        const appid = process.env.Weather_App_Id;
        let activityType: string = '';
        try {
            //preparing response object
            let weatherActivity = { recommendedActivity: "", type: "", weatherDescription: "" }

            //extracting query strings
            const requestContext = strapi.requestContext.get();
            var result = await strapi
                .service('api::location.location')
                .extractQueryStrings(requestContext.url.toLowerCase(), "whattodo");

            //Initiate request to Weather API
            await axios.post(`${weatherUrl}lon=${result.lon}&lat=${result.lon}&appid=${appid}`).then(
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
                (error) => { console.log(error); });

            //Initiate request to Activity API
            await axios.get(`${activityUrl}type=${activityType}`).then((res) => {
                weatherActivity.recommendedActivity = res.data.activity;
            }, (err) => {
                console.log(err)
            });


            return weatherActivity;
        }
        catch (err) {
            //Maintain Response Code
            console.log(JSON.stringify(ctx.response));
            ctx.response.status = 400;
            ctx.response.body = { error: { status: 400, message: 'Bad Request - Invalid Parameters' } }
        }
    }
}));
