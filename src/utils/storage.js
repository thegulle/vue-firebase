export function setToken(token) {
    localStorage.setItem('token', token);
}
export function getToken() {
    return localStorage.getItem('token');
}
export function removeToken() {
    localStorage.removeItem('token');
}

export function setUserStorage(user) {
    localStorage.setItem('user', JSON.stringify(user));
}
export function getUserStorage() {
    return localStorage.getItem('user');
}
export function removeUserStorage() {
    localStorage.removeItem('user');
}