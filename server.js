const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config()

const app = express()

app.use(cors())
app.use(express.json())

mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.ATLAS_URI, 
{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongoose.connection.once('open', () => {
    console.log('[Mongoose] database connection established successfully')
})

app.use('/users', require('./routes/user.route'))
app.use('/exercises', require('./routes/exercise.route'))
// app.use('/todos', require('./routes/todo.route'))

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log('[Server] running on port ' + port)
})