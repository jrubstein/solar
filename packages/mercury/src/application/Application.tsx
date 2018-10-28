import 'reflect-metadata'
import React from 'react'
import { Switch, Route, Redirect, Link } from 'react-router-dom'
import Loadable from 'react-loadable'
import { Helmet } from 'react-helmet'

const LoginComponent = Loadable({
    loader: () => import('../components/Login'),
    loading: () => <div></div>
})


export class Application extends React.Component {
    render() {
        return (
        <React.Fragment>
             <Helmet>
                <title>This is mercury</title>
            </Helmet>
            <Switch>
                <Route path="/login" component={LoginComponent} />
                <Redirect from="*" to="/login" />
            </Switch>
            <ul>
                <li><Link to="/login">Login</Link></li>
            </ul>
        </React.Fragment>
        )
    }
}
