const sayGoodbyeToLeavingPlayer = () => io.to(theRoom).emit("PLAYER_GOODBYE", leavingMessage);

const leavingMessage = `Unfortunately, player ${user} is leaving us without participating in the race`

export { sayGoodbyeToLeavingPlayer, leavingMessage }