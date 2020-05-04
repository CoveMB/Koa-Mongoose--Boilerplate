const mongoose = require('mongoose');
const logger = require('./logger');
const {
  dbHost, dbPort, dbUser, dbPassword
} = require('./variables');

const connect = (host, port, user, password) => {

  const connectionUrl = `mongodb://${user}:${password}@${host}:${port}`;

  return async() => {

    try {

      await mongoose.connect(connectionUrl, {
        useNewUrlParser   : true,
        useCreateIndex    : true,
        useUnifiedTopology: true,
        useFindAndModify  : false
      });

    } catch (e) {

      logger.error('Could not connect to the db: ', e);

    }

  };

};

const connectDB = connect(dbHost, dbPort, dbUser, dbPassword);

module.exports = connectDB;
