const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors')
const usersModel = require('./models/users')
const boardModel = require('./models/board')
const columnModel = require('./models/columns')
const cardModel = require('./models/cards')
const app = express()
const port = 3000

mongoose.connect('mongodb://localhost:27017/mdnotes', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors())
app.use(express.json()) // for parsing application/json

app.get('/', async (req, res) => {
    res.send('<h1>Hello Word</h1>')
})

app.post('/login', async (req, res) => {
    try {
        let user = await usersModel.findOne({ 'uname': req.body.uname, 'pwd': req.body.pwd })
        if (user) {
            res.status(200).send(res.json(user))
        }
        else {
            res.status(401).send('Invalid Creds.')
        }
    }
    catch (error) {
        res.status(401).send('Login Failed!!!!' + error)
    }
})

app.post('/register', async (req, res) => {
    try {
        let user = await usersModel.findOne({ 'uname': req.body.uname }, 'uname')
        if (user) {
            res.status(401).send('User already exists.');
        }
        else {
            const u1 = new usersModel({ uname: req.body.uname, pwd: req.body.pwd });
            let result = await u1.save()
            res.send(res.json(result))
        }
    }
    catch (error) {
        res.status(401).send('Registration Failed!!!!' + error)
    }
})

app.post('/addboard', async (req, res) => {
    try {
        let board = await boardModel.findOne({ 'bname': req.body.bname, 'uid': req.body.uid })
        if (board) {
            res.status(422).send('Board already exists.');
        }
        else {
            const newBoard = new boardModel({ bname: req.body.bname, desc: req.body.desc, uid: req.body.uid });
            let result = await newBoard.save()
            res.json(result)
        }
    }
    catch (error) {
        res.status(422).send('Board not added ' + error)
    }
})

app.post('/addcolumns', async (req, res) => {
    try {
        const newCol = new columnModel({ colname: req.body.colname, bid: req.body.bid });
        let result = await newCol.save()
        res.json(result)
    }
    catch (error) {
        res.status(422).send('Column not added ' + error)
    }
})

app.post('/addcards', async (req, res) => {
    try {
        const newCard = new cardModel({ cardname: req.body.cardname, colid: req.body.colid });
        let result = await newCard.save()
        res.json(result)
    }
    catch (error) {
        res.status(422).send('Card not added ' + error)
    }
})

app.post('/showboards', async (req, res) => {
    try {
        let board = await boardModel.find({ 'uid': req.body.uid })
        if (board) {
            res.json(board)
        }
        else {
            res.status(422).send('Board not exists.');
        }
    }
    catch (error) {
        res.status(422).send('Board display error ' + error)
    }
})

app.post('/showcols', async (req, res) => {
    try {
        let cols = await columnModel.find({ 'bid': req.body.bid })
        if (cols) {
            res.json(cols)
        }
        else {
            res.status(422).send('Column not exists.');
        }
    }
    catch (error) {
        res.status(422).send('Column display error ' + error)
    }
})

app.post('/showcards', async (req, res) => {
    try {
        let cards = await cardModel.find({ 'colid': req.body.colid })
        if (cards) {
            res.json(cards)
        }
        else {
            res.status(422).send('Card not exists.');
        }
    }
    catch (error) {
        res.status(422).send('Card display error ' + error)
    }
})
//deleteboard
app.post('/deleteboard', async (req, res) => {
    try {
        let board = await boardModel.findOne({ '_id': req.body.bid })
        if (board) {
            let result = await board.delete()
            res.json(result)
        }
        else {
            res.status(422).send('Board not deleted.');
        }
    }
    catch (error) {
        res.status(422).send('Card display error ' + error)
    }
})

//deletecolumn
app.post('/deletecolumn', async (req, res) => {
    try {
        let column = await columnModel.findOne({ '_id': req.body.cid })
        if (column) {
            let result = await column.delete()
            res.json(result)
        }
        else {
            res.status(422).send('Board not deleted.');
        }
    }
    catch (error) {
        res.status(422).send('Card display error ' + error)
    }
})

//deletecard
app.post('/deletecard', async (req, res) => {
    try {
        let card = await cardModel.findOne({ '_id': req.body.crid })
        if (card) {
            let result = await card.delete()
            res.json(result)
        }
        else {
            res.status(422).send('Board not deleted.');
        }
    }
    catch (error) {
        res.status(422).send('Card display error ' + error)
    }
})

//addsharing
app.post('/addsharing', async (req, res) => {
    try {
        let shareUser = await usersModel.findOne({ 'uname': req.body.uname })
        if (shareUser) {
            let board = await boardModel.findOne({ '_id': req.body.bid })
            let result = await boardModel.updateOne({ _id: board._id },
                { $addToSet: { shareuid: shareUser._id } }
            )
            res.json(result)
        }
    }
    catch (error) {
        res.status(422).send('sharing not added ' + error)
    }
})

//addsharing
app.post('/showsharing', async (req, res) => {
    try {
        let shareUser = await boardModel.find({ 'shareuid': { $elemMatch: { $eq: req.body.uid } } })
        if (shareUser) {
            res.json(shareUser)
        }
    }
    catch (error) {
        res.status(422).send('sharing not added ' + error)
    }
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})