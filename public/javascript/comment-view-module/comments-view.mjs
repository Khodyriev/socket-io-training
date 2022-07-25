const commentNode = document.querySelector("#comment-content");

const welcomeFirstPlayer = (username) => setTimeout((() => 
commentNode.innerHTML = `Let's welcome our first racer - the ${username}`), 2000)

const sayGoodbye = (socket) => {socket.on("PLAYER_GOODBYE", (message) => commentNode.innerHTML = message)};

const welcomeNextPlayer = (socket) => {socket.on("WELCOME_NEXT_PLAYER", 
(message) => {setTimeout((() => 
commentNode.innerHTML = `${message.greetings} The great ${message.name} on his ${message.color} ${message.car}!`), 2500)}
)};

const randomFactView = (socket) => {socket.on("RANDOM_FACT", 
(message) => commentNode.innerHTML = `Did you know, that: <br> ${message}`)}

const statusChangeComment = (socket) => {socket.on("UPDATE_USER_STATUS", 
(username, userReady) => commentNode.innerHTML = `The player ${username} changed his status to ${userReady? 'READY' : 'NOT READY'}`)}

export { welcomeFirstPlayer, sayGoodbye, welcomeNextPlayer, randomFactView, statusChangeComment };