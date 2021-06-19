var socket = io();

let nameNhat;
let messageText = document.querySelector('#textarea')

let messageArea = document.querySelector('.message_area')
do{
  nameNhat = prompt('vui long nhap ten: ')
}while(!nameNhat)

messageText.addEventListener('keyup', (e)=>{
  if(e.key === 'Enter'){
    sendMessage(e.target.value)
    messageText.value = ''
  }
})


function sendMessage(message){
  let msg = {
    user: nameNhat,
    message: message.trim()
  }
  appendMessage(msg,'outgoing')

  //send server
  socket.emit('message', msg)
  scrollToBottom()
}


function appendMessage(msg, type){
  let mainDiv =  document.createElement('div')
  let className = type
  mainDiv.classList.add(className, 'message')
  let markup = `
  <h4>${msg.user}</h4>
  <p>${msg.message}</p>
  `
  mainDiv.innerHTML = markup
  messageArea.appendChild(mainDiv)
}

// recieve message

socket.on('message', (msg)=>{
  appendMessage(msg, 'incoming')
  scrollToBottom()
})

function scrollToBottom(){
  messageArea.scrollTop = messageArea.scrollHeight
}
