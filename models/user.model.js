const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			min: 6,
			max: 15,
		},
		password: {
			type: String,
			min: 8,
			required: true,
		},
		role: {
			type: String,
			enum: ['user', 'admin'],
			required: true,
		},
		todos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Todo' }],
	},
	{
		timestamps: true,
	}
)

UserSchema.pre('save', function (next) {
	if (!this.isModified('password')) return next()
	bcrypt.hash(this.password, 3, (err, passwordHash) => {
		if(err) return next(err)
		this.password = passwordHash
		next()
	})
})

UserSchema.methods.comparePassword = (password, cb) => {
	bcrypt.compare(password, this.password, (err, isMatch) => {
		if(err) return cb(err)
		if(!isMatch) return cb(null, isMatch)
		return cb(null, this)
	})
}

module.exports = mongoose.model('User', UserSchema)
