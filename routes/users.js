var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

/* GET users listing. */
router.get('/', function(req, res, next) {
  const sql="SELECT * FROM Users";
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error("Unable to retrieve users list");
      console.log(err);
      res.render('error');
    }
    res.render('users', {users: rows});
  })
});

router.post('/update', function(req, res, next) {
  let data = req.body;
  const sql="UPDATE USERS SET name=?, surname =?, birthdate=?, profil=? WHERE id=?";
  db.run(sql, [data.name, data.surname, data.birthdate, data.profil, data.id], (err, rows) => {
    if (err) {
      console.error("Unable to update user");
      console.log(err);
      res.render('error');
    }
    res.redirect(req.get('referer'));
  })
}); 

router.post('/add', function(req, res, next) {
  let data = req.body;
  const sql="INSERT INTO USERS(NAME, SURNAME, BIRTHDATE, PROFIL) VALUES (?, ?, ?, ?)";
  db.run(sql, [data.name, data.surname, data.birthdate, data.profil], (err, rows) => {
    if (err) {
      console.error("Unable to create user");
      console.log(err);
      res.render('error');
    }
    //res.redirect(req.get('referer'));
    res.render('users');
  })
}); 

router.get('/delete', function(req, res, next) {
  const sql="DELETE FROM USERS WHERE id=?";
  console.log('DELETTTTTTTTTTTTTTTTTTTTTTTTTTTTTE');
  db.run(sql, [req.query.id], (err, rows) => {
    if (err) {
      console.error("Unable to delete user");
      console.log(err);
      res.render('error');
    }
    res.redirect(req.get('referer'));
  })
});

router.get('/:id', function(req, res, next) {
  const sql="SELECT * FROM Users WHERE ID=?";
  db.all(sql, [req.params.id], (err, rows) => {
    if (err) {
      console.error("Unable to retrieve users list");
      console.log(err);
      res.render('error');
    }
    res.render('users', {users: rows});
  })
});

module.exports = router;
