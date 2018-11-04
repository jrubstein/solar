import 'reflect-metadata'
import React from 'react'
import { Switch, Route, Redirect, Link } from 'react-router-dom'
import Loadable from 'react-loadable'
import { Helmet } from 'react-helmet'
import { ProtectedRoute } from '../services/router/ProtectedRoute'

declare global {
  interface Window {
    localStorage: {
      getItem: (item: string) => string
      setItem: (item: string, value: any) => void
      removeItem: (item: string) => void
    }
  }
}

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
          <Route path="/login" component={LoginComponent} />
          <ProtectedRoute path="/dashboard" component={DashbordComponent} />
          <Redirect from="*" to="/login" />
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
