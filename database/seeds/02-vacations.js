exports.seed = function(knex, Promise) {
    return knex('vacations').insert([
        {location: "Hawai", title: "Surfing with Buddies", dates: "July 13 - July 15", description: "Hang out and surf with friends"},
        {location: "Washington DC", title: "Explore the Capital", dates: "October 5 - October 10", description: "Having fun in the capital with family"},
        {location: "Florida", title: "Swimming!!", dates: "March 3 - March 10", description: "Hanging out the beach and relaxing!"},
    ]);
};