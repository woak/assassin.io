// express esrver
var express = require('express');
var assert = require('assert');
var path = require('path');

// Required to use HTTP query or post parameters
var bodyParser = require('body-parser');
// emails
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'bobbysucksgotufts@gmail.com',
    pass: 'b0bbysucksgotufts1'
  }
});
// postgres
// ------------------------postgres database setup------------------------\\
const { Client } = require('pg');
let client;
if (process.env.NODE && ~process.env.NODE.indexOf("heroku")) {
  console.log("INSIDE PROD DB");
  // --- PROD DB --- \\
  client = new Client({
    user: 'rzcbjeqvqllshi',
    host: 'ec2-23-23-92-204.compute-1.amazonaws.com',
    database: 'd9bnbuij1hq6ko',
    password: '21e2d0465b669d6dceae279f1b0fe6e6f8479e569b40338ac813f60156e97d5d',
    port: 5432,
  });
} else {
  console.log("INSIDE DEV DB")
  // --- DEV DB --- \\
  client = new Client({
    user: 'assassin',
    host: 'localhost',
    database: 'assassin',
    password: 'assassin',
    port: 5432,
  });
}





// ---------------- DB SETUP ------------------------- \\

client.connect();

let insertTarget = (assassins, targets) => {
  if (assassins.length === 0) {
    return false;
  } else {
    let currAssassin = assassins.pop();
    let currTarget = targets.pop();
    client.query(
      "INSERT INTO targets VALUES (1, $1, $2)",
      [currAssassin.id, currTarget.id],
      (err, res) => {
        if (err) {
          console.log("ERROR: " + err);
        } else {
          var mailOptions = {
            from: 'bobbysucksgotufts@gmail.com',
            to: currAssassin.email,
            subject: 'NEW TARGET ACQUIRED',
            text: 'your new target is: ' + currTarget.name
          }
          transporter.sendMail(
            mailOptions,
            (error, info) => {
              if (error) {
                console.log(error);
              } else {
                console.log('Email sent: ' +
                  info.response);
              }
            });
          insertTarget(assassins, targets);
        }
      }
    )
  }
}

client.query("CREATE TABLE IF NOT EXISTS assassins (\
  name VARCHAR NOT NULL,\
  password VARCHAR NOT NULL,\
  email VARCHAR NOT NULL,\
  id INT PRIMARY KEY)", (err, res) => {
    if (err || !res) {
      console.log("ERROR: " + err);
    } else {
      client.query("CREATE TABLE IF NOT EXISTS games (\
          game_number INT PRIMARY KEY,\
          admin_id INT NOT NULL)\
        ", (err, res) => {
          if (err || !res) {
            console.log("ERROR: " + err);
          } else {
            client.query("CREATE TABLE IF NOT EXISTS targets (\
              game_id INT NOT NULL,\
              assassin_id INT NOT NULL,\
              target_id INT NOT NULL,\
              primary key (game_id, assassin_id, target_id))", (err, res) => {
                if (err) {
                  console.log("ERROR: " + err);
                } else {
                  // TODO TEDDY
                  // add a target calculator here to run on the v0.1 push for saturday
                  client.query(
                    "SELECT * FROM assassins;",
                    (err, response) => {
                      if (err) {
                        console.log("ERROR: " + err);
                      } else {
                        let assassins = response.rows;
                        let targets = Object.assign([], response.rows);
                        targets.unshift(targets.pop());
                        // TODO : TEDDY - SHOULD ONLY RUN ONCE AT THE START OF THE GAME
                        // insertTarget(assassins, targets);
                        serve();
                      }
                    }
                  )
                  // serve();
                }
              });
          }
        })
    }
  });

// ---------------- WEB APPLICATION SERVER ---------------- \\

let serve = () => {
  var app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.static(path.join(__dirname, '../client/build/')));

  // Allow Cross Origin Resources Sharing for Development
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });

  app.post('/loginCreds', (req, res) => {
    client.query(
      "SELECT password FROM assassins WHERE name = $1",
      [req.body.username],
      (err, response) => {
        if (err) {
          console.log("ERROR: " + err);
          res.send({ "signedUp": false });
        } else if (response.rows.reduce((acc, curr) => curr.password || acc, false)) {
          res.send({ "signedUp": true });
        }
      });
  });

  app.post('/signupUser', (req, res) => {
    client.query(
      "INSERT INTO assassins (name, password, email, id) VALUES (\
      $1, $2, $3, $4)",
      [req.body.username, req.body.password, req.body.email, req.body.pin],
      (err, response) => {
        if (err) {
          console.log("ERROR: " + err);
          res.send({ "signedUp": false });
        } else {
          res.send({ "signedUp": true });
        }
      });
  });

  app.post('/targetKilled', (req, res) => {
    // TODO TEDDY
    // ASSASSIN NAME ISN'T THE PKEY -> MAKE THE ASSASSIN PUT IN THEIR ID ON
    // FRONT END AND USE IT HERE - STOP BEING LAZY YOU SCRUB
    let targetPin = req.body.targetPin;

    let assassinUsername = req.body.assassinUsername;
    let assassinEmail;
    let assassinPin;

    let newTargetPin;
    let newTargetName;
    client.query(
      "SELECT id, email, target_id\
      FROM assassins a JOIN targets t ON (a.id = t.assassin_id)\
      WHERE name = $1",
      [assassinUsername],
      (err, response) => {
        if (err || !response.rows || response.rows[0].target_id != targetPin) {
          res.send({ wasKilled: false });
        } else {
          assassinPin = response.rows[0].id;
          assassinEmail = response.rows[0].email;
          client.query(
            "SELECT target_id FROM targets WHERE assassin_id = $1",
            [targetPin],
            (err, response) => {
              if (err) {
                console.log("ERROR: " + err);
                res.send({ wasKilled: false });
              } else {
                newTargetPin = response.rows[0].target_id;
                client.query(
                  "UPDATE targets SET target_id = $1 WHERE assassin_id = $2",
                  [newTargetPin, assassinPin],
                  (err, response) => {
                    if (err) {
                      console.log("ERROR: " + err);
                      res.send({ wasKilled: false });
                    } else {
                      // TODO TEDDY : ACCOUNT FOR GAME NUMBER
                      client.query(
                        "DELETE FROM targets WHERE assassin_id = $1",
                        [targetPin],
                        (err, response) => {
                          if (err) {
                            console.log("ERROR: " + err);
                            res.send({ wasKilled: false });
                          } else {
                            client.query(
                              "SELECT name FROM assassins WHERE id = $1",
                              [newTargetPin],
                              (err, response) => {
                                if (err) {
                                  console.log("ERROR: " + err);
                                  res.send({ wasKilled: false });
                                } else {
                                  newTargetName = response.rows[0].name;
                                  var mailOptions = {
                                    from: 'bobbysucksgotufts@gmail.com',
                                    to: assassinEmail,
                                    subject: 'NEW TARGET ACQUIRED',
                                    text: 'your new target is: ' + newTargetName
                                  }
                                  transporter.sendMail(
                                    mailOptions,
                                    (error, info) => {
                                      if (error) {
                                        console.log(error);
                                      } else {
                                        console.log('Email sent: ' +
                                          info.response);
                                      }
                                    });
                                }
                              });
                            res.send({ wasKilled: true });
                          }
                        })
                    }
                  }
                )
              }
            }
          )
        }
      });

  });

  app.post("/target", (req, res) => {
    client.query(
      "SELECT name, email\
      FROM assassins\
      WHERE id IN \
        (SELECT target_id\
         FROM assassins a JOIN targets t ON (a.id = t.assassin_id)\
         WHERE a.name = $1)",
      [req.body.username],
      (err, response) => {
        if (err || response.rows.length === 0) {
          console.log("ERROR: " + err);
          res.send({ target: false })
        } else {
          res.send(
            {
              target: {
                name: response.rows[0].name,
                email: response.rows[0].email,
              }
            });
        }
      }
    )
  });

  app.post("/id", (req, res) => {
    client.query(
      "SELECT id\
      FROM assassins\
      WHERE name = $1",
      [req.body.username],
      (err, response) => {
        if (err || response.rows.length === 0) {
          console.log("ERROR: " + err);
          res.send({ id: false })
        } else {
          res.send({ id: response.rows[0].id });
        }
      }
    )
  });

  app.listen(process.env.PORT || 5000, () => {
    console.log('Server running on ' + (process.env.PORT || 5000));
  });
}