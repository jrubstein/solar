import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

const protectedRouteHoc = ({ component: Component, authToken, ...rest }) => {
  if (!authToken) {
    // TODO: save rest.location
    return <Redirect to="/login" />
  }

  return <Route {...rest} render={props => <Component {...props} />} />
}

const mapStateToProps = ({ auth: { authToken } }) => {
  return {
    authToken,
  }
}

export const ProtectedRoute = connect(mapStateToProps)(protectedRouteHoc)
