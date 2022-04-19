const roomName = JSON.parse(document.getElementById('json-rooname').textContent);
const userName = JSON.parse(document.getElementById('json-username').textContent);

const chatSocket = new WebSocket(
    'ws://'
    + window.location.host
    + '/ws/'
    + roomName
    + '/'
);

chatSocket.onmessage = function(e) {
    console.log('onmessage');

    const data = JSON.parse(e.data);

    if (data.message) {
        let html = '<div class="card-message">';
            html += '<h3 class="username">' + data.username + '</h3>';
            html += '<p class="desc">' + data.message + '</p> </div>';
           
        
            document.querySelector("#chat-messages").innerHTML += html;
    }
}

chatSocket.onclose = function(e) {
    console.log('onclose');
}

// Lors du click du formulaire
document.querySelector("#chat-message-submit").onclick = (e) =>{
    e.preventDefault();

    const messaInputDom = document.querySelector("#chat-message-input");
    const message = messaInputDom.value;

    chatSocket.send(JSON.stringify({
        'message': message,
        'username': userName,
        'room': roomName
    }));

    messaInputDom.value = '';

    return false;
} 