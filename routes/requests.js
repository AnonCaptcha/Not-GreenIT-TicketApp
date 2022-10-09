var express = require('express');
const { all } = require('.');
var router = express.Router();
const fs = require('fs');
const path = require('path');
const { count } = require('console');

/* GET requests listing. */
router.get('/', function(req, res, next) {
  const sql="SELECT * FROM Requests LIMIT 10 OFFSET ?";
  const sqlCount="SELECT COUNT(*) AS COUNT FROM Requests";
  let pageNumber = (!req.query.page)?0:req.query.page;
  db.all(sql, [pageNumber*10], (err, rows) => {
    if (err) {
      console.error("Unable to retrieve requests list");
      console.error(err.message);
      res.render('error');
    }
    db.all(sqlCount, [], (err, rows2) => {
      if (err) {
        console.error("Unable to retrieve requests list");
        console.error(err.message);
        res.render('error');
      }
      let prevPage = Math.max(0, parseInt(pageNumber)-1);
      let nextPage = (pageNumber==Math.floor(rows2[0].COUNT/10))?Math.floor(rows2[0].COUNT/10):parseInt(pageNumber)+1;

      res.render('requests', {requests: rows, totRequest: rows2[0].COUNT, currentPage: pageNumber, prevPage: prevPage, nextPage: nextPage});
    })
  })
});

router.post('/update', function(req, res, next) {
  let data = req.body;
  const sql="UPDATE REQUESTS SET user_id=?, subject=?, description =?, category = ?, priority = ? WHERE id=?";
  db.run(sql, [data.userId, data.subject, data.description, data.category, data.priority, data.id], (err, rows) => {
    if (err) {
      console.error("Unable to update request");
      console.log(err);
      res.render('error');
    }
    res.redirect(req.get('referer'));
  })
}); 

router.post('/answer', function(req, res, next) {
  let data = req.body;
  const sql="UPDATE REQUESTS SET status = ?, comment = ? WHERE id=?";
  db.run(sql, [data.status, data.comment, data.id], (err, rows) => {
    if (err) {
      console.error("Unable to answer request");
      console.log(err);
      res.render('error');
    }
    res.redirect(req.get('referer'));
  })
}); 

router.post('/add', function(req, res, next) {
  let data = req.body;
  const sql="INSERT INTO REQUESTS(USER_ID, SUBJECT, DESCRIPTION, CATEGORY, PRIORITY, STATUS) VALUES (?, ?, ?, ?, ?, 'NEW')";
  db.run(sql, [data.userId, data.subject, data.description, data.category, data.priority], (err, rows) => {
    if (err) {
      console.error("Unable to create request");
      console.log(err);
      res.render('error');
    }
    /* Redirecte to referer to keep id filtering if exists */
    res.redirect(req.get('referer'));
  })
}); 

router.get('/delete', function(req, res, next) {
  const sql="DELETE FROM REQUESTS WHERE id=?";
  db.run(sql, [req.query.id], (err, rows) => {
    if (err) {
      console.error("Unable to delete request");
      console.log(err);
      res.render('error');
    }
    res.redirect(req.get('referer'));
  })
})

router.get('/extract', function(req, res, next) {
  const sql="SELECT * FROM Requests";
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error("Unable to retrieve requests list");
      console.error(err.message);
      res.render('error');
    }

    for(i=0;i<count(rows);i++) {
      console.log(rows[i]);
    }
    
    filename = 'extract'+Date.now()+'.txt';
    data = JSON.stringify(rows);

    fs.writeFileSync(filename,data, function(err) {
        if (err) throw err;
    });

    res.sendFile(
      path.join(__dirname+'/../',filename), 
      {headers: {'Content-type': 'application/octet-stream', 'Content-Disposition' : 'attachment; filename="'+filename+'"'}}
    );
  })
});


router.get('/:id', function(req, res, next) {
  const sql="SELECT * FROM Requests WHERE USER_ID=? LIMIT 10 OFFSET ?";
  const sqlCount="SELECT COUNT(*) AS COUNT FROM Requests WHERE USER_ID=?";
  let pageNumber = (!req.query.page)?0:req.query.page;
  db.all(sql, [req.params.id, pageNumber*10], (err, rows) => {
    if (err) {
      console.error("Unable to retrieve requests list");
      console.error(err.message);
      res.render('error');
    }
    db.all(sqlCount, [req.params.id], (err, rows2) => {
      if (err) {
        console.error("Unable to retrieve requests list");
        console.error(err.message);
        res.render('error');
      }
      let prevPage = (pageNumber==0)?0:parseInt(pageNumber)-1;
      let nextPage = (pageNumber==Math.floor(rows2[0].COUNT/10))?Math.floor(rows2[0].COUNT/10):parseInt(pageNumber)+1;

      res.render('requests', {requests: rows, totRequest: rows2[0].COUNT, currentPage: pageNumber, prevPage: prevPage, nextPage: nextPage});
    })
  })
});

module.exports = router;
