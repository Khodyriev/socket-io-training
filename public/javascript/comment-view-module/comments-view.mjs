const commentNode = document.querySelector("#comment-content");

const welcomeFirstPlayer = (username) => setTimeout((() => commentNode.innerHTML = `Let's welcome our first racer - the ${username}`), 7000)

// const sayGoodbye = (message) => {commentNode.innerHTML = message};

// socket.on("PLAYER_GOODBYE", (message) => sayGoodbye(message));
const sayGoodbye = (socket) => {socket.on("PLAYER_GOODBYE", (message) => commentNode.innerHTML = message)};

export { welcomeFirstPlayer, sayGoodbye };