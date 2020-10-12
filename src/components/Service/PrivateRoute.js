import React from 'react';
import { Redirect ,Route } from "react-router-dom";


const PrivateRoute = ({ render, ...rest}) => {
    const isAuthed = localStorage.getItem('authToken')
    return (
      <Route {...rest} exact
        render = {(props) => (
          isAuthed ? (
            <div>
              {React.createElement(render, props)}
            </div>
          ) :
          (
            <Redirect
              to={{
                pathname: '/',
                state: { from: props.location }
              }}
            />
          )
        )}
      />
    )
  }

export default PrivateRoute;