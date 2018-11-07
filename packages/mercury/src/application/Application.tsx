import 'reflect-metadata'
import React from 'react'
import { Switch, Route, Redirect, Link } from 'react-router-dom'
import Loadable from 'react-loadable'
import { Helmet } from 'react-helmet'
import { ProtectedRoute } from '../services/router/ProtectedRoute'
import { PublicRoute } from '../services/router/PublicRoute'

const LoginComponent = Loadable({
  loader: () => import('../views/login'),
  loading: () => <div />,
})

const DashbordComponent = Loadable({
  loader: () => import('../views/dashboard'),
  loading: () => <div />,
})

export class Application extends React.Component {
  public render() {
    return (
      <React.Fragment>
        <Helmet>
          <title>This is mercury 22</title>
        </Helmet>
        <Switch>
          <ProtectedRoute path="/dashboard" component={DashbordComponent} />
          <PublicRoute path="/login" component={LoginComponent} />
          <Redirect from="*" to="/dashboard" />
        </Switch>
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </React.Fragment>
    )
  }
}
