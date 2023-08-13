const mongoose = require('mongoose');
const Movie = require('./models/moves'); 

mongoose.connect( "mongodb+srv://seiffhassann:9WvKdOOG808Vbl7x@cluster0.oyyxvwz.mongodb.net/", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    const moviesToSeed = [
        {
            title: "The Shawshank Redemption",
            duration: "PT142M",
            actors: ["Tim Robbins", "Morgan Freeman", "Bob Gunton"]
          },
          {
            title: "Inception",
            duration: "PT148M",
            actors: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ellen Page"]
          },
          {
            title: "Pulp Fiction",
            duration: "PT154M",
            actors: ["John Travolta", "Samuel L. Jackson", "Uma Thurman"]
          },
          {
            title: "The Matrix",
            duration: "PT136M",
            actors: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"]
          },
          {
            title: "Forrest Gump",
            duration: "PT142M",
            actors: ["Tom Hanks", "Robin Wright", "Gary Sinise"]
          },
          {
            title: "The Godfather",
            duration: "PT175M",
            actors: ["Marlon Brando", "Al Pacino", "James Caan"]
          },
          {
            title: "The Dark Knight",
            duration: "PT152M",
            actors: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"]
          },
          {
            title: "Fight Club",
            duration: "PT139M",
            actors: ["Brad Pitt", "Edward Norton", "Helena Bonham Carter"]
          },
          {
            title: "Jurassic Park",
            duration: "PT127M",
            actors: ["Sam Neill", "Laura Dern", "Jeff Goldblum"]
          },
      // Add more movie objects...
    ];

    for (const movieData of moviesToSeed) {
      const newMovie = new Movie(movieData);
      await newMovie.save();
    }

    console.log('Seeding completed.');
    mongoose.connection.close();
  })
  .catch(error => {
    console.error('Error:', error);
  });
