import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import {
  CssBaseline,
  Container,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  TextField,
  Grid,
} from '@material-ui/core';
import InboxIcon from '@material-ui/icons/Inbox';

import query from './store';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [name, setName] = useState('');

  const runQuery = () => {
    query(`{
      tasks
    }`)
      .then(data => {
        setTasks(data.data.tasks);
      });
  }

  useEffect(() => {
    runQuery();
  }, []);

  const onAdd = () => {
    query(`mutation($name: String!) {
      addTask(name: $name)
    }`, {
      name
    })
      .then(() => {
        runQuery();
      })
  };

  return (
    <Container>
      <CssBaseline />
      <List>
        {tasks.map((name, index) => (
          <ListItem key={index}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={name} />
          </ListItem>
        ))}
      </List>

      <Grid container spacing={2}>
        <Grid item xs={10}>
          <TextField
            value={name}
            onChange={(evt) => setName(evt.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={2}>
          <Button
            onClick={onAdd}
            variant="contained"
            fullWidth
          >
            Add
          </Button>
        </Grid>
      </Grid>
    </Container>
  )
};

ReactDOM.render(<App />, document.getElementById('app'));
