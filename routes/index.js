var express = require('express');
var router = express.Router();
var keys = require('../private/gCredential.json');
var googleAuth = require('google-auth-library');
var {google} = require('googleapis')

/* GET home page. */
router.get('/index', function(req, res, next) {
  res.sendStatus(200);
});

router.post('/storeauthcode', function(req, res, next) {
  console.log(req.body.code)
  var oAuth2Client
  try {
    oAuth2Client = new googleAuth.OAuth2Client(
      keys.web.client_id,
      keys.web.client_secret,
      keys.web.redirect_uris[0]
    )
    oAuth2Client.getToken(req.body.code, (err, token, res) => {
      console.log("save %s", token.access_token)
      oAuth2Client.setCredentials(token)
      const oAuth2 = google.oauth2({
        version: 'v2',
        auth: oAuth2Client
      })
      oAuth2.userinfo.get((err, res) => {
        console.log(res.data)
      })
    })
    res.send({
      message: "Sucess"
    })
    return
  } catch (error) {
    console.log(error)
    next(error)
    return
  }
})

module.exports = router;
