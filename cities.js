// List of cities with their coordinates and search radius
module.exports = [
    {
        name: "London, ON",
        coordinates: {
            lat: 42.988148,
            lng: -81.246092,
            distance: 100  // distance in km
        }
    },
    {
        name: "St. Thomas, ON",
        coordinates: {
            lat: 42.779441,  // Updated coordinates
            lng: -81.182274, // Updated coordinates
            distance: 100
        }
    },
    {
        name: "Ottawa, ON",
        coordinates: {
            lat: 45.421532,
            lng: -75.697189,
            distance: 100
        }
    }
    // You can add more cities by following the same format:
    // {
    //     name: "City Name",
    //     coordinates: {
    //         lat: latitude,
    //         lng: longitude,
    //         distance: searchRadiusInKm
    //     }
    // }
]; 