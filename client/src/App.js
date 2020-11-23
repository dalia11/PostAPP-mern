import React, { useState, useEffect } from "react";

import Main from "./pages/Main.js";
import Login from "./pages/Login.js";
import Map from "./pages/Map.js";
import Leafletmap from "./pages/Leafletmap.js";

import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Registration from "./pages/Registration.js";


const App = () => {
  const [path, setpath] = useState(""); //path of page to redirect to

  useEffect(() => {
    let data = localStorage.getItem("token");
    /**
     * if already logged in on same session then redirect direct to Main
     */
    if (data) {
      setpath("/Main")
    } else { // if not logged in then go to login page
      setpath("/Login");
    }
  }, []);

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Redirect to={path} />
        </Route>

        <Route path="/Login" render={props =>
          <Login {...props} />
        } />
        <Route path="/map" render={props =>
          <Map {...props} />
        } />
        <Route path="/Leafletmap" render={props =>
          <Leafletmap {...props} />
        } />
        <Route path="/Register" render={props =>
          <Registration {...props} />
        } />
        <Route path="/Main" render={props =>
          <Main {...props} />
        } />

      </Switch>
    </BrowserRouter>
  );
}

export default App;
