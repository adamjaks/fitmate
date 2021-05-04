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
