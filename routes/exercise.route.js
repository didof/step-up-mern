const router = require('express').Router()

const Exercise = require('../models/exercise.model')

router.route('/').get((req, res, next) => {
	Exercise.find()
		.then((result) => {
			res.status(200).json(result)
		})
		.catch((err) => {
			res.status(500).json({ error: err })
		})
})

router.route('/').post((req, res, next) => {
	const username = req.body.username
	const description = req.body.description
	const duration = Number(req.body.duration)
	const date = Date.parse(req.body.date)

	const newExercise = new Exercise({ username, description, duration, date })
	newExercise
		.save()
		.then((result) => {
			res.status(200).json(result)
		})
		.catch((err) => {
			res.status(500).json({ error: err })
		})
})

router.route('/add').post((req, res, next) => {})

module.exports = router
