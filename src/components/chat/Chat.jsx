import { useEffect, useRef, useState } from 'react';
import './chat.css';
import EmojiPicker from 'emoji-picker-react';
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { useChatStore } from '../../lib/chatStore';
import { useUserStore } from '../../lib/userStore';

const Chat = () => {
const [open, setOpen] = useState(false);
const [text, setText] = useState("");
const [chat, setChat] = useState();
const {chatId, user} = useChatStore();
const {currentUser} = useUserStore();

//автоматический скролл чата вниз при загрузке\обновлении страницы
const endRef = useRef(null);

useEffect(() => {
    endRef.current?.scrollIntoView({behavior:'smooth'});
}, []);

useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
      setChat(res.data());
    });

    return () => {
      unSub();
    };
  }, [chatId]);



const handleEmoji = (e) => {
    setText ((prev) => prev + e.emoji)
    setOpen(false)
}

const handleSend = async () => {
    if (text === "") return;
    let imgUrl = null;

    try {
      if (img.file) {
        imgUrl = await upload(img.file);
      }
      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          senderId: currentUser.id,
          text,
          createdAt: new Date(),
          ...(imgUrl && { img: imgUrl }),
        }),
      });

      const userIDs = [currentUser.id, user.id];

      userIDs.forEach(async (id) => {
        const userChatsRef = doc(db, "userchats", id);
        const userChatsSnapshot = await getDoc(userChatsRef);

        if (userChatsSnapshot.exists()) {
          const userChatsData = userChatsSnapshot.data();

          const chatIndex = userChatsData.chats.findIndex((c) => c.chatId === chatId);

          userChatsData.chats[chatIndex].lastMessage = text;
          userChatsData.chats[chatIndex].isSeen =
            id === currentUser.id ? true : false;
          userChatsData.chats[chatIndex].updatedAt = Date.now();

          await updateDoc(userChatsRef, {
            chats: userChatsData.chats,
          });
        }
      });
    } catch (err) {
      console.log(err);
    } finally{
    setImg({
      file: null,
      url: "",
    });

    setText("");
    }
  };


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
            {chat?.messages?.map(message => (
                <div className="message" key={message?.createAt}>
                    <img src='./avatar6.png'></img>
                    <div className="texts">
                        {message.img && 
                        <img src={message.img}>
                        </img>}
                        <p>{message.text}</p>
                        <span>4 минуты назад</span>
                    </div>
                </div>
            ))}

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
                <button className='sendButton' onClick={handleSend}>Отправить</button>
            </div>
        </div>
    )
}

export default Chat;