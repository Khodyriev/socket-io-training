const commentNode = document.querySelector("#comment-content");

const welcomeFirstPlayer = (username) => setTimeout((() => 
commentNode.innerHTML = `Let's welcome our first racer - the ${username}`), 5500)

const sayGoodbye = (socket) => {socket.on("PLAYER_GOODBYE", (message) => commentNode.innerHTML = message)};

const welcomeNextPlayer = (socket) => {socket.on("WELCOME_NEXT_PLAYER", 
(message) => {setTimeout((() => 
commentNode.innerHTML = `${message.greetings} The great ${message.name} on his ${message.color} ${message.car}!`), 2500)}
)};

const randomFactView = (socket) => {socket.on("RANDOM_FACT", 
(message) => commentNode.innerHTML = `Did you know, that: <br> ${message}`)}

export { welcomeFirstPlayer, sayGoodbye, welcomeNextPlayer, randomFactView };