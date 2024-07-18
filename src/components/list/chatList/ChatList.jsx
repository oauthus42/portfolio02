import "./chatList.css";
import { useEffect, useState } from "react";
import { useUserStore } from "../../../lib/userStore";
import { useChatStore } from "../../../lib/chatStore";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import AddUser from "./addUser/AddUser";

const ChatList = () => {
    const [addMode, setAddMode] = useState(false);
    const [chats, setChats] = useState([]);
    const currentUser = useUserStore();
    const {chatId,  changeChat} = useChatStore();

    useEffect(() => {
        const unsub = onSnapshot(doc(db, "userchats", currentUser.id), async (res) => {
            const items = res.data().chats;

            const promises = items.map( async(item) => {
                const userDocRef = doc(db, "users", item.receiverId);
                const userDocSnap = await getDoc(userDocRef);

                const user = userDocSnap.data();
                return {...item, user};

            });

            const chatData = await Promise.all(promises);
            setChats(chatData.sort((a, b) => b.updateAt - a.updateAt)); 
        });

        return () => { unsub()};

    }, [currentUser.id]);


    const handleSelect = async (chat) => {
        const userChats = chats.map((item) => {
            const { user, ...rest } = item;
            return rest;
        });
    
        const chatIndex = userChats.findIndex((item) => item.chatId === chat.chatId);
    
        userChats[chatIndex].isSeen = true;
        const userChatsRef = doc(db, "userchats", currentUser.id);
    
        try {
          await updateDoc(userChatsRef, {
            chats: userChats,
          });
          changeChat(chat.chatId, chat.user);
        } catch (err) {
          console.log(err);
        }
    };

    console.log(chats);

    return (
        <div className="chatList">
            <div className="search">
                <div className="searchBar">
                    <img src='./search.png'></img>
                    <input type='text' placeholder='Поиск'
                        onChange={(e) => setInput(e.target.value)}>
                    </input>
                </div>
                {/* //переключалка плюс/минус (добавить/удалить) */}
                <img src= {addMode ? "./minus.png" : "./plus.png"} className='add'
                    onClick={() => setAddMode((prev) => !prev)}>
                </img>
            </div>
            
            {/* элементы чата */}
            {filteredChats.map((chat) => (

                <div className="item" key={chat.chatId} onClick={handleSelect(chat)}
                // если сообщение прочитано - фон прозрачный, если нет - синий:
                style={{backgroundColor: chat ?.isSeen ? "transparent" : "#5183ff"}}>
                    <img src={chat.user.blocked.includes(currentUser.id) ? 
                            "./avatar.png" : chat.user.avatar || "./avatar.png"}>
                    </img>
                    <div className="texts">
                        <span>{chat.user.blocked.includes(currentUser.id) ? "User" : chat.user.username}</span>
                        <p>{chat.lastMessage}</p>
                    </div>
                </div>
            ))}
            {addMode && <AddUser />}
        </div>
    );
};

export default ChatList;