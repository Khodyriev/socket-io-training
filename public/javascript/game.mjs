import { showInputModal, showResultsModal, showMessageModal } from './views/modal.mjs';

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
// 	newRoomName = onChangeInput();
// 	const roomName = inputElement.value;
// 	console.log(roomName)
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