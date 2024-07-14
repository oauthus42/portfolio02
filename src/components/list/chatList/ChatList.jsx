import { useState } from 'react';
import './chatList.css';

const ChatList = () => {
    const [addMode, setAddMode] = useState(false)


    return (
        <div className="chatList">
            <div className="search">
                <div className="searchBar">
                    <img src='./search.png'></img>
                    <input type='text' placeholder='Поиск'></input>
                </div>
                {/* //переключалка плюс/минус (добавить/удалить) */}
                <img src= {addMode ? "./minus.png" : "./plus.png" } className='addUser'
                onClick={() => setAddMode((prev) => !prev)}>
                </img>
            </div>
            {/* элементы чата */}
            <div className="item">
                <img src='./avatar1.png'></img>
                <div className="texts">
                    <span>Сбербанк</span>
                    <p>Найди работу.</p>
                </div>
            </div>
            <div className="item">
                <img src='./avatar2.png'></img>
                <div className="texts">
                    <span>Первый отдел</span>
                    <p>у нас пропал степлер</p>
                </div>
            </div>
            <div className="item">
                <img src='./avatar3.png'></img>
                <div className="texts">
                    <span>Коля Москва</span>
                    <p>Вы ещё набираете джунов?</p>
                </div>
            </div>
            <div className="item">
                <img src='./avatar4.png'></img>
                <div className="texts">
                    <span>Товарищ Майор</span>
                    <p>17:45, вторник. Ваша шутка про Москву покорила моё сердце</p>
                </div>
            </div>
            <div className="item">
                <img src='./avatar5.png'></img>
                <div className="texts">
                    <span>Подруга</span>
                    <p>Полина, ты не можешь всё превращать в мем!</p>
                </div>
            </div>
        </div>
    )
}

export default ChatList;