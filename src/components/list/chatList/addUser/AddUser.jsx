import { useState } from 'react';
import './addUser.css'
import { arrayUnion, collection, doc, getDoc, getDocs, query, serverTimestamp,
        setDoc, updateDoc, where
        } from "firebase/firestore";

const AddUser = () => {

    const [user, setUser] = useState(null);
 
    const handleSearch = async(e) => {
            e.preventDefault()
            const formData = new FormData(e.target)
            const username = formData.get("username")

            try {
                const userRef = collection(db, "users");
                const q = query(userRef, where("username", "==", username));
                const querySnapShot = await getDocs(q);

                if (!querySnapShot.empty) {
                    setUser(querySnapShot.docs[0].data());
                } 
            } catch (error) {
                console.log(error);
            }
    }

    const handleAdd = async(e) => {
        const chatRef = collection(db, "chats");
        const userChatRef = collection(db, "userchats");

        try {
            const newChatRef = doc(chatRef);

            await setDoc(newChatRef, {
                createdAt: serverTimestamp(),
                messages: [],
            });
            
            await updateDoc(doc(userChatsRef, user.id), {
                chats: arrayUnion({
                  chatId: newChatRef.id,
                  lastMessage: "",
                  receiverId: currentUser.id,
                  updatedAt: Date.now(),
                }),
              });

              await updateDoc(doc(userChatsRef, currentUser.id), {
                chats: arrayUnion({
                  chatId: newChatRef.id,
                  lastMessage: "",
                  receiverId: user.id,
                  updatedAt: Date.now(),
                }),
              });
              
        } catch (error) {
            console.log(error);
        }
    }


    return (
        //найти пользователя
        <div className="addUser">
            <form onSubmit={handleSearch}>
                <input type='text' placeholder='username' name='username'></input>
                <button>Поиск</button>
            </form>

        {/* добавить найденного пользователя */}
            {user && <div className="user">
                <div className="detail">
                    <img src={user.avatar || './avatar8.png'}></img>
                    <span>{user.username}</span>
                </div>
                <button onClick={handleAdd}>Добавить</button>
            </div>}
        </div>
    )
}

export default AddUser;