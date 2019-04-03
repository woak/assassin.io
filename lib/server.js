// express esrver
var express = require('express');
var assert = require('assert');
var path = require('path');

// Required to use HTTP query or post parameters
var bodyParser = require('body-parser');
// postgres
// ------------------------postgres database setup------------------------\\
const { Client } = require('pg')
// const client = new Client({
//   user: 'rzcbjeqvqllshi',
//   host: 'ec2-23-23-92-204.compute-1.amazonaws.com',
//   database: 'd9bnbuij1hq6ko',
//   password: '21e2d0465b669d6dceae279f1b0fe6e6f8479e569b40338ac813f60156e97d5d',
//   port: 5432,
// });

// --- DEV DB --- \\
const client = new Client({
  user: 'assassin',
  host: 'localhost',
  database: 'assassin',
  password: 'assassin',
  port: 5432,
});

// TODO TEDDY

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'bobbysucksgotufts@gmail.com',
    pass: 'b0bbysucksgotufts1'
  }
});

var mailOptions = {
  from: 'bobbysucksgotufts@gmail.com',
  to: 'teddy.laurita@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});

// ----------------------------------------- \\

client.connect(); 

client.query("CREATE TABLE IF NOT EXISTS assassins (\
  name VARCHAR NOT NULL,\
  password VARCHAR NOT NULL,\
  email VARCHAR NOT NULL,\
  id INT PRIMARY KEY)", (err, res) => {
    if (err) {
      console.log(err);
    } else {
      client.query("CREATE TABLE IF NOT EXISTS games (\
          game_number INT PRIMARY KEY,\
          admin_id INT NOT NULL)\
        ", (err, res) => {
          if (err) {
            console.log(err);
          } else {
            client.query("CREATE TABLE IF NOT EXISTS targets (\
              game_id INT NOT NULL,\
              assassin_id INT NOT NULL,\
              target_id INT NOT NULL,\
              primary key (game_id, assassin_id, target_id))", (err, res) => {
                if (err) {
                  console.log(err);
                } else {
                  // TODO TEDDY
                  // add a target calculator here to run on the v0.1 push for saturday
                  serve();
                }
              });
          }
        })
    }
  });


let serve = () => {
  var app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.static(path.join(__dirname, '../client/build/')));

  // Allow Cross Origin Resources Sharing for Development
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });

  app.post('/loginCreds', (req, res) => {
    // TODO TEDDY
    console.log(req.body.username)
    client.query(
      "SELECT password FROM assassins WHERE name = $1",
      [req.body.username],
      (err, response) => {
        if (err) {
          // TODO TEDDY
          console.log("INSIDE ERROR")
          console.log(err);
          res.send({"signedUp": false});
        } else if (response.rows.reduce((acc, curr) => curr.password || acc, false)) {
          res.send({"signedUp": true});
        }
      });
  });

  app.post('/signupUser', (req, res) => {
    // TODO TEDDY
    console.log(req.body)
    client.query(
      "INSERT INTO assassins (name, password, email, id) VALUES (\
      $1, $2, $3, $4)", 
      [req.body.username, req.body.password, req.body.email, req.body.pin],
      (err, response) => {
        if (err) {
          console.log(err);
          res.send({"signedUp": false});
        } else {
          res.send({"signedUp": true});
        }
      });
  });

  app.post('/targetKilled', (req, res) => {
    // TODO TEDDY
    // ASSASSIN NAME ISN'T THE PKEY -> MAKE THE ASSASSIN PUT IN THEIR ID ON
    // FRONT END AND USE IT HERE - STOP BEING LAZY YOU SCRUB
    // TODO : ACCOUNT FOR THE FACT LEADING ZEROS ARE DROPPED WHEN ENTERED IN POSTGRES
    let targetPin = req.body.targetPin;

    let assassinUsername = req.body.assassinUsername;
    let assassinEmail;
    let assassinPin;

    let newTargetPin;
    let newTargetName;
    client.query(
      "SELECT id, email, name FROM assassins WHERE name = $1", 
      [assassinUsername],
      (err, response) => {
        if (err) {
          console.log(err);
          res.send({wasKilled: false});
        } else {
          // TODO TEDDY
          console.log("ASSASSIN ID:")
          console.dir(response.rows)
          assassinPin = response.rows[0].id;
          assassinEmail = response.rows[0].email;
          client.query(
            "SELECT target_id FROM targets WHERE assassin_id = $1",
            [targetPin],
            (err, response) => {
              if (err) {
                console.log(err);
                res.send({wasKilled: false});
              } else {
                newTargetPin = response.rows[0].target_id;
                client.query(
                  "UPDATE targets SET target_id = $1 WHERE assassin_id = $2",
                  [newTargetPin, assassinPin],
                  (err, response) => {
                    if (err) {
                      console.log(err);
                      res.send({wasKilled: false});
                    } else {
                      client.query(
                        "SELECT name FROM assassins WHERE id = $1",
                        [newTargetPin],
                        (err, response) => {
                          if (err) {
                            console.log(err);
                            res.send({wasKilled: false});
                          } else {
                            newTargetName = response.rows[0].name;
                            var mailOptions = {
                              from: 'bobbysucksgotufts@gmail.com',
                              to: assassinEmail,
                              subject: 'NEW TARGET ACQUIRED',
                              text: 'your new target is: ' + newTargetName
                            }
                            transporter.sendMail(mailOptions, function(error, info){
                              if (error) {
                                console.log(error);
                              } else {
                                console.log('Email sent: ' + info.response);
                              }
                            });
                          }
                        });
                        res.send({wasKilled: true});
                      }
                  }
                )
              }
            }
          )
        }
      });

  });

  app.listen(process.env.PORT || 5000, () => {
    console.log('Server running on ' + (process.env.PORT || 5000));
  });
}