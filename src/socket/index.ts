import { Server } from 'socket.io';
import * as config from './config';

const activeUsers: Array<string> = [];
const rooms: Array<string> = [];

export default (io: Server) => {
	io.on('connection', socket => {
		const username = socket.handshake.query.username as string;
		console.log(`${username} connected`);		
			if (activeUsers.indexOf(username) == -1) {
				activeUsers.push(username);
				socket.on("disconnect", () => {			
					console.log(`${username} disconnected`);
					const disconnectIndex: number = activeUsers.indexOf(username);
					activeUsers.splice(disconnectIndex, 1);
					console.log(activeUsers);
				  });
			} else {
				socket.emit("USER_EXIST", "User already exist.");
				console.log("USER_EXIST");
			};
			console.log(activeUsers);		
	});	
};



