const
  path = require('path'),
  config = require(path.resolve('server/config')),
  express = require('express'),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser');

// Init mongoose and database connection
mongoose.Promise = Promise;
mongoose.connect(config.db.uri, {useMongoClient: true});

let db = mongoose.connection;
db.on('error', console.error.bind(console, "Error connecting to database: "));

db.once('open', () => {

  // Load mongoose models
  require('require-all')(path.resolve('server/models'));

  // Init express app
  var app = express();
  app.locals = require(path.resolve('server/config'));
  app.use(bodyParser.urlencoded({extended: false}));

  // Load routes
  require(path.resolve('server/routes'))(app);

  // Error handling
  app.use(function (err, req, res, next) {
    if (!err)
      return next();

    console.error(err.stack);
    res.status(500).send('Internal server error');
  });

  // Start express app
  app.listen(app.locals.port, app.locals.port, () => {
    console.log('----------------------------------');
    console.log(app.locals.app.title);
    console.log();
    console.log('Environment:  ' + app.locals.env);
    console.log('Server:       ' + 'http://' + app.locals.host + ':' + app.locals.port);
    console.log('Database:     ' + app.locals.db.uri);
    console.log('Version:      ' + app.locals.app.version);
    console.log('----------------------------------');
  });
});
