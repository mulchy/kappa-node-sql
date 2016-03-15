var router = require('express').Router();
var path = require('path');
var pg = require('pg');
var connectionString = '';
if(process.env.DATABASE_URL != undefined) {
  pg.defaults.ssl = true;
  connectionString = process.env.DATABASE_URL;
} else {
  connectionString = 'postgres://localhost:5432/node-app';
}

router.post('/people', function (req, res) {
  console.log('recieved req body: ', req.body)
  pg.connect(connectionString, function(err, client, done) {
    if (err) {
      console.log('error connecting to DB:', err);
      res.status(500).send(err);
      // sending in a truthy value removes the connection from the pool, rather than returning it.
      done(client);
      return;
    }

    // we have successfully connected, try to query
    var query = client.query('INSERT INTO people (name, address) VALUES ($1, $2)',
    [req.body.name, req.body.address]);
    var result = [];

    // store each row in an array
    query.on('row', function(row) {
      result.push(row);
    });

    // send all the rows we know about
    query.on('end', function() {
      res.send(result);
      done();
    });

    // handle any errors during query
    query.on('error', function(error) {
      console.log('error querying DB:', error);
      res.status(500).send(error);
      done(client);
    });
  });
});

router.get('/people', function(req, res) {
  pg.connect(connectionString, function(err, client, done) {
    if (err) {
      console.log('error connecting to DB:', err);
      res.status(500).send(err);
      done(client);
      return;
    }

    var query = client.query('SELECT * FROM people');
    var result = [];

    query.on('row', function(row) {
      result.push(row);
    });

    query.on('end', function() {
      res.send(result);
      done();
    });

    query.on('error', function(error) {
      console.log('error querying DB:', error);
      res.status(500).send(error);
      done(client);
    });
  });
});

// serve static files and the index page
router.get('/*', function(req, res) {
  var file = req.params[0] || '/views/index.html';
  res.sendFile(path.join(__dirname, '../public', file));
});

// export the router object
module.exports = router;
