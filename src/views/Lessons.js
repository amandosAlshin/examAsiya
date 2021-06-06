import React,{useEffect} from 'react';
import clsx from 'clsx';
import { makeStyles , withStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
const useStyles = makeStyles((theme) => ({
    
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  formControl: {
    margin: theme.spacing(3),
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  question: {
    '& > *': {
        margin: theme.spacing(1),
      },
  }
}));


export default function Lessons() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
        <div>
          <AppBar position="absolute"   >
            <Toolbar className={classes.toolbar}>
              <Typography align="left" component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                1 class Informatika
              </Typography>
            </Toolbar>
          </AppBar>  
          <main className={classes.content}>
              
            <div className={classes.appBarSpacer} />
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                Section 1
              </Typography>
            <Container maxWidth="lg" className={classes.container}> 
            
              <Typography component="h1" variant="h2" align="left" color="textPrimary" gutterBottom>
                Lesson 1
              </Typography>
            </Container>
          </main>    
        </div>
    </div>
  );
}
