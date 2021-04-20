import { useDispatch, useSelector } from "react-redux";
import React from 'react';
import "./App.css";
import { fetchUsers } from "./redux/slices/usersSlice";
import { AppBar, Avatar, Box, Button, Card, Container, CssBaseline, Grid, IconButton, makeStyles, Toolbar, Typography } from '@material-ui/core';
import { Delete as DeleteIcon, Edit as EditIcon} from '@material-ui/icons/';

function App() {
  const dispatch = useDispatch();
  React.useEffect( () => {
    dispatch(fetchUsers());
  },[dispatch] )

  const users = useSelector( ({users}) => users.items );

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
    }
  }));
  const classes = useStyles();

  return (
    <>
      <CssBaseline />
      <Container maxWidth="md">
        <AppBar position="static">
          <Toolbar disableGutters={false} variant="dense">
            <Typography variant="h6" className={classes.title}>All Users</Typography>
            <Button color="inherit" className={classes.addButton}>Add User</Button>
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
            users.map( (user) => (
              <Grid item md={8} key={user.id}>
                <Card className={classes.cardItem}>
                  <Grid container alignItems='center'>
                    <Avatar className={classes.large}>{user.name.charAt(0)}</Avatar>
                    <Box className={classes.text}>
                      <Typography>{user.name}</Typography>
                      <Typography>{user.surname}</Typography>
                      <Typography>{user.desc}</Typography>
                    </Box>
                  </Grid>
                    <IconButton aria-label="edit">
                      <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                </Card>
              </Grid>
            ))
          }
        </Grid>
      </Container>
    </>
  );
}

export default App;
