const instanceId = 'v1:us1:f9fd21ab-6a42-4df0-b895-b6db026c0616';
const seceret = '4b277e4f-ccc9-488a-b3f2-b128d7293c34:w1i8w/8tcvnX+rPJr8YSPxkPRfFXSFmLtaZ5fiG4h0I=';

const express = require('express')
const bodyParser = require('body-parser')
const chatkitServer = require('@pusher/chatkit-server');
const request = require('request');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }))

const chatkit = new chatkitServer.default({
  instanceLocator: instanceId,
  key: seceret,
});

app.post('/user', (req, res) => {
  console.log(req.query)
  chatkit.createUser({
    id: req.query.id,
    name: req.query.name,
  })
    .then((done) => {
      res.send(done)
    }).catch((err) => {
      res.send(err)
    });
})
app.post('/auth', (req, res) => {
  console.log(req.query)
  const authData = chatkit.authenticate({
    userId: req.query.user_id[1],
  });

  res.status(authData.status)
     .set(authData.headers)
     .send(authData.body);
})

app.listen(3002, () => console.log('Example app listening on port 3002!'))