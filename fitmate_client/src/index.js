import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { Provider } from "react-redux";

import './index.scss';

import LoginPage from "./components/pages/LoginPage/LoginPage";
import RegisterPage from "./components/pages/RegisterPage/RegisterPage";
import Main from "./components/pages/Main/Main";
import CalendarPage from "./components/pages/CalendarPage/CalendarPage";
import ProgressPage from "./components/pages/ProgressPage/ProgressPage";
import TrainingsPage from "./components/pages/TrainingsPage/TrainingsPage";
import ExercisesPage from "./components/pages/ExercisesPage/ExercisesPage";
import AddTrainingPage from "./components/pages/AddTrainingPage/AddTrainingPage"
import AddExercisePage from "./components/pages/AddExercisePage/AddExercisePage"
import PrivateRoute from "./components/sections/utils/PrivateRoute/PrivateRoute";
import setAuthToken from "./components/utils/setAuthToken";

import store from "./store/store";
import { setCurrentUserAction, logoutUserAction } from "./store/actions/authActions";

if (localStorage.jwtToken) {
    const token = localStorage.jwtToken;
    setAuthToken(token);

    const decoded = jwt_decode(token);
    store.dispatch(setCurrentUserAction(decoded));

    const currentTime = Date.now() / 1000;

    if (decoded.exp < currentTime) {
        store.dispatch(logoutUserAction());
        window.location.href = "./login";
    }
}

// todo: rewrite to dissent component
ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <Router>
                <div className="App">
                    <Route exact path="/login" component={LoginPage}/>
                    <Route exact path="/register" component={RegisterPage}/>
                    <Route exact path="/calendar" component={CalendarPage}/>
                    <Route exact path="/progress" component={ProgressPage}/>
                    <Route exact path="/exercises" component={ExercisesPage}/>
                    <Route exact path="/exercises/add" component={AddExercisePage}/>
                    <Route exact path="/trainings" component={TrainingsPage}/>
                    <Route exact path="/trainings/add" component={AddTrainingPage}/>
                    <Switch>
                        <PrivateRoute exact path="/" component={Main} />
                    </Switch>
                </div>
            </Router>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();
