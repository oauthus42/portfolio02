import './userInfo.css';

const UserInfo = () => {
    return (
        <div className="userInfo">
            <div className='user'>
                <img src='./avatar.png'></img>
                <h3>Polina Zhuravleva</h3>
            </div>
            <div className='icons'>
                <img src='./more.png'></img>
                <img src='./video.png'></img>
                <img src='./edit.png'></img>
            </div>

        </div>
    )
}

export default UserInfo;