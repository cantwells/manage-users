import { useDispatch, useSelector } from "react-redux";
import React, { useState } from 'react';
import "./index.css";
import { addUser, deleteUser, fetchUsers, editUser, setPage } from "./redux/slices/usersSlice";
import { Header } from "./components/Header";
import { Card } from "./components/Card";
import { Pagination } from "./components/Pagination";
import { Modal } from "./components/Modal";

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

  const [usrObj, setUsrObj] = useState('');

/*==Form to add user==*/
  const [ openForm, setOpenForm ] = useState(false);

  const handleOpenForm = () => {
    setOpenForm(true);
  }

  const handleCloseForm = () => {
    setOpenForm(false);
    if(usrObj){
      setUsrObj('');
    }
  }
//Обработчик при отправке формы
  const handleAddSubmit = ( data, e ) => {
    dispatch(addUser(data));
    e.target.reset();
    handleCloseForm();
  }

  const handleEditSubmit = ( data, e ) => {
    dispatch(editUser(data));
    e.target.reset();
    handleCloseForm();
  }
//Удаление пользователя
const handleDelUser = (id) => {
  dispatch( deleteUser(id) );
}
//Редактирование пользователя
const handleEditUser = id => {
  setOpenForm(true);
  const user = users.find( user=> user.id === id);
  setUsrObj(user);
}


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
                        onEditUser={() => handleEditUser(user.id)} 
                      />
                ))
              }
        </div>
      </div>

          <Pagination className='center' count={lengthPagination} page={currentPage} onChange={handlePageChange}/>
    {
      //Модальное окно с формой для добаления пользователя
      openForm && <Modal onSubmit={usrObj ? handleEditSubmit : handleAddSubmit} onCloseForm={handleCloseForm} usrObj={usrObj}/>
    }
    </>
  );
}

export default App;
