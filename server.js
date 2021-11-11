require("dotenv").config()

const express = require('express');
const path = require('path')
const cors = require('cors')

const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'public'))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')

app.use(cors())

app.use('/', (req, res) => {
    res.render('index.html')
})

let messages = []

io.on('connection', socket => {
    socket.emit('previousMessages', messages)

    console.log(socket.id)

    socket.on('sendMessage', data => {
        messages.push(data)
        socket.broadcast.emit('receivedMessage', data)
    })

    socket.emit('new_message', message => {
        socket.broadcast.emit('new_message', message)
    })
})

server.listen(process.env.PORT || 3000)