const commentNode = document.querySelector("#comment-content");

const welcomeFirstPlayer = (username) => setTimeout((() => commentNode.innerHTML = `Let's welcome our first racer - the ${username}`), 7000)

const sayGoodbye = (socket) => {socket.on("PLAYER_GOODBYE", (message) => commentNode.innerHTML = message)};

const welcomeNextPlayer = (socket) => {socket.on("WELCOME_NEXT_PLAYER", 
(message) => {commentNode.innerHTML = `${message.greetings} The great ${message.name} on his ${message.color} ${message.car}!`}
)};

export { welcomeFirstPlayer, sayGoodbye, welcomeNextPlayer };