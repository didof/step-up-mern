const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const JwtStrategy = require('passport-jwt').Strategy

const User = require('../models/user.model')

const cookieExtractor = (req) => {
	let token = null
	if (req && req.cookies) {
		token = req.cookies['access_token']
	}
	return token
}

// authorization
// @ triggered before access any resource
passport.use(
	new JwtStrategy(
		{
			jwtFromRequest: cookieExtractor,
			secretOrKey: process.env.JWT_SECRET,
		},
		(payload, done) => {
			User.findById({ _id: payload.sub }, (err, user) => {
				if (err) return done(err, false)
				if (user) return done(null, user)
				else return done(null, false)
			})
		}
	)
)

// authenticated local strategy using username and password
// @ fired at login
passport.use(
	new LocalStrategy((username, passport, done) => {
		User.findOne({ username }, (err, user) => {
			// if something goes wrong in db
			if (err) return done(err)

			// if no user exists
			if (!user) return done(null, false)

			// check if password is correct
			user.comparePassword(password, done)
		})
	})
)
