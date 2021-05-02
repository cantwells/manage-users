import { useDispatch, useSelector } from "react-redux";
import React, { useReducer, useState } from 'react';
import "./index.css";
import { addUser, deleteUser, fetchUsers, setPage } from "./redux/slices/usersSlice";
import { Header } from "./components/Header";
import { Card } from "./components/Card";
import { Pagination } from "./components/Pagination";

function App() {
  const dispatch = useDispatch();
  //Получение данных из стейта
  const { items: users, currentPage, pageLimit, isLoaded } = useSelector( ({users}) => users );
  //Получаем всех пользователей
  React.useEffect( () => {
    dispatch(fetchUsers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[] );
  /*==PAGINATION==*/
  //Получаем количество страниц
  const lengthPagination =  Math.ceil(users.length / pageLimit);
  //Состояние для переключения страниц
  const [ currentUsers, setCurrentUsers ] = useState([]);
  
/*При запуске приложения, после загрузки пользовтелей, 
показывваем первую страницу с пользователями*/
  React.useEffect( () => {
    if(isLoaded){
      console.log(users);
      //Определяем начального пользователя для текущего номера страницы
      const offset = ( currentPage - 1 ) * pageLimit;
      //Устанавливаем массив из узеров для вывода на страницу
      setCurrentUsers( users.slice( offset, offset+pageLimit ) )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[isLoaded, users] );

//Оброботчие переключения страниц
  const handlePageChange = ( page ) => {
    const offset = ( page - 1 ) * pageLimit;
    setCurrentUsers( users.slice( offset, offset+pageLimit ) )
    dispatch( setPage({page}) );
  }

/*==Form to add user==*/
  const [ openForm, setOpenForm ] = useState(false);

  const handleOpenForm = () => {
    setOpenForm(true);
  }

  const handleCloseForm = () => {
    setOpenForm(false);
  }
//Стейт для получения данных из формы
  const [ formData, setFormData ] = useReducer( ( state, newState) => {
    return {...state, ...newState}
  },
    {
      "name": "",
      "surname": "",
      "desc": "",
      "avatar": ""
    }
  )
//Обработчик при отправке формы
  const handleSubmit = ( event ) => {
    event.preventDefault();
    dispatch(addUser(formData));
    handleCloseForm();
  }
//Получение данных из инпута
  const handleInputChange = (event) => {
    const input = event.target.name;
    const value = event.target.value;
    setFormData( {[input]: value} )
  }
//Удаление пользователя
const handleDelUser = (id) => {
  dispatch( deleteUser(id) );
}
//Редактирование пользователя
// const handleEditUser = id => {
//   setOpenForm(true);
//   const user = users.find( user=> user.id === id);
//   console.log(user);
// }


//Задаём массив из цветов
const colors = [ 'orange', 'purple', 'red', 'blue', 'green' ];

const getIndex = ( max ) => {
  return Math.floor(Math.random() * max);
}

  return (
    <>
      <div className="container">
        <Header onOpenForm={handleOpenForm}/>
            <div className="cards">
              {
                currentUsers.map( (user) => (
                  <Card key={user.id}
                        name={user.name} 
                        surname={user.surname} 
                        desc={user.desc}
                        color={ colors[getIndex(colors.length)] }
                        onDelUser={() => handleDelUser(user.id)} 
                      />
                ))
              }
        </div>
      </div>

          <Pagination className='center' count={lengthPagination} page={currentPage} onChange={handlePageChange}/>
    {
      //Модальное окно с формой для добаления пользователя
      openForm && <div className="overlay modal__add">
        <div className="modal-content">
          <h5>Create new user</h5>
          <form onSubmit={handleSubmit}>
            <div className="input-field">
              <input name="name" type="text" placeholder="Name"/>
            </div>
            <div className="input-field">
              <input name="surname" type="text" placeholder="Surname"/>
            </div>
            <div className="input-field">
              <input name="desc" type="text" placeholder="Description"/>
            </div>
            <div className="modal-footer">
              <button onClick={handleCloseForm} className="waves-effect red waves-red btn left">Close</button>
              <button className="waves-effect waves-green btn right">Add</button>
            </div>
          </form>
        </div>
      </div>
    }
    </>
  );
}

export default App;
