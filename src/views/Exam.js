import React,{ useEffect, useContext } from 'react';
import clsx from 'clsx';
import { withRouter } from 'react-router-dom';
import { makeStyles , withStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import MenuIcon from '@material-ui/icons/Menu';
import AccessAlarm from '@material-ui/icons/AccessAlarm';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { green } from '@material-ui/core/colors';
import Divider from '@material-ui/core/Divider';
import SignIn from './SignIn';
import queryString from 'query-string'
import api from '../utils/api';
import { ExamContext } from '../Router'


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


function Exam(props) {
  const examInfoContext = useContext(ExamContext);
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [value, setValue] = React.useState('female');
  const [examInfo, setExamInfo] = React.useState();
  const [activeQuestion, setActiveQuestion] = React.useState(0);
  const [answers, setAnswers] = React.useState(0);

  const handleChangeRadio = (event) => {
    setValue(event.target.value);
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const questionList = () => {
    var question = [];
    for (let index = 0; index < 26; index++) {
        question.push(index)
    }
    return  question
  }
  const [state, setState] = React.useState({
    gilad: true,
    jason: false,
    antoine: false,
  });

  useEffect(() => {
    api('api/exam/exam-info', { method: 'POST' } )
      .then(res => {
        console.log({ res });
      })
      .catch(err => {
        console.log({ err })
      })
  }, [])

  console.log({ match: props.match });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const { gilad, jason, antoine } = state;
  const error = [gilad, jason, antoine].filter((v) => v).length !== 2;
  const ColorButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(green[500]),
      backgroundColor: green[500],
      color: "#ffffff",
      '&:hover': {
        backgroundColor: green[700],
      },
    },
  }))(Button);
  // const examInfo = () => {
  //   const value=queryString.parse(window.location.search);
  //   const link=value.link;
  //   const rateType = value.ratetype;
  //   if(link){
  //       signFx({ ratetype: rateType, branchid: branchId });
  //   }
  // }
  // useEffect(() => {
  //   updateCurrency();
  //   const intervalId = setInterval(() => {  
  //       updateCurrency();
  //      }, 600000)
  //   return  () => clearInterval(intervalId);
  // }, []);
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute"   >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography align="left" component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Amandos Daulet
          </Typography>
          <ColorButton variant="contained" color="green">Аяқтау</ColorButton>
          <IconButton color="inherit">
            <Badge badgeContent={30} color="secondary">
              <AccessAlarm />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>  
      <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg" className={classes.container}>
              {activeQuestion && (
                <Card className={classes.root}>
                    <CardContent>
                        <Typography component="h1" variant="h2" align="left" color="textPrimary">
                            {activeQuestion.text}
                        </Typography>
                        <div style={{margin: "25px", textAlign: "left"}}>
                            <FormControl component="fieldset">
                              <RadioGroup aria-label="gender" name={activeQuestion.id}  onChange={(event) => handleChangeRadio(event, activeQuestion)}>
                                {
                                  activeQuestion.answers.map(a => (
                                        <FormControlLabel value={a.value} control={<Radio />} label={a.label} />
                                  ))
                                }
                              </RadioGroup>
                            </FormControl>
                        </div>
                        <Divider />
                        <div style={{margin: "25px"}}>
                            <Typography component="h6" variant="h6" align="left" color="textPrimary" gutterBottom>
                                Дискриптр
                            </Typography>
                            <Typography  color="textSecondary" gutterBottom>
                                Марал әрқайсысы 8 теңге тұратын 6 қарындаш және 9 теңге тұратын 4 сызғыш сатып алды. Марал барлығына қанша теңге
                            </Typography>
                            <Typography component="h6" variant="h6" align="left" color="textPrimary" gutterBottom>
                                Бағалау критериясы: 
                            </Typography>
                            <Typography  color="textSecondary" gutterBottom>
                                Марал әрқайсысы 8 теңге тұратын 6 қарындаш және 9 теңге тұратын 4 сызғыш сатып алды. Марал барлығына қанша теңге
                            </Typography>
                            <Typography component="h6" variant="h6" align="left" color="textPrimary" gutterBottom>
                                Берілетін балл: 
                            </Typography>
                            <Typography align="left"  color="textSecondary" gutterBottom>
                                10 Балл
                            </Typography>
                        </div>
                        
                    </CardContent>
                </Card>
              )}
                
            </Container>
            <div className={classes.question}>
                {
                    questionList().map((index)=>{
                        return (
                            <Button key={index} variant="contained" color="primary" onClick={() => setActiveQuestion(questionList[index])}>
                                {index} сұрақ
                            </Button>
                        )
                    })
                }
            </div>
          </main>    
    </div>
  );
}

export default withRouter(Exam);
