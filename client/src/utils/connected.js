var connected = false;

if (localStorage.getItem('key') == null || JSON.parse(localStorage.getItem('key')).expiry < new Date().getTime()) {
    connected = false;
} else {
    connected = true;
}

export default connected;