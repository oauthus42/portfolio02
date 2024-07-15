import './detail.css';

const Detail = () => {
    return (
        <div className="detail">
            <div className="user">
                <img src='./avatar6.png'></img>
                <h2>Саша</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero provident esse molestiae.</p>
            </div>

            <div className="info">
                <div className="option">
                    <div className="title">
                        <span>Настройки чата</span>
                        <img src='./arrowUp.png'></img>
                    </div>
                </div>

                <div className="option">
                    <div className="title">
                        <span>Конфиденциальность & помощь</span>
                        <img src='./arrowUp.png'></img>
                    </div>
                </div>

                <div className="option">
                    <div className="title">
                        <span>Общие медиа</span>
                        <img src='./arrowDown.png'></img>
                    </div>

                    <div className="photos">
                        <div className="photoItem">
                            <div className="photoDetail">
                                <img src='https://colodu.club/uploads/posts/2022-11/1667450724_14-colodu-club-p-gerbarii-v-interere-vkontakte-14.jpg'></img>
                                <span>photo_2024_0.png</span>
                            </div>
                            <img src='./download.png' className='icon'></img>
                        </div>


                        <div className="photoItem">
                            <div className="photoDetail">
                                <img src='https://colodu.club/uploads/posts/2022-11/1667450724_14-colodu-club-p-gerbarii-v-interere-vkontakte-14.jpg'></img>
                                <span>photo_2024_0.png</span>
                            </div>
                            <img src='./download.png' className='icon'></img>
                        </div>
                    </div>
                </div>
            </div>

        <button className='btnBlockUser'>Заблокировать пользователя</button>
        </div>
    )
}

export default Detail;