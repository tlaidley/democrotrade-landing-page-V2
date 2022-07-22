const express = require('express')
const router = express.Router()
const Subscriber = require('../modules/subscriber')

//Getting all
router.get('/', async (req, res) => {
    try {
        const subscribers = await Subscriber.find()
        res.status(200).json(subscribers)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})
//Creating one
router.post('/', async (req, res) => {
    const subscriber = new Subscriber({
        name: req.body.waitListName,
        email: req.body.waitListEmail
    })
    // console.log(subscriber)
    try {
        const newSub = await subscriber.save()
        res.status(201).json({ status: 'Success', message: newSub.name })
    } catch (err) {
        res.status(400).json({ status: 'Success', message: err.message })
    }
})
//Get one
router.get('/:id', getSubscriber, (req, res) => {
    res.json(res.subscriber.name)
})

//Deleteing one
router.delete('/:id', getSubscriber, async (req, res) => {
    try {
        await res.subscriber.remove()
        res.json(({ message: "Deleted:" + res.subscriber.name }))
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
})

async function getSubscriber(req, res, next) {
    let subscriber
    try {
        subscriber = await Subscriber.findById(req.params.id)
        if (subscriber == null) {
            return res.status(404).json({ message: 'Cant find subscriber' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.subscriber = subscriber
    next()
}

module.exports = router