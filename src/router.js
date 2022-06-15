import React from "react";
import { Route, Redirect } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
// import { connect } from 'react-redux';
import asyncComponent from "./util/asyncComponent";
// import Signup from './containers/pages/Signup/Signup'
// import AdminPortal from './containers/AdminPortal/AdminPortal'
// import AdminAddUniversity from './containers/pages/AdminAddUniversity/AdminAddUniversity'
// // import App from './containers/App/App';
// // import AppClinic from './containers/AppClinic/App';
// // import AppAdmin from './containers/AppAdmin/App';
// // import asyncComponent from './util/AsyncComponent';
// // import Auth0 from './helpers/auth0';
// // import { BrowserRouter } from 'react-router-dom'

const PrivateRoute = ({ component: Component, isAllowed, ...rest }) => (
    <Route
        {...rest}
        render={(props) =>
            localStorage["isLoggedIn"] && localStorage.getItem("userInfo") ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: "/",
                        state: { from: props.location },
                    }}
                />
            )
        }
    />
);
// const AdminRoute = ({ component: Component,isLoggedIn, role, ...rest }) => (
//   <Route
//     {...rest}
//     render={props =>
//       role === 'admin' && isLoggedIn === true ? (
//         <Component {...props} />
//       ) : (
//           <Redirect
//             to={{
//               pathname: '/',
//               state: { from: props.location },
//             }}
//           />
//         )
//     }
//   />
// );
const PublicRoutes = ({ history, isLoggedIn, role }) => {
    if (typeof localStorage === "undefined" || localStorage === null) {
        var LocalStorage = require("node-localstorage").LocalStorage;
        localStorage = new LocalStorage("./scratch");
    }
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    console.log(userInfo);
    return (
        // <ConnectedRouter history={history}>
        <div>
            <Route
                exact
                path={"/"}
                component={asyncComponent(() => import("./pages/Login"))}
            />
            <Route
                exact
                path={"/signup"}
                component={asyncComponent(() => import("./pages/Signup"))}
            />
            <PrivateRoute
                exact
                path={"/home"}
                component={asyncComponent(() => import("./pages/Home"))}
            />

            {/* <PrivateRoute
          exact
          path={'/home/machine'}
          component={asyncComponent(() =>
            import('./pages/Machine')
          )}
          isAllowed={true}
        />
        <PrivateRoute
          exact
          path={'/home/dashboard'}
          component={asyncComponent(() =>
            import('./pages/Dashboard')
          )}
          isAllowed={true}
        />
        <PrivateRoute
          exact
          path={'/home/efficiency'}
          component={asyncComponent(() =>
            import('./pages/Efficiency')
          )}
          isAllowed={true}
        /> */}
            {/* <AdminRoute
          path="/admin-portal"
          component={AdminPortal}
          isLoggedIn={isLoggedIn}
          role={role}
        />
        <AdminRoute
          path='/admin-add-new-university'
          component={AdminAddUniversity}
          isLoggedIn={isLoggedIn}
          role={role}
        /> */}
        </div>
        // </ConnectedRouter>
    );
};

// export default connect(state => ({
//   isLoggedIn: state.Auth.isLoggedIn,
//   role: state.Auth.user?state.Auth.user.role:null,
// }))(PublicRoutes);
export default PublicRoutes;
