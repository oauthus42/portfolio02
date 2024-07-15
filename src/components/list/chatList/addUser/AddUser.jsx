import './addUser.css'

const AddUser = () => {
    return (
        //найти пользователя
        <div className="addUser">
            <form>
                <input type='text' placeholder='username' name='username'></input>
                <button>Поиск</button>
            </form>

        {/* добавить найденного пользователя */}
            <div className="user">
                <div className="detail">
                    <img src='./avatar8.png'></img>
                    <span>Дмитрий</span>
                </div>
                <button>Добавить</button>
            </div>
        </div>
    )
}

export default AddUser;