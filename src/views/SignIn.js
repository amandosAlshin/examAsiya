import React, { useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import AssignmentInd from '@material-ui/icons/AssignmentInd';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import queryString from 'query-string';
import api from '../utils/api';
import { ExamContext } from '../Router'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const apiUrl = process.env.REACT_APP_API;

export default function SignIn(props) {
  const classes = useStyles();
  const history = useHistory()
  const examContextConsumer = useContext(ExamContext)
  const qs = queryString.parse(window.location.search);
  const link = qs.link

  const onSubmit = (event) => {
    event.preventDefault();
    const { target } = event;
    const body = {
      firstname: target.firstname.value,
      surname: target.surname.value,
      link: link,
    }

    api(`api/exam/student-insert`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: new Headers({
        'Content-Type': "application/json"
      })
    }).then(res => {
      console.log({ res });
      if (res.type === 'ok') {

        history.push({ pathname: `exam`, state: { res : res.examInfo } });
        // history.push('exam');
      }
    }).catch(err => {
      console.log({err});
    })
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AssignmentInd />
        </Avatar>
        <Typography component="h1" variant="h5">
          БЖБ
        </Typography>
        <form onSubmit={onSubmit} className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="surname"
            label="Тегіңіз"
            name="surname"
            autoComplete="surname"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="firstname"
            label="Атыңыз"
            name="firstname"
            autoComplete="firstname"
            autoFocus
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
          >
            Тапсыру
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Сабақтар
          </Button>
          
        </form>
      </div>
    </Container>
  );
}
