const express = require('express')
const app = express()

const port = 3000

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res)=>{
  res.sendFile(__dirname + '/index.html')
})

const server = app.listen(port, ()=>{
  console.log( `server start on port: ${port}`)
})

const io = require('socket.io')(server)

  io.on('connection', (socket) =>{
    console.log('da ket noi')

    socket.on('message',(msg)=>{
      socket.broadcast.emit('message', msg)
    })
  })