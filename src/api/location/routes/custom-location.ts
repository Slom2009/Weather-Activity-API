export default {
    routes: [
        {
            method: 'GET',
            path: '/v1/isItRaining',
            handler: 'api::location.location.isItRaining',
        },
        {
            method: 'GET',
            path: '/v1/whatToDo',
            handler: 'api::location.location.whatToDo',
        }
    ]
}