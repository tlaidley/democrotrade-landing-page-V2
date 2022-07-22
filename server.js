require('dotenv').config();

const express = require("express");
const app = express();
const mongoose = require('mongoose')
const bodyParser = require('body-parser')


mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection

db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const subscriberRouter = require('./routes/subscribers')
const testRoute = require('./routes/test')

app.get("/", function (req, res, next) {
    console.log('Hello from / root')
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    res.sendFile(__dirname + "index.html")
})

app.use('/subscribers', subscriberRouter)
app.use('/test', testRoute)

app.use((req, res, next) => {
    res.status(404).send('Sry Page not found')
    next()
})

app.listen(3000, () => console.log('Server has started'))