require('dotenv').config()
const express = require('express')
const todoRoutes = require('./todos/todo-routes')
const userRoutes = require('./users/user-routes')
const mongoose = require('mongoose')
const app = express()

app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true }))

const db = mongoose.connection
const connectionString = process.env.ConnectionString
mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
app.use(express.json({ limit: '50mb' }))
db.once('open', _ => { console.log("Database connected: ", connectionString)})
db.on('error', err => { console.log("Connection error: ", err )})

app.get('/', (req, res) => {
    res.json({ message: connectionString })
})
app.use('/todos', todoRoutes)
app.use('/users', userRoutes)

app.listen(3000, _ => {
    console.log("Listening on port 300")
})