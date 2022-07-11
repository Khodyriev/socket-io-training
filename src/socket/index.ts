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
			};
			console.log(activeUsers);
			
		socket.on("CREATE_NEW_ROOM", (newRoomName) => {
			console.log(newRoomName);
			if (rooms.indexOf(newRoomName) == -1) {
				rooms.push(newRoomName);
				console.log(rooms);
			} else {
				socket.emit("ROOM_EXISTS", "Such room already exists!")
			}
		})
	});	
};



