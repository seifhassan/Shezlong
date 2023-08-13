const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
require('dotenv').config();

const mongoUrl = process.env.MONGO_URL;
const PORT = process.env.PORT;
mongoose.connect(mongoUrl)
.then(()=>console.log('connected'))
.catch((error)=>console.log(error));

const app = express();

app.use(express.json());
app.use(routes);

app.use('*', (req, res, next) => {
  const error = new Error(
    `${req.ip} tried to access ${req.originalUrl}`,
  );
  error.statusCode = 404;

  return next(error);
});

app.listen(PORT, () => { console.log(`UP : localhost:${PORT}`); });