import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import {useUser} from 'reactfire';
import Login from './views/login'
import Register from './views/register'
import Dashboard from './views/User/Dashboard'
import Welcome from './views/Welcome'

const Rutas = () => {
    const User = useUser()

    return (
        <div>
            <Router>
                <Switch>
                    <Route path="/Login">
                        { User.hasEmitted ? <Dashboard /> : <Login /> }
                    </Route>
                    <Route path="/Register">
                        { User.hasEmitted ? <Dashboard /> : <Register /> }
                    </Route>
                    <Route path="/Dashboard">
                        { User.hasEmitted ? <Dashboard /> : <Welcome /> }
                    </Route>
                    <Route path="/">
                        {User.hasEmitted ? <Dashboard /> : <Welcome /> }
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}
 
export default Rutas;