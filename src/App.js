import React, { useEffect } from "react";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import { positions, Provider, transitions } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss?v=1.2.0";
import "assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";

import AdminLayout from "layouts/Admin.js";
import Login from "./Login/Login-page";
import PrivateRoute from "./components/Service/PrivateRoute";

const options = {
  timeout: 2000,
  position: positions.TOP_CENTER,
  offset: "80px",
  transition: transitions.SCALE,
};

const history = createBrowserHistory();

const App = () => {
  // const Routing = () => {
  //   // useEffect(() => {
  //   //   const user = localStorage.getItem("authToken");
  //   //   if (user) {
  //   //     history.push("/admin/dashboard");
  //   //   } else {
  //   //     history.push("/");
  //   //   }
  //   // }, []);

  //   return (
  //     <Switch>
  //       <Route exact path="/" component={Login} />
  //       <Route
  //         path="/admin"
  //         render={(props) => <AdminLayout {...props} />}
  //       />
  //     </Switch>
  //   );
  // };

  return (
    <div>
      <Provider template={AlertTemplate} {...options}>
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route
              path="/admin"
              render={(props) => <AdminLayout {...props} />}
            />
          </Switch>
        </Router>
      </Provider>
    </div>
  );
};

export default App;

/* <Switch>
    <Route exact path="/" component={Login} />
    <PrivateRoute path="/admin" 
      render={(props) => <AdminLayout {...props} />}                   
    />       

    <Route path="*" component={() => "404 not found"} />       
  </Switch> */
