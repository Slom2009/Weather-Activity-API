# 🚀 Weather-Activity-API

- Description : A Strapi api that integrates with both bored-api and open-weather-map-api , Checks the weather at a certain location using latitude and longitude as query string parameters

## Endpoints :-
      1- "/api/v1/isitraining" - To Check if it's raining at a certain location :
      "Domain or local host name"/api/v1/isitraining?lon={lon}&lat={lat}  ex. http://localhost:1337/api/v1/isitraining?lat=19.20&lon=19.20
      
      2- "/api/v1/whattodo" - To provide a recommended activity according to weather in a certain location :
      "Domain or local host name"/api/v1/whattodo?lon={lon}&lat={lat}  ex. http://localhost:1337/api/v1/whattodo?lat=19.20&lon=19.20
      
## Instructions to properly run the project:-

1- Using CLI or PowerShell : clone the repo using the git clone command

2- Using ClI or PowerShell : write command  "npm install"  to install all dependencies

3- Add a file called ".env" at the root of your project folder and include in it all the configuration variables for your integrated apis and app_keys and Database

          for example:-

              HOST=0.0.0.0
              PORT="your used port for the project"
              APP_KEYS="put your app keys hash here"
              API_TOKEN_SALT="put your API Token Salt hash here"
              ADMIN_JWT_SECRET="put your Admin JWT secret key here"
              TRANSFER_TOKEN_SALT="put your Transfer Token Salt hash here"
              # Database
              DATABASE_CLIENT=sqlite
              DATABASE_FILENAME=.tmp/data.db
              JWT_SECRET="put your JWT secret key here"
              # Third_Party_APIS
              Weather_Url='http://api.openweathermap.org/data/2.5/weather?'
              Activity_Url='https://www.boredapi.com/api/activity?'
              Weather_App_Id = "Put Here the openweatherapi appid"

4- Using ClI or PowerShell : use "npm run build" command to build the project

5- Using ClI or PowerShell : use "npm run develop" command to run the project

6- Navigate to "http://localhost:1337/Admin" using browser and make sure the browser can accept http protocols if it doesn't work on Chrome you can use Microsoft Edge.

7- Sign-up as an admin account 

## For Testers:-
"api endpoints is usually set to Authenticate requests as default; so calling the above endpoints will give a response of 403 Forbidden error message. To change it do the following. "

8- Navigate to settings -> USERS & PERMISSIONS PLUGIN  -> Roles -> Edit Public "the marker icon next to Public Role Name" -> Location -> checkmark the 2 endpoints "isItRaining" and "whatToDo".

9- Click Save.

10- Restart Server using Ctrl+C in Terminal or CLI then run the command "npm run develop" to run the project again.

11- Using Postman or Browser : make requests to the endpoints as mentioned above:-

    * http://localhost:1337/api/v1/isitraining?lat={lat}&lon={lon}    --replace the latitude and longitude values in with the {lat} and {lon}
    
       - Success Case : returns 200 Ok response and a Weather object of 5 properties like the example below :-
        {
          "lon": "19.2",
          "lat": "19.2",
          "weatherMain": "Clear",
          "weatherDescription": "clear sky",
          "isItRaining": false
        }
        
       - Fail Case : In the CLI or terminal it logs any error thrown if there is an error during the request lifetime and returns 400 Bad Request response and an error          like the example below :-
        {
          "error": {
               "status": 400,
               "message": "Bad Request - Invalid Parameters"
          }
        }
        
        
      ##  ---------------------
    * http://localhost:1337/api/v1/whattodo?lat={lat}&lon={lon}    --replace the latitude and longitude values in with the {lat} and {lon}
    
       - Success Case : returns 200 Ok response and an object of 3 properties like the example below :-
        {
        "recommendedActivity": "Play a game of Monopoly",
        "type": "social",
        "weatherDescription": "clear sky"
        }
        
       - Fail Case : In the CLI or terminal it logs any error thrown if there is an error during the request lifetime and returns 400 Bad Request response and an error          like the example below :-
        {
          "error": {
               "status": 400,
               "message": "Bad Request - Invalid Parameters"
          }
        }
    
