import './chat.css';

const Chat = () => {
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

            <div className="center">center</div>
            <div className="bottom">bottom</div>
        </div>
    )
}

export default Chat;