const router = require('express').Router()
const passport = require('passport')
const passportConfig = require('../middleware/passport')
const jwt = require('jsonwebtoken')

const User = require('../models/user.model')

router.route('/').get((req, res, next) => {
	User.find()
		.then((result) => {
			res.status(200).json(result)
		})
		.catch((err) => {
			res.status(500).json({ error: err })
		})
})

router.route('/register').post((req, res, next) => {
	const { username, password, role } = req.body

	User.findOne({ username }, (err, user) => {
		if (err)
			return res.status(500).json({
				message: {
					body: 'Error has occurred',
					error: true,
					details: err,
				},
			})

		if (user)
			return res.status(400).json({
				message: {
					body: 'Username is already taken',
					error: true,
				},
			})
		else {
			const newUser = new User({ username, password, role })
			newUser.save((err) => {
				if (err)
					return res.status(500).json({
						message: {
							body: 'Error has occurred',
							error: true,
							details: err,
						},
					})
				return res.status(201).json({
					message: {
						body: 'Account successfully created',
						error: false,
					},
				})
			})
		}
	})
})

module.exports = router
