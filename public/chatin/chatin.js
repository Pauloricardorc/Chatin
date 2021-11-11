var socket = io('http://localhost:3000')

function renderMessage(message) {
    if (message.nome == localStorage.getItem('nome')) {
        $('.messages').append('<div class="my_message"> <div class="my_message_"> <p id="title">' + nome + '</p>' + message.message + '</div> </div>')
    } else {
        $('.messages').append('<div class="message"> <div class="my_message_"> <p id="title">' + message.nome + '</p>' + message.message + '</div> </div>')
    }
}

socket.on('previousMessages', function(messages) {
    for (message of messages) {
        renderMessage(message)
    }
})

socket.on('receivedMessage', function(message) {
    renderMessage(message)
})

let nome = localStorage.getItem('nome')

$('#chat').submit(function(event) {

    var message = $('input[name=message]').val()

    if (message.length) {
        var messageObject = {
            nome,
            message: message
        }

        socket.emit('sendMessage', messageObject)

        socket.on('new_message', function(data) {
            console.log('new message')
            renderMessage(data)
        })
    }

})