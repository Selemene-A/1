const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');
const passport = require('passport');
const errorMiddleware = require('./middleware/error');
const config = require('./config');

// import routes
const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/Cart');

// initialize the app
const app = express();

// middleware
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
require('./config/passport')(passport);

// static folder
app.use(config.root, express.static(path.join(__dirname, 'public')));

// set routes
app.use(`${config.apiPath}/users`, userRoutes);
app.use(`${config.apiPath}/products`, productRoutes);
app.use(`${config.apiPath}/carts`, cartRoutes);

// set error handling middleware
app.use(errorMiddleware);

app.get('*', (req, res) => {
  res.sendFile(path.resolve('public/index.html'));
});

module.exports = app;
