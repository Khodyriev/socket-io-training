import { showInputModal, showResultsModal, showMessageModal } from './views/modal.mjs';
import { appendRoomElement, updateNumberOfUsersInRoom, removeRoomElement } from './views/room.mjs';

const username = sessionStorage.getItem('username');

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
	console.log(newRoomName);
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

socket.on("ROOM_EXISTS", (x) => {showMessageModal({message: x})});

socket.on("ADD_NEW_ROOM", (newRoomName) => {
	console.log(`A new room - ${newRoomName} was added`)
	appendRoomElement({
		name: newRoomName,
		numberOfUsers: 1
	})
})

socket.on("UPDATE_ROOMS", (rooms) => {
	console.log(rooms);
	console.log('All created rooms are added')
	rooms.forEach(element => {
		appendRoomElement({
			name: element,
			numberOfUsers: 1
		})
	});
})