import { showInputModal, showResultsModal, showMessageModal } from './views/modal.mjs';

const username = sessionStorage.getItem('username');

if (!username) {
	window.location.replace('/login');
}

const socket = io('http://localhost:3002', { query: { username } });

socket.on("USER_EXIST", (x) => {showMessageModal({message: x})})

// socket.on("USER_EXIST", (x) => {console.log(x)})
