import React from 'react';
import {
  Route,
  Redirect
} from 'react-router-dom';

const AuthRoute = ({ Component, path, exact = false }) => {
  const isAuthed = !!localStorage.getItem('token');
  const message = 'Log in to view this page!';
  return (
    <Route 
      exact={exact}
      path={path}
      render={(props) => 
        isAuthed ? 
        (<Component {...props}/>)
        :
        (<Redirect
          to={{
            pathname: '/',
            state: {
              message,
              requestedPath: path
            }
          }}
        />)  
      }
    />
  )
}
export default AuthRoute;

