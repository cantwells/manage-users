import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import "../index.css";
import {
  addUser,
  deleteUser,
  fetchUsers,
  editUser,
  setPage,
} from "../redux/slices/usersSlice";
import { Header } from "./Header";
import { Card } from "./Card";
import { Pagination } from "./Pagination";
import { Modal } from "./Modal";
import { useHistory, useParams } from "react-router";
import { Alert } from "./Alert";

export const Home = React.memo(() => {

  const history = useHistory();
  //Получаем значение из параметра в url
  let { page } = useParams();
  
  
  const dispatch = useDispatch();
  //Получение данных из стейта
  const { items: users, currentPage, pageLimit, isLoaded, error } = useSelector(
    ({ users }) => users
    );
  /*При запуске приложения, после загрузки пользовтелей, 
показывваем первую страницу с пользователями*/
    React.useEffect( () => {
      //Если параметра нет, то устанавливаем его беря значение из стейта
      if(!page){
        history.push(`/${currentPage}`);
      }else {
        //Если параметр установлен, то передаём его в стей. Т.к. параметр приходит строкой,
        //перед тем как передавать его приводим к числу
        dispatch( setPage({page: +page}) )
      }
      // eslint-disable-next-line
    },[]);
    React.useEffect( () => {
      if (isLoaded) {
        //Определяем начального пользователя для текущего номера страницы
        const offset = (currentPage - 1) * pageLimit;
        //Устанавливаем массив из узеров для вывода на страницу
        setCurrentUsers(users.slice(offset, offset + pageLimit));
      }
    // eslint-disable-next-line
    },[isLoaded, users, currentPage])
    //Получаем всех пользователей
  React.useEffect(() => {
    dispatch(fetchUsers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /*==PAGINATION==*/
  //Получаем количество страниц
  const lengthPagination = Math.ceil(users.length / pageLimit);
  //Состояние для переключения страниц
  const [currentUsers, setCurrentUsers] = useState([]);

  //Оброботчие переключения страниц
  const handlePageChange = (page) => {
    const offset = (page - 1) * pageLimit;
    setCurrentUsers(users.slice(offset, offset + pageLimit));
    dispatch(setPage({ page }));
  };
  //Объект для хранения данных пользователя для изменения
  const [usrObj, setUsrObj] = useState("");

  /*==Form to add user==*/
  const [openForm, setOpenForm] = useState(false);

  //Обработчики для открытия и закрытия модалки с формой
  const handleOpenForm = () => {
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    if (usrObj) {
      setUsrObj("");
    }
  };
  //Обработчик для отправке формы при добавлении пользователя
  const handleAddSubmit = (data, e) => {
    dispatch(addUser(data));
    e.target.reset();
    handleCloseForm();
  };
  //Обработчик для отправке формы для изменения пользователя
  const handleEditSubmit = (data, e) => {
    dispatch(editUser(data));
    e.target.reset();
    handleCloseForm();
  };
  //Удаление пользователя
  const handleDelUser = (id) => {
    dispatch(deleteUser(id));
  };
  //Редактирование пользователя
  const handleEditUser = (id) => {
    setOpenForm(true);
    const user = users.find((user) => user.id === id);
    setUsrObj(user);
  };

  //Задаём массив из цветов
  const colors = ["orange", "purple", "red", "blue", "green"];
  //Возвращаем рендомный
  const getIndex = (max) => {
    return Math.floor(Math.random() * max);
  };

  return (
    <>
    {
      error
      ? <Alert message={error} />
      : 
      <div className="container">
        <Header onOpenForm={handleOpenForm} />
        <div className="cards">
          {currentUsers.map((user) => (
            <Card
              key={user.id}
              name={user.name}
              surname={user.surname}
              desc={user.desc}
              color={colors[getIndex(colors.length)]}
              onDelUser={() => handleDelUser(user.id)}
              onEditUser={() => handleEditUser(user.id)}
            />
          ))}
        </div>
        <Pagination
          className="center"
          count={lengthPagination}
          page={currentPage}
          onChange={handlePageChange}
        />
      </div>
    }

      {
        //Модальное окно с формой для добаления пользователя
        openForm && (
          <Modal
            onSubmit={usrObj ? handleEditSubmit : handleAddSubmit}
            onCloseForm={handleCloseForm}
            usrObj={usrObj}
          />
        )
      }
    </>
  );
});
