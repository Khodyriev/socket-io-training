export const sayGoodbyeToLeavingPlayer = () => io.to(theRoom).emit("PLAYER_GOODBYE", `Unfortunately, player ${user} is leaving us without participating in the race`);

export const leavingMessage = (user) => `Unfortunately, player ${user} is leaving us without participating in the race`;

