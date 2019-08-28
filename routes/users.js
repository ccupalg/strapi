var express = require('express');
var router = express.Router();
var con = require('./dbConfig');
var mysql = require('mysql');

/* GET user_details listing. */
router.get('/', function(req, res, next) {
  if(req.query.per_page && req.query.page) {
    var query_to_send = 'SELECT * FROM user_details order by id DESC LIMIT '+req.query.per_page+' OFFSET '+(req.query.per_page * (req.query.page-1));
  }else {
    var query_to_send = 'SELECT * FROM user_details order by id DESC';
  }
  con.query(query_to_send, function (err, result) {
    if (err) throw err;
    // console.log("Result: " + JSON.stringify(result));
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(result, null, 4));
  });
});

/* GET user_details details. */
router.get('/:id', function(req, res, next) {
  con.query('SELECT * FROM user_details WHERE id='+req.params.id, function (err, result) {
    if (err) throw err;
    // console.log("Result: " + JSON.stringify(result));
    res.setHeader('Content-Type', 'application/json');
    res.send(result);
  });
});

/* POST user_details new. */
router.post('/', function(req, res, next) {
  con.query("INSERT INTO user_details (CustomerId, Name, Email_Id, Mobile_No, From, To, CarType, Cars, Passengers, Message, Book_Date, Date, Status, AadharCard, VoterCard, address, city, state, country, pincode, intsd_driver_id) VALUES ('" + req.body.CustomerId + "', '" + req.body.Name + "', '" + req.body.Email_Id + "', '" + req.body.Mobile_No + "', '" + req.body.From + "', '" + req.body.To + "', '" + req.body.CarType + "', '" + req.body.Cars + "', '" + req.body.Passengers + "', '" + req.body.Message + "', '" + req.body.Book_Date + "', '" + req.body.Date + "', '" + req.body.Status + "', '" + req.body.AadharCard + "', '" + req.body.VoterCard + "', '" + req.body.address + "', '" + req.body.city + "', '" + req.body.state + "', '" + req.body.country + "', '" + req.body.pincode + "', '" + req.body.intsd_driver_id + "')", function (err, result) {
    if (err) throw err;
    con.query('SELECT * FROM user_details where id='+result.insertId, function (err, result) {
      if (err) throw err;
      // console.log("Result: " + JSON.stringify(result));
      res.setHeader('Content-Type', 'application/json');
      res.send(result);
    });
  });
});

/* PUT user_details update. */
router.put('/:id', function(req, res, next) {
  
  // for (var itemsFromBodyIndex in req.body){
  //   if (req.body.hasOwnProperty(itemsFromBodyIndex)) {
  //      console.log('shishu: ' + req.body[itemsFromBodyIndex]);
  //   }
  // }

  var setValCond = [];

  if(req.body.CustomerId) {
    setValCond.push("CustomerId='" + req.body.CustomerId + "'");
  }

  if(req.body.Name) {
    setValCond.push("Name='" + req.body.Name + "'");
  }

  if(req.body.Email_Id) {
    setValCond.push("Email_Id='" + req.body.Email_Id + "'");
  }

  if(req.body.Mobile_No) {
    setValCond.push("Mobile_No='" + req.body.Mobile_No + "'");
  }

  if(req.body.From) {
    setValCond.push("From='" + req.body.From + "'");
  }

  if(req.body.To) {
    setValCond.push("To='" + req.body.To + "'");
  }

  if(req.body.CarType) {
    setValCond.push("CarType='" + req.body.CarType + "'");
  }

  if(req.body.Cars) {
    setValCond.push("Cars='" + req.body.Cars + "'");
  }

  if(req.body.Passengers) {
    setValCond.push("Passengers='" + req.body.Passengers + "'");
  }

  if(req.body.Message) {
    setValCond.push("Message='" + req.body.Message + "'");
  }

  if(req.body.Book_Date) {
    setValCond.push("Book_Date='" + req.body.Book_Date + "'");
  }
  
  if(req.body.Date) {
    setValCond.push("Date='" + req.body.Date + "'");
  }

  if(req.body.Status) {
    setValCond.push("Status='" + req.body.Status + "'");
  }else{
    setValCond.push("Status= null");
  }

  if(req.body.AadharCard) {
    setValCond.push("AadharCard='" + req.body.AadharCard + "'");
  }

  if(req.body.VoterCard) {
    setValCond.push("VoterCard='" + req.body.VoterCard + "'");
  }

  if(req.body.address) {
    setValCond.push("address='" + req.body.address + "'");
  }

  if(req.body.city) {
    setValCond.push("city='" + req.body.city + "'");
  }

  if(req.body.state) {
    setValCond.push("state='" + req.body.state + "'");
  }

  if(req.body.country) {
    setValCond.push("country='" + req.body.country + "'");
  }

  if(req.body.pincode) {
    setValCond.push("pincode='" + req.body.pincode + "'");
  }

  if(req.body.intsd_driver_id) {
    setValCond.push("intsd_driver_id='" + req.body.intsd_driver_id + "'");
  }

  if(setValCond.length > 0) {
    con.query("UPDATE user_details SET "+setValCond.join()+" WHERE id='" + req.params.id + "' ", function (err, result) {
      if (err) throw err;
      con.query('SELECT * FROM user_details where id='+req.params.id, function (err, result) {
        if (err) throw err;
        // console.log("Result: " + JSON.stringify(result));
        res.setHeader('Content-Type', 'application/json');
        res.send(result);
      });
    });
  }else {
    res.send({error: "we need at least one parameter!"});
  }
});

/* PUT user_details update. */
router.delete('/:id', function(req, res, next) {
  con.query("DELETE FROM user_details WHERE id='" + req.params.id + "' ", function (err, result) {
    if (err) throw err;
    con.query('SELECT * FROM user_details where id='+req.params.id, function (err, result) {
      if (err) throw err;
      // console.log("Result: " + JSON.stringify(result));
      res.setHeader('Content-Type', 'application/json');
      res.send(result);
    });

  });
});

module.exports = router;