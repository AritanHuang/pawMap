export { apiUrl, imgurToken, userId, token, petName };
//測試
// const apiUrl = `http://localhost:3000`;
//正式
const apiUrl = `https://pawmap-server.onrender.com`;
const imgurToken = 'a0461da17c62e537d08e30497baa2ddd0d56a826';
//取得登入後的userId 和 token
const userId = localStorage.getItem('userId');
const token = localStorage.getItem('token');
const petName = localStorage.getItem('petName');
