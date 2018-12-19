const express = require("express");

let app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static('public'));

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}\\index.html`);
});

let server = app.listen(3000, () => {
  console.log(`server running at port http://localhost/${server.address().port}`)
});