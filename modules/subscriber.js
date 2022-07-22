const mongoose = require('mongoose')

const SubscriberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    joinDate: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('Subscriber', SubscriberSchema)