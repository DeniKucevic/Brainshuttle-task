//import React from "react";
//import { Route, Redirect } from "react-router-dom";
//import { isLogin } from "../../services/auth.service";
//
//export const PrivateRoute = ({ component: Component, ...rest }) => {
//    return (
//        <Route
//            {...rest}
//            render={(props) =>
//                isLogin() ? <Component {...props} /> : <Redirect to="/login" />
//            }
//        />
//    );
//};

//export default PrivateRoute;


import React from "react";
import { Route } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
    return <Route {...rest} render={(props) => <Component {...props} />} />;
};

export default PrivateRoute;