import React, { Fragment } from 'react';
import {
  Redirect,
  Route,
} from 'react-router-dom'

const PrivateRoute = ({ layout: Layout, component: Component, ...rest } : any) => {
  const handleAuth = (props: any) => (
    localStorage.getItem('token')
      ? (Layout ? <Layout {...props} component={Component} />
      : <Route {...props} component={Component}/>)
      : <Redirect to='/login' />
  )
  return handleAuth(rest);
}

export default PrivateRoute