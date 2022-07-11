import { Server } from 'socket.io';
import * as config from './config';

const activeUsers: Array<string> = [];
const rooms: Map<string, number> = new Map();

export default (io: Server) => {
	io.on('connection', socket => {
		if (rooms.size) {socket.emit("UPDATE_ROOMS", [...rooms])};
		// console.log(`All created rooms are: ${rooms}`);
		const username = socket.handshake.query.username as string;
		console.log(`${username} connected`);		
			if (activeUsers.indexOf(username) == -1) {
				activeUsers.push(username);
				socket.on("disconnect", () => {			
					console.log(`${username} disconnected`);
					const disconnectIndex: number = activeUsers.indexOf(username);
					activeUsers.splice(disconnectIndex, 1);
					// console.log(activeUsers);
				  });
			} else {
				socket.emit("USER_EXIST", "Such user already exist.");				
			};
			console.log(`Active users are: ${activeUsers}`);
			
		socket.on("CREATE_NEW_ROOM", (newRoomName) => {
			// console.log(newRoomName);
			if (!rooms.has(newRoomName)) {
				rooms.set(newRoomName, 1);
				// console.log(rooms);
				io.emit("ADD_NEW_ROOM", newRoomName);
				socket.join(newRoomName);
				socket.emit("JOINING_NEW_ROOM", newRoomName);
				socket.on("disconnect", () => {
					socket.leave(newRoomName);
					let counter = rooms.get(newRoomName);
					if (counter) {
						counter--;
						if (counter > 0) {
						rooms.set(newRoomName, counter);
						} else {
							io.emit("DELETING_ROOM", newRoomName);
							rooms.delete(newRoomName);
						}
					} else {console.error("'Counter' is undefined!")}					
				});
			} else {
				socket.emit("ROOM_EXISTS", "Such room already exists!")
			};
		});

		socket.on("LEAVING_THE_ROOM", (theRoom) => {
			socket.leave(theRoom);
			let counter = rooms.get(theRoom);
					if (counter) {
						counter--;
						if (counter > 0) {
						rooms.set(theRoom, counter);
						} else {
							io.emit("DELETING_ROOM", theRoom);
							rooms.delete(theRoom);
						}
					} else {console.error("'Counter' is undefined!")}
		});




	});	
};



