import axios from "axios";
const clientId = '54125f1145322a9';
const email = document.querySelector('#Email');
const password = document.querySelector('#Password');
const petName = document.querySelector('#petName');
const petBreed = document.querySelector('#petBreed');
const petBirthday = document.querySelector('#petBirthday');
const address = document.querySelector('#address');
const petPhoto = document.querySelector('#petPhoto');




const signUpButton = document.querySelector('#signup-btn');

petPhoto.addEventListener('change', function (e) {
    const imgFile = e.target.files[0];
    const formData = new FormData();
    formData.append('image', imgFile);
    axios.post('https://api.imgur.com/3/image', formData, {
        headers: {
            Authorization: `Client-ID ${clientId}`,
            'Content-Type': 'multipart/form-data',
        }
    })
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        })
})
