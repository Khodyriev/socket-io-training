import { emit } from 'process';
import { Server } from 'socket.io';
import { MAXIMUM_USERS_FOR_ONE_ROOM, SECONDS_TIMER_BEFORE_START_GAME, SECONDS_FOR_GAME } from './config';

const activeUsers: Map<string, string> = new Map();
const rooms: Map<string, number> = new Map();

export default (io: Server) => {
	io.on('connection', socket => {
		if (rooms.size) {socket.emit("UPDATE_ROOMS", [...rooms])};
		// console.log(`All created rooms are: ${rooms}`);
		const username = socket.handshake.query.username as string;
		console.log(`${username} connected`);
		
			if (!activeUsers.has(username)) {
				activeUsers.set(username, socket.id);
				socket.on("disconnect", () => {			
					console.log(`${username} disconnected`);					
					activeUsers.delete(username);
					// console.log(activeUsers);
				  });
			} else {
				socket.emit("USER_EXIST", "Such user already exist.");				
			};
			console.log(activeUsers);
			
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

		socket.on("LEAVING_THE_ROOM", (theRoom, user) => {
			socket.leave(theRoom);
			let counter = rooms.get(theRoom);
					if (counter) {
						counter--;
						if (counter > 0) {
						rooms.set(theRoom, counter);
						io.to(theRoom).emit("REMOVE_USER_ELEMENT", user);
						io.emit("UPDATE_COUNTER", theRoom, counter);
						} else {
							io.emit("DELETING_ROOM", theRoom);
							rooms.delete(theRoom);
						}
					} else {console.error("'Counter' is undefined!")}
		});

		socket.on("JOINING_ROOM", (room, user) => {
			let counter = rooms.get(room);
			if (!counter) {console.error(`Error! There is no such room as ${room} in the list`)			
			} else if (counter >= MAXIMUM_USERS_FOR_ONE_ROOM) {socket.emit("TO_MANY_USERS", "To many users in this room")
			} else {
				socket.join(room);
				counter++
				rooms.set(room, counter);
				io.emit("UPDATE_COUNTER", room, counter);
				console.log(rooms);
				console.log(room, counter);
				const usersIdInRoom = io.sockets.adapter.rooms.get(room);
				const usersInRoom: Array<string> = [];
				activeUsers.forEach((value, key) => {if (usersIdInRoom?.has(value)){usersInRoom.push(key)}});
				console.log(usersInRoom);
				socket.emit("JOINED_ROOM", room, usersInRoom);
				io.to(room).emit("UPDATE_USER_ELEMENT", user);

				socket.on("disconnect", () => {
					socket.leave(room);
					io.to(room).emit("REMOVE_USER_ELEMENT", user);
					let counter = rooms.get(room);
					if (counter) {
						counter--;
						if (counter > 0) {
						rooms.set(room, counter);
						} else {
							io.emit("DELETING_ROOM", room);
							rooms.delete(room);
						}
					} else {console.error("'Counter' is undefined!")}					
				});	
			}
		})







	});	
};



