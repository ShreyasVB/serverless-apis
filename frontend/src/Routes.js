import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import UserRegistration from "./containers/UserRegistration";
import User from './containers/User';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/signup">
        <Signup />
      </Route>
      <Route exact path="/user/register">
        <UserRegistration />
      </Route>
      <Route exact path="/user/:fullName">
        <User />
      </Route>`
    </Switch>
  );
}