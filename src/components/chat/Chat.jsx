import { useEffect, useRef, useState } from 'react';
import './chat.css';
import EmojiPicker from 'emoji-picker-react';

const Chat = () => {
const [open, setOpen] = useState(false);
const [text, setText] = useState("");

//автоматический скролл чата вниз при загрузке\обновлении страницы
const endRef = useRef(null);
useEffect(() => {
    endRef.current?.scrollIntoView({behavior:'smooth'});
}, []);



const handleEmoji = (e) => {
    setText ((prev) => prev + e.emoji)
    setOpen(false)
}

    return (
        <div className="chat">
            <div className="top">
                {/* информация о пользователе */}
                <div className="user">
                    <img src='avatar6.png'></img>
                    <div className="texts">
                        <span>Саша</span>
                        <p>Lorem, ipsum dolor sit amet.</p>
                    </div>
                </div>
                <div className="icons">
                    <img src='./phone.png'></img>
                    <img src='./video.png'></img>
                    <img src='./info.png'></img>
                </div>
            </div>

            <div className="center">

                <div className="message">
                    <img src='./avatar6.png'></img>
                    <div className="texts">
                        <p>Входящее сообщение</p>
                        <span>15 минут назад</span>
                    </div>
                </div>

                <div className="message own">
                    <div className="texts">
                        <p>Исходящее сообщение</p>
                        <span>10 минут назад</span>
                    </div>
                </div>

                <div className="message">
                    <img src='./avatar6.png'></img>
                    <div className="texts">
                        <img src='https://colodu.club/uploads/posts/2022-11/1667450724_14-colodu-club-p-gerbarii-v-interere-vkontakte-14.jpg'></img>
                        <p>Входящее сообщение</p>
                        <span>4 минуты назад</span>
                    </div>
                </div>

            <div ref={endRef}></div>

            </div>

            <div className="bottom">
                <div className="icons">
                    <img src='./img.png'></img>
                    <img src='./camera.png'></img>
                    <img src='./mic.png'></img>
                </div>
                <input type='text' placeholder='Введите сообщение'
                value={text}
                onChange={e => setText(e.target.value)}>
                </input>
                <div className="emoji">
                    <img src='./emoji.png'
                    onClick={() => setOpen((prev) => !prev)}>
                    </img>
                    <div className="picker">
                        <EmojiPicker open={open} onEmojiClick={handleEmoji} />
                    </div>
                </div>
                <button className='sendButton'>Отправить</button>
            </div>
        </div>
    )
}

export default Chat;