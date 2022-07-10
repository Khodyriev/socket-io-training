import { showInputModal, showResultsModal, showMessageModal } from './views/modal.mjs';

const username = sessionStorage.getItem('username');

if (!username) {
	window.location.replace('/login');
}

const socket = io('http://localhost:3002', { query: { username } });

socket.on("USER_EXIST", 
(x) => {document.querySelector("#rooms-page").classList.toggle("display-none");
	showMessageModal({
	message: x,
	onClose: () => {
		sessionStorage.clear(); window.location.replace('/login');
	}
	})
});

console.log(document.querySelector("#add-room-btn"));
document.querySelector("#add-room-btn").addEventListener("click", console.log("KLICK"))//showInputModal({title: "test"}))