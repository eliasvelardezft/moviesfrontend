import React, { Component } from 'react';

import { Login } from './views/login/Login';
import CreateUser from './views/createUser/CreateUser';
import Home from './views/home/Home';
import AuthRoute from './AuthRoute';


// import {
//     Route,
//     BrowserRouter as Router,
//     Switch
// } from 'react-router-dom';

import  {
    Route,
    HashRouter as Router,
    Switch
} from 'react-router-dom';

const App = (props) => {
    return (
        <Router>
            <Switch>
                <Route
                    exact path='/'
                    component={Login}
                />
                <Route
                    exact path='/create-user'
                    component={CreateUser}
                />
                <AuthRoute
                    path='/home'
                    Component={Home}
                />
            </Switch>
        </Router>
    )
}

export default App;
