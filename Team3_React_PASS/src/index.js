import React from 'react';
import ReactDOM from 'react-dom';

import {
    HashRouter,
    Route,
    Switch
} from 'react-router-dom';

import App from 'containers/App/App.jsx';
import Login from 'views/Login/Login.jsx'
import './assets/css/bootstrap.min.css';
import './assets/css/animate.min.css';
import './assets/sass/light-bootstrap-dashboard.css';
import './assets/css/demo.css';
import './assets/css/pe-icon-7-stroke.css';




ReactDOM.render((
    <HashRouter>
        <Switch>
            {<Route path="/app" name="App" component={App}/>}
            {<Route path="/" name="Home" component={Login}/>}
        </Switch>
    </HashRouter>
),document.getElementById('root'));
