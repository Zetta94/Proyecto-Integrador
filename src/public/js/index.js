const socket = io()

    socket.on('newMessage', (newMessage) => {
    console.log('Nuevo mensaje agregado:', newMessage)
    const messageList = document.getElementById('messageList')
    const messageItem = createMessageItem(newMessage)
    messageList.appendChild(messageItem)
    })  

    function createMessageItem(newMessage) {
    const messageItem = document.createElement('div')
    messageItem.innerHTML = `
        <p>-- User: ${newMessage.user}</p>
        <p>Message: ${newMessage.message}</p> 
    `
    return messageItem
    }

    //Ingreso por Handlebars
    function sendMessage() {
        // Captura los datos ingresados por el usuario
        const user = document.getElementById('user').value;
        const message = document.getElementById('message').value;
    
        // Envía los datos al servidor a través de una solicitud AJAX
        fetch('/api/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ user: user, message: message })
        })
        .then(response => response.json())
        .then(data => {
          console.log(data)
        })
        .catch(error => {
          console.error('Error al enviar el mensaje:', error)
        });
      }