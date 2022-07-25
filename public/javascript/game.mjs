import { showInputModal, showResultsModal, showMessageModal } from './views/modal.mjs';
import { appendRoomElement, updateNumberOfUsersInRoom, removeRoomElement } from './views/room.mjs';
import { appendUserElement, changeReadyStatus, setProgress, removeUserElement } from './views/user.mjs';
import { welcomeFirstPlayer, sayGoodbye, welcomeNextPlayer } from './comment-view-module/comments-view.mjs';

const username = sessionStorage.getItem('username');
let userReady = false;

if (!username) {
	window.location.replace('/login');
}

const socket = io('http://localhost:3002', { query: { username } });

const onCloseUserName = () => {	sessionStorage.clear(); window.location.replace('/login');}

socket.on("USER_EXIST", 
(x) => {document.querySelector("#rooms-page").classList.toggle("display-none");
	showMessageModal({
	message: x,
	onClose: onCloseUserName
	})
});

let newRoomName = null;

const onSubmitRoomName = () => {
	socket.emit("CREATE_NEW_ROOM", newRoomName);	
};

document.querySelector("#add-room-btn").addEventListener("click", 
	() => {
			showInputModal({
			title: "Name the room",
			onChange: (x) => {newRoomName = x;},
			onSubmit: onSubmitRoomName
			});

		}
	);

const readyStatusHandler = (username) => {
	userReady = !userReady;
	changeReadyStatus ({username: username, ready: userReady});
	const roomName = document.querySelector("#room-name").textContent;
	if (userReady) {document.querySelector("#ready-btn").textContent = "NOT READY";}
	else {document.querySelector("#ready-btn").textContent = "READY";}	
	socket.emit("USER_STATUS_CHANGED", username, roomName, userReady);
};

socket.on("ROOM_EXISTS", (x) => {showMessageModal({message: x})});

socket.on("ADD_NEW_ROOM", (newRoomName) => {
	console.log(`A new room - ${newRoomName} was added`)
	appendRoomElement({
		name: newRoomName,
		numberOfUsers: 1
	});
	document.querySelector(`.join-btn[data-room-name='${newRoomName}']`).addEventListener("click", () => {socket.emit("JOINING_ROOM", newRoomName, username)});
})

socket.on("JOINING_NEW_ROOM", (newRoomName) => {
	document.querySelector("#rooms-page").classList.toggle("display-none");
	document.querySelector("#game-page").classList.toggle("display-none");
	document.querySelector("#room-name").textContent = newRoomName;
	appendUserElement({
		username: username,
		ready: false,
		isCurrentUser: true
	});

	document.querySelector("#ready-btn").addEventListener("click", () => {readyStatusHandler(username)});

	document.querySelector("#quit-room-btn").addEventListener("click", () => {
		removeUserElement(username);
		document.querySelector("#game-page").classList.toggle("display-none");
		document.querySelector("#rooms-page").classList.toggle("display-none");
		socket.emit("LEAVING_THE_ROOM", newRoomName, username)
	});
	welcomeFirstPlayer(username);	
});

socket.on("JOINED_ROOM", (room, usersInRoom) => {
	document.querySelector("#rooms-page").classList.toggle("display-none");
	document.querySelector("#game-page").classList.toggle("display-none");
	document.querySelector("#room-name").textContent = room;	
	let me = usersInRoom.indexOf(username);
	usersInRoom.splice(me, 1);

	usersInRoom.forEach((item) => appendUserElement({
		username: item,
		ready: false,
		isCurrentUser: false
	}));

	appendUserElement({
		username: username,
		ready: false,
		isCurrentUser: true
	});
	document.querySelector("#ready-btn").addEventListener("click", () => {readyStatusHandler(username)});
	document.querySelector("#quit-room-btn").addEventListener("click", () => {
		removeUserElement(username);
		document.querySelector("#game-page").classList.toggle("display-none");
		document.querySelector("#rooms-page").classList.toggle("display-none");
		socket.emit("LEAVING_THE_ROOM", room, username)
	});
	// setTimeout((() => commentNode.innerHTML = `And glad to welcome our next racer - the ${username}`), 7000)
});

sayGoodbye(socket);
welcomeNextPlayer(socket);

socket.on("DELETING_ROOM", (room) => removeRoomElement(room));

socket.on("TO_MANY_USERS", (x) => {showMessageModal({message: x})});

socket.on("UPDATE_COUNTER", (room, counter) => {	
	updateNumberOfUsersInRoom({
		name: room, 
		numberOfUsers: counter
	})});

socket.on("UPDATE_USER_ELEMENT", (user) => {
	if(!document.querySelector(`.user[data-username='${user}']`)){
			appendUserElement({
			username: user,
			ready: false,
			isCurrentUser: false
		})
	};
})

socket.on("UPDATE_USER_STATUS", (username, userReady) => {changeReadyStatus ({username: username, ready: userReady});})

socket.on("REMOVE_USER_ELEMENT", (user) => {removeUserElement(user)});

socket.on("UPDATE_ROOMS", (rooms) => {	
	rooms.forEach((item) => {
		appendRoomElement({
			name: item[0],
			numberOfUsers: item[1]
		});
		document.querySelector(`.join-btn[data-room-name='${item[0]}']`).addEventListener("click", () => {socket.emit("JOINING_ROOM", item[0], username)});
	});
})