import { useState } from 'react';
import './login.css'

const Login = () => {
//состояние для отображения загруженной фотографии
const [avatar, setAvatar] = useState({
    file: null,
    url: ''
})

const handleAvatar = (e) => {
    if(e.target.files[0]) {
    setAvatar ({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0])
    })
}
}


    return (
        <div className='login'>
            <div className="item">
                <h2>С возвращением, </h2>
                <form>
                    <input type='text' placeholder='e-mail' name='email'></input>
                    <input type='password' placeholder='пароль' name='password'></input>
                    <button>Войти</button>
                </form>
            </div>

            <div className="separator"></div>

            <div className="item">
            <h2>Создать аккаунт</h2>
                <form>
                    <img src={avatar.url || './avatar.png'}></img>
                    <label htmlFor='file'>Загрузить фотографию</label>
                    <input type='file' id='file' 
                        style={{display:"none"}}
                        onChange={handleAvatar}>
                    </input>
                    <input type='text' placeholder='логин' name='username'></input>
                    <input type='text' placeholder='e-mail' name='email'></input>
                    <input type='password' placeholder='пароль' name='password'></input>
                    <button>Создать</button>
                </form>
            </div>
        </div>
    )
}

export default Login;