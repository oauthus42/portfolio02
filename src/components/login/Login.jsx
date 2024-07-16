import './login.css'
import { useState } from 'react';
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../lib/firebase";
import { doc, setDoc } from '@firebase/firestore';
import upload from '../../lib/upload';

const Login = () => {
//состояние для отображения загруженной фотографии
const [avatar, setAvatar] = useState({
    file: null,
    url: ''
})

const [loading, setLoading] = useState(false)


const handleAvatar = (e) => {
    if(e.target.files[0]) {
        setAvatar ({
            file: e.target.files[0],
            url: URL.createObjectURL(e.target.files[0])
         })
    }
}

const handleRegister = async (e) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.target);
    const {username, email, password} = Object.fromEntries(formData);

    try {
        const res = await createUserWithEmailAndPassword(auth, email, password)
        const imgURL = await upload(avatar.file);

        await setDoc(doc(db, "username", res.user.uid), {
            username,
            email,
            avatar: imgURL,
            id: res.user.uid,
            blocked: []
        })

        await setDoc(doc(db, "userchats", res.user.uid), {
            chats: []
        });

        toast.success("Аккаунт успешно создан!");
    } catch (error) { 
        console.log(error);
        toast.error(error.message);
    } finally {
        setLoading(false);
    }
};

const handleLogin = async (e) => {
    setLoading(true);
    const formData = new FormData(e.target);
    const {email, password} = Object.fromEntries(formData);

    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error.message);
        toast.error(error.message);
    } finally {
        setLoading(false);
    }
}

    return (
        <div className='login'>
            <div className="item">
                <h2>С возвращением, </h2>
                <form onSubmit={handleLogin}>
                    <input type='text' placeholder='e-mail' name='email'></input>
                    <input type='password' placeholder='пароль' name='password'></input>
                    <button disabled={loading}>{loading ? 'Загрузка...' : 'Войти'}</button>
                </form>
            </div>

            <div className="separator"></div>

            <div className="item">
            <h2>Создать аккаунт</h2>
                <form onSubmit={handleRegister}>
                    <img src={avatar.url || './avatar.png'}></img>
                    <label htmlFor='file'>Загрузить фотографию</label>
                    <input type='file' id='file' 
                        style={{display:"none"}}
                        onChange={handleAvatar}>
                    </input>
                    <input type='text' placeholder='логин' name='username'></input>
                    <input type='text' placeholder='e-mail' name='email'></input>
                    <input type='password' placeholder='пароль' name='password'></input>
                    <button disabled={loading}>{loading ? 'Загрузка...' : 'Создать'}</button>
                </form>
            </div>
        </div>
    )
}

export default Login;