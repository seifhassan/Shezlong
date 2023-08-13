const mongoose = require('mongoose');
const ratingSchema = new mongoose.Schema({
  userId: Number,
  ratingPercent: Number
});

const movieSchema = new mongoose.Schema({
  title: String,
  duration: String,
  actors: [String],
  ratings:[ratingSchema],
  favorites: [Number],
  watchlist: [Number]
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
