var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/actors', function (req, res) {
  req.pool.getConnection(function (err, connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    var query = "SELECT first_name, last_name FROM actor";
    connection.query(query, function (err, rows, fields) {
      connection.release();
      if (err) {
        res.sendStatus(500);
        return;
      }
      res.json(rows);
    });
  });
});

router.post('/addactor', function (req, res) {
  if (req.body.hasOwnProperty("firstName") && req.body.hasOwnProperty("lastName")) {
    var first = req.body.firstName;
    var last = req.body.lastName;
    req.pool.getConnection(function (err, connection) {
      if (err) {
        res.sendStatus(500);
        return;
      }
      var query = "INSERT INTO actor (first_name, last_name) VALUES (?, ?);";
      connection.query(query, [first, last], function (err, rows, fields) {
        connection.release();
        if (err) {
          res.sendStatus(500);
          return;
        }
      });
    });
  }
  res.send();
});

module.exports = router;
