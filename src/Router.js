import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import SignIn from './views/SignIn'
import End from './views/End'
import Lessons from './views/Lessons'
import App from './App'

export const ExamContext = React.createContext({
  examInfo: null,
  setExamInfo: () => {},
});

export default function Routers() {
    return (
      <Router>
        <ExamContext.Provider>
        <div>
          <Switch>
            <Route path="/sign">
              <SignIn />
            </Route>
            <Route path="/exam">
              <App />
            </Route>
            <Route path="/result">
              <End />
            </Route>
            <Route path="/lessons">
              <Lessons />
            </Route>
            <Redirect to="/sign" />
          </Switch>
        </div>
        </ExamContext.Provider>
      </Router>
    );
  }