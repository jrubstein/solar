import 'reflect-metadata'
import React from 'react'
import { Switch, Route, Redirect, Link } from 'react-router-dom'
import Loadable from 'react-loadable'
import { Helmet } from 'react-helmet'
import { ProtectedRoute } from '../services/router/ProtectedRoute';

const LoginComponent = Loadable({
    loader: () => import('../components/login'),
    loading: () => <div></div>
})


export class Application extends React.Component {
    render() {
        return (
        <React.Fragment>
             <Helmet>
                <title>This is mercury 22</title>
            </Helmet>
            <Switch>
                <Route path="/login" component={LoginComponent} />
                <ProtectedRoute path="/dashboard" component={() => <div>dashboard</div>} />
                <Redirect from="*" to="/login" />
            </Switch>
            <ul>
                <li><Link to="/login">Login</Link></li>
            </ul>
        </React.Fragment>
        )
    }
}
