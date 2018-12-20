const express = require("express");
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
const path = require('path');
const request = require('request');


let app = express();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post("/api", (req, res) => {
    let url = "https://api.vk.com/method/" + req.body.method;
    let data = req.body.data;
    request.post({
            url: url,
            form: data
        },
        function (err, httpResponse, body) {
            res.send(body);
        })
});

let server = app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
