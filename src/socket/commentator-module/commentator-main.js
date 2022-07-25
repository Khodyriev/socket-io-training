import { helloMessageForNext } from './hello-factory';
import { someFact } from './fact-facade';


export const sayGoodbyeToLeavingPlayer = (io, theRoom, user) => 
io.to(theRoom).emit("PLAYER_GOODBYE", `Unfortunately, player ${user} is leaving us without participating in the race`);

export const sayHelloToNextPlayer = (io, room, user, counter) => {
    const message = helloMessageForNext.create(counter, user)
    io.to(room).emit("WELCOME_NEXT_PLAYER", message);
}

export const randomFactSend = (io, newRoomName) => setInterval(() => io.to(newRoomName).emit("RANDOM_FACT", someFact()), 30000)