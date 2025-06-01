import CryptoJS from 'crypto-js';


const SECRET_KEY ="humotTechrivvra@#@*"


const setItem  = (value)=> {
     const encryptedName = CryptoJS.AES.encrypt(value.data,SECRET_KEY).toString();
    window.localStorage.setItem( 'username',encryptedName);
    

};

const setUrl = (value) =>{

    window.localStorage.setItem("dataBaseUrl",value)

}
const setPass =(value) =>{
    const encryptPassword = CryptoJS.AES.encrypt(value,SECRET_KEY).toString();
    window.localStorage.setItem( 'password',encryptPassword)
}

const getUrl =() =>{
    return window.localStorage.getItem("dataBaseUrl")
}
const getItemUserAuth = () =>{

    const encryptedUsername = window.localStorage.getItem('username');
    const encryptedPassword = window.localStorage.getItem('password')
    const username = encryptedUsername
    ? CryptoJS.AES.decrypt(encryptedUsername, SECRET_KEY).toString(CryptoJS.enc.Utf8)
    : null;

  const password = encryptedPassword
    ? CryptoJS.AES.decrypt(encryptedPassword, SECRET_KEY).toString(CryptoJS.enc.Utf8)
    : null;

    return { username ,password}
}



const logoutUser =() =>{
    window.localStorage.removeItem('username');
    window.localStorage.removeItem('password')
}


export {setItem ,getItemUserAuth,logoutUser,setPass,setUrl,getUrl};



