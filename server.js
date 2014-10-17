var express = require('express');
var session = require('express-session');
var passport = require('passport');
var GithubStrategy = require('passport-github').Strategy;
var GitHubApi = require('github');
var port = 8888;
var app = express();

app.use(session({ secret: 'my-secret' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/Public'));

passport.use(new GithubStrategy({
	clientID: '4b6a200f699e349c74d1',
	clientSecret: 'a208b54f8dc9d5ab73777ba1d1e89a47382d0555',
	callbackURL: 'http://localhost:8888/auth/github/callback'
}, function (token, refreshToken, profile, done) {
		console.log('the profile is ' + profile);
		return done(null, profile);
}));

var github = new GitHubApi({
	version: "3.0.0"
});

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

app.get('/auth/github', passport.authenticate('github'));
app.get('/auth/github/callback', passport.authenticate('github', {
	failureRedirect: '/auth/github', 
	successRedirect: '/home'
}), function (req, res) {
	console.log(req.session);
});

github.user.getFollowingFromUser({
    user: "ZGorringe"
}, function(err, res) {
    console.log(JSON.stringify(res));
});

app.get('/home', function (req, res) {
	if(req.user){
		res.status(200).send(JSON.stringify(req.user));	
	} else {
		res.status(401).send("You must Login to proceed");
	}
	
})

app.listen(port, function() {
	console.log('Listening on port ' + port);
});