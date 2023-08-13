const jwt = require('jsonwebtoken');
const User = require('../models/user');
const movieModule = require('../models/movies');
const {getTopFavouriteMoviesAmongFriends,getTopTreeMoviesAndOrderThemAlphabetically } =require("./services/userService")


const register = async (email) => {

  if(!email)  throw new Error("required Id")
  const userId = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;
 
  const user = await User.create({email:email,userId:userId});
  
  if (!user)  throw new Error('Register failed ');
  return {
    user,
  };
};


const like = async ( id, targerUserId ) => {

  const user = await User.findOne({ _id:id }).exec();
  
  if(user.userId == targerUserId) throw new Error('you can not like yourself');

  if (!user) {
    throw new Error('id not valid ');
  }
  const targerUser=  await User.findOne({ userId : parseInt(targerUserId) }).exec();
 
  if (!targerUser)  throw new Error('no user with this id');
  
 
  if(user.friends.includes(parseInt(targerUserId))) throw new Error('you liked this user before');
  user.friends.push(targerUserId);
  user.save();

  return true;
};
const addToFavourite = async (userId, movieId ) => {

  const user = await User.findOne({ userId:userId }).exec();
  if (!user) {
    throw new Error('id not valid ');
  }
  const movie=  await movieModule.findOne({ _id : movieId }).exec();

  if (!movie)  throw new Error('invalid movieId');

  if(movie.favorites.includes(parseInt(userId))) throw new Error('cant add it again');
  movie.favorites.push(userId);
  movie.save();

  return true;
};


const rate = async ( userId, movieId ,rating) => {

  const user = await User.findOne({ userId:userId }).exec();
  if (!user) {
    throw new Error('id not valid ');
  }

  const movie=  await movieModule.findOne({ _id : movieId }).exec();
 
  if (!movie)  throw new Error('invalid movieId');

  movie.ratings = movie.ratings.filter(rating => rating.userId !== parseInt(userId));
  movie.ratings.push({ratingPercent:rating, userId:userId})
  movie.save();

  return true;
};
const topFavouriteMovies= async(userId) => {
  const user = await User.findOne({_id: userId }).exec();
  if (!user) {
    throw new Error('userId not valid ');
  }
   const topMovies = await getTopFavouriteMoviesAmongFriends(user);
  const topTreeMovies =  getTopTreeMoviesAndOrderThemAlphabetically(topMovies);
    return {
      topTreeMovies,
    };
}


const getAllUsers = () => User.find().select({password:0  });




module.exports = {
  register,
  getAllUsers,
  like,
  rate,
  addToFavourite,
  topFavouriteMovies
};
