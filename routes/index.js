var express = require('express');
var router = express.Router();

var root = "http://localhost:3000/";

function genAuthURL(){
	const redirectTo = root + "auth.html";
	const clientId = "LCCWfC7W44MuP97wD1xj4HSLt5oaeEih";
	return "https://demo-ap08-prod.apigee.net/oauth/authorize?redirect_uri="+redirectTo + "&client_id=" + clientId+"&response_type=token";
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect(genAuthURL());
});

module.exports = router;
