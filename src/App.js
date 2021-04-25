import { useDispatch, useSelector } from "react-redux";
import React, { useReducer, useState } from 'react';
import "./App.css";
import { addUser, deleteUser, fetchUsers, setPage } from "./redux/slices/usersSlice";
import { AppBar, Avatar, Box, Button, Card, Container, CssBaseline, Dialog, DialogContent, DialogTitle, Grid, IconButton, makeStyles, TextField, Toolbar, Typography } from '@material-ui/core';
import { Delete as DeleteIcon, Edit as EditIcon} from '@material-ui/icons/';
import { Pagination } from '@material-ui/lab';
import { deepOrange, deepPurple, lightBlue, red } from "@material-ui/core/colors";

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
  const handlePageChange = ( e, page ) => {
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
/*==Style for project==*/
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    addButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    cardContaiber: {
      marginTop: theme.spacing(2)
    },
    cardItem: {
      padding: theme.spacing(2),
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    button: {
      margin: theme.spacing(1),
    },
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
    text: {
      marginLeft: theme.spacing(2)
    },
    pagination: {
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(1)
    },
    inputs: {
      marginBottom: theme.spacing(2)
    },
    orange: {
      backgroundColor: deepOrange[500]
    },
    purple: {
      backgroundColor: deepPurple[500]
    },
    red: {
      backgroundColor: red[500]
    },
    blue: {
      backgroundColor: lightBlue[500]
    }
  }));

//Задаём массив из цветов
const colors = [ 'orange', 'purple', 'red', 'blue' ];

const getIndex = ( max ) => {
  return Math.floor(Math.random() * max);
}

  const classes = useStyles();

  return (
    <>
      <CssBaseline />
      <Container maxWidth="md">
        <AppBar position="static">
          <Toolbar disableGutters={false} variant="dense">
            <Typography variant="h6" className={classes.title}>All Users</Typography>
            <Button color="inherit" onClick={handleOpenForm} className={classes.addButton}>Add User</Button>
          </Toolbar>
        </AppBar>
      </Container>
      <Container maxWidth="md">
        <Grid container
            justify="center"
            spacing={2}
            className={classes.cardContaiber}  
        >
          {
            currentUsers.map( (user) => (
              <Grid item md={8} key={user.id}>
                <Card className={classes.cardItem}>
                  <Grid container alignItems='center'>
                    {
                      user.avatar 
                      ? <Avatar alt={`${user.name} ${user.surname}`} src={user.avatar} />
                      : <Avatar className={`${classes.large} ${classes[colors[getIndex(colors.length)]]}`} >
                          {user.name.charAt(0).toUpperCase()}
                        </Avatar>
                    }
                    <Box className={classes.text}>
                      <Typography>{user.name}</Typography>
                      <Typography>{user.surname}</Typography>
                      <Typography>{user.desc}</Typography>
                    </Box>
                  </Grid>
                    <IconButton aria-label="edit">
                      <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={() => handleDelUser(user.id)}>
                      <DeleteIcon />
                    </IconButton>
                </Card>
              </Grid>
            ))
          }
        </Grid>
        <Grid container justify='center' className={classes.pagination}>
          <Pagination color='primary' count={lengthPagination} page={currentPage} onChange={handlePageChange}/>
        </Grid>
      </Container>

    {
      //Модальное окно с формой для добаления пользователя
    }
      <Dialog open={openForm} onClose={handleCloseForm} maxWidth="xs">
        <DialogTitle>Create new user</DialogTitle>
        <DialogContent>
            <form onSubmit={handleSubmit}>
              <TextField autoFocus 
                        label="Name" 
                        type="text" 
                        id="name"
                        name="name" 
                        variant="outlined"
                        margin="dense" 
                        fullWidth
                        onChange={handleInputChange}
                        />
              <TextField label="Surname" 
                          type="text" 
                          id="surname"
                          name="surname"
                          margin="dense" 
                          variant="outlined"
                          fullWidth
                          onChange={handleInputChange}
                          />
              <TextField label="Description" 
                          type="text" 
                          id="descr"
                          name="desc"
                          margin="dense" 
                          variant="outlined" 
                          fullWidth
                          onChange={handleInputChange}
                          />
              <Button onClick={handleCloseForm} color="secondary">Close</Button>
              <Button type="submit" color="primary">Create</Button>
            </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default App;
