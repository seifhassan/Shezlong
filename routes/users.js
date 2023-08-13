const express = require('express');
const { usersController } = require('../controllers');
const { asycnWrapper } = require('../lib');

const router = express.Router();

// Regiser User
router.post('/', async (req, res, next) => {
  const {
    body:
     {
      email
     },
  } = req;
  const user =await usersController.register(email);
  const [error, data] = await asycnWrapper(user.user);
  if (error) return next(error);
  return res.status(200).json(data);
});

router.get('/', async (req, res, next) => {
  const users = usersController.getAllUsers();
  const [error, data] = await asycnWrapper(users);
  if (error) return next(error);
  return res.status(200).json(data);
});
router.post('/like/:id/:targerUserId', async (req, res, next) => {
  const {
    params:
     {
      id, targerUserId
     },
  } = req;
  const user = usersController.like(
  
      id, targerUserId
    
  );
  const [error, data] = await asycnWrapper(user);
  if (error) return next(error);
  return res.status(200).send("liked successfully");
});
router.post('/rating/:id/:movieId', async (req, res, next) => {
  const {
    params:
     {
      id, movieId
     },
     body: {
      rating
     },
  } = req;
  const user = usersController.rate(
  
      id, movieId ,rating
    
  );
  const [error, data] = await asycnWrapper(user);
  if (error) return next(error);
  return res.status(200).send("rated successfully");
});
router.post('/addToFavourite/:id/:movieId', async (req, res, next) => {
  const {
    params:
     {
      id, movieId
     },
   
  } = req;
  const user = usersController.addToFavourite(
  
      id, movieId 
    
  );
  const [error, data] = await asycnWrapper(user);
  if (error) return next(error);
  return res.status(200).send("added to favourite successfully");
});
router.get('/topFavouriteMovies/:userId', async (req, res, next) => {
  const {
    params:
     {
      userId
     },
   
  } = req;
  const movie =await usersController.topFavouriteMovies(
  
    userId 
    
  );
  //console.log(movie);
  const [error, data] = await asycnWrapper(movie);
  if (error) return next(error);
  return res.status(200).send(data);
});

module.exports = router;
