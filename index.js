const express = require("express");
const PORT = process.env.PORT || 5000;
const path = require('path');

let app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static('public'));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

let server = app.listen(PORT, () => console.log(`Listening on ${ PORT }`));