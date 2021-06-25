import { Redirect, Route } from "react-router-dom";
import { useContext } from "react";

import {AuthContext} from './../contexts/auth'

function AuthRoute({component: Component, ...rest }){
    const {user} = useContext(AuthContext);

    return (
        <Route
          {...rest}
          render={(props) =>
            user ? <Redirect to="/" /> : <Component {...props} />
          }
        />
      )
}

export default AuthRoute;