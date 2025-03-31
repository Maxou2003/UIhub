export function isConnected() {
    const key = localStorage.getItem('key');
    if (!key) return false;

    try {
        const parsedKey = JSON.parse(key);
        return parsedKey.expiry > Date.now();
    } catch (e) {
        return false;
    }
}

export default isConnected();