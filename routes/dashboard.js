var express = require('express');
var router = express.Router();

/* GET stats. */
router.get('/', function(req, res, next) {
    const sql='SELECT (SELECT COUNT(*) FROM Requests) AS COUNTREQ, \
                    (SELECT COUNT(*) FROM REQUESTS WHERE PRIORITY = "HIGH") AS COUNTREQHIGH, \
                    (SELECT COUNT(*) FROM REQUESTS WHERE PRIORITY = "MEDIUM") AS COUNTREQMEDIUM, \
                    (SELECT COUNT(*) FROM REQUESTS WHERE PRIORITY = "LOW") AS COUNTREQLOW, \
                    (SELECT COUNT(*) FROM USERS) AS COUNTUSER, \
                    (SELECT COUNT(*) FROM USERS WHERE PROFIL = "ADMIN") AS COUNTUSERADMIN, \
                    (SELECT COUNT(*) FROM USERS WHERE PROFIL = "USER") AS COUNTUSERUSER';
    db.get(sql, [], (err, rows) => {
      if (err) {
        console.error("Unable to retrieve statistics");
        console.error(err.message);
        res.render('error');
      }
        res.render('dashboard', {
            totRequest: rows.COUNTREQ, 
            totHigh: rows.COUNTREQHIGH, 
            totMedium: rows.COUNTREQMEDIUM, 
            totLow: rows.COUNTREQLOW,  
            totUsers: rows.COUNTUSER, 
            totAdmin: rows.COUNTUSERADMIN, 
            totUser: rows.COUNTUSERUSER
        });
      })
  });

module.exports = router;
