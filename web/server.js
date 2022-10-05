/*

    Reference: https://codeshack.io/basic-login-system-nodejs-express-mysql/

*/
const QrcodeDecoder = require("qrcode-decoder");
var mysql = require("mysql");
var express = require("express");
var session = require("express-session");
var bodyParser = require("body-parser");
var path = require("path");
const { query } = require("express");
const QRCode = require("qrcode");
const QRReader = require("qrcode-reader");
const randomstring = require("randomstring");

const fileUpload = require("express-fileupload");
var Jimp = require("jimp");
const jsQR = require("jsqr");
const fs = require("fs");

var connection = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: "root",
  password: "jettbrim",
  database: "valo",
});

/*
var connection = mysql.createConnection({
  host: "localhost",
  user: "jett",
  password: "jettbrim",
  database: "valo",
});
*/
connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

var app = express();
app.use(
  session({
    secret: require("crypto").randomBytes(64).toString("hex"),
    resave: true,
    saveUninitialized: true,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json(), fileUpload());

app.get("/agents", function async(request, response) {
  var query = `SELECT * FROM Agents LIMIT 6;`;
  connection.query(query, async function (error, result, fields) {
    if (error) {
      response.status(500).send("Nahhh");
    } else if (result.length == 0) {
      response.status(500).send("No records");
    } else {
      var rows = JSON.parse(JSON.stringify(result));
      var responseData = [];

      rows = await Promise.all(
        rows.map(async (row) => {
          let data = JSON.stringify({
            displayName: row.displayName,
            uuid: row.uuid,
            characterTag: row.characterTag,
          });
          const img = await QRCode.toDataURL(data);

          let agent = {
            displayName: row.displayName,
            uuid: row.uuid,
            characterTag: row.characterTag,
            displayIcon: row.displayIcon,
            qr: img,
          };

          return agent;
        })
      );

      response.send(rows);
    }
  });
});

app.post("/search", function (request, response) {
  var displayName = request.body.displayName;
  displayName = mysql.escape(displayName);
  var query = `SELECT * FROM Agents where displayName = ${displayName};`;
  connection.query(query, async function (error, result, fields) {
    if (error) {
      response.status(200).send([]);
    } else if (result.length == 0) {
      response.status(200).send([]);
    } else {
      var rows = JSON.parse(JSON.stringify(result));
      rows = await Promise.all(
        rows.map(async (row) => {
          let data = JSON.stringify({
            displayName: row.displayName,
            uuid: row.uuid,
            characterTag: row.characterTag,
          });
          const img = await QRCode.toDataURL(data);

          let agent = {
            displayName: row.displayName,
            uuid: row.uuid,
            characterTag: row.characterTag,
            displayIcon: row.displayIcon,
            qr: img,
          };

          return agent;
        })
      );

      response.send(rows);
    }
  });
});

app.post("/qr", async function (req, response) {
  try {
    const qrImage = req.files.file;
    const filename = randomstring.generate(10);
    const fileupload = __dirname + "/qr/" + filename + ".png";
    qrImage.mv(fileupload, async function (err) {
      if (err) return response.status(500).send("Internal Server Error");
      try {
        const img = await Jimp.read(fs.readFileSync(fileupload));
        const qr = new QRReader();
        const value = await new Promise((resolve, reject) => {
          qr.callback = (err, v) => (err != null ? reject(err) : resolve(v));
          qr.decode(img.bitmap);
        });

        const data = JSON.parse(value.result);
        const uuid = data.uuid;
        var query = `SELECT * FROM Agents where uuid like '${uuid}';`;
        console.log(query);
        connection.query(query, async function (error, result, fields) {
          if (error) {
            console.log(error);
            response.status(200).send([]);
          } else if (result.length == 0) {
            response.status(200).send([]);
          } else {
            var rows = JSON.parse(JSON.stringify(result));
            var responseData = [];

            rows = await Promise.all(
              rows.map(async (row) => {
                let data = JSON.stringify({
                  displayName: row.displayName,
                  uuid: row.uuid,
                  characterTag: row.characterTag,
                });
                const img = await QRCode.toDataURL(data);

                let agent = {
                  displayName: row.displayName,
                  uuid: row.uuid,
                  characterTag: row.characterTag,
                  displayIcon: row.displayIcon,
                  qr: img,
                };

                return agent;
              })
            );

            response.send(rows);
          }
        });
      } catch (e) {
        console.log(e);
        response.status(200).send([]);
      }
    });
  } catch (e) {
    response.status(200).send([]);
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

app.listen(5000);
