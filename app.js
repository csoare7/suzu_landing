var express = require('express');
var app     = express();
var path    = require("path");
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');

// set static directories
app.use(express.static(path.join(__dirname, '/')));

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));


app.get('/',function(req, res){
  res.sendfile(path.join(__dirname+'/index.html'));
});

app.post('/', function(req, res) {
  var email = req.body.email;

  if (!email) {
    console.log("No email present.");
  } else {
    sendMail(email);
  }
  res.sendfile(path.join(__dirname+'/index.html'));

});

var port = process.env.PORT || 9000;
app.listen(port);
console.log('Listening on port ',  port);


var sendMail = function (email) {

  var transporter, message;

  transporter = nodemailer.createTransport({
    service: 'Mailgun',
    auth: {
      user: "postmaster@suzu.io", // postmaster@sandbox[base64 string].mailgain.org
      pass: "" // You set this.
    }
  });
  message = {
    from: 'postmaster@suzu.io',
    to: 'founders@suzu.io',
    subject: '[Suzu Landing] Email Signup:' + email
  };
  transporter.sendMail(message, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Sent: ' + info.response);
    }
  });
};
