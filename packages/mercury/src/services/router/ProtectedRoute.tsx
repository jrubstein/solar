import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';

const protectedRouteHoc = ({ component: Component, authToken, ...rest }) => (
    <Route {...rest} render={(props) => (
      !!authToken ? <Component {...props} /> : <Redirect to='/login' />
    )} />
)

const mapStateToProps = ({auth: {authToken}}) => {
    return {
        authToken
    }
}

export const ProtectedRoute = connect(mapStateToProps)(protectedRouteHoc)
