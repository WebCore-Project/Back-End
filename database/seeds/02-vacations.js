exports.seed = function(knex, Promise) {
    return knex('vacations').insert([
        {id: 1, location: "Hawai", title: "Surfing with Buddies", dates: "July 13 - July 15", description: "Hang out and surf with friends"},
        {id: 2, location: "Washington DC", title: "Explore the Capital", dates: "October 5 - October 10", description: "Having fun in the capital with family"},
        {id: 3, location: "Florida", title: "Swimming!!", dates: "March 3 - March 10", description: "Hanging out the beach and relaxing!"},
    ]);
};