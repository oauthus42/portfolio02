import './detail.css';
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useChatStore } from "../../lib/chatStore";
import { auth, db } from "../../lib/firebase";
import { useUserStore } from "../../lib/userStore";


const Detail = () => {
    const { chatId, user, isCurrentUserBlocked, isReceiverBlocked, changeBlock, resetChat } = useChatStore();
    const { currentUser } = useUserStore();
  
    const handleBlock = async () => {
        if (!user) return;
        const userDocRef = doc(db, "users", currentUser.id);
        
        try {
            await updateDoc(userDocRef, {
            blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
        });
        changeBlock();

        } catch (err) {
            console.log(err);
        }
    };
  

    return (
        <div className="detail">
            <div className="user">
                <img src={user?.avatar || "./avatar.png"} alt=""></img>
                <h2>{user?.username}</h2>
                <p>Lorem ipsum dolor sit amet.</p>
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

            <button onClick={handleBlock}>
                {isCurrentUserBlocked ? "Вы заблокированы" : isReceiverBlocked 
                ? "Заблокированный пользователь" : "Заблокировать пользователя"}
            </button>
        </div>
    );
};

export default Detail;