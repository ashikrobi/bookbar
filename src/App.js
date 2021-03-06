import './App.css';
import React, { createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './components/Home/Home';
import Orders from './components/Orders/Orders';
import Admin from './components/Admin/Admin';
import Deals from './components/Deals/Deals';
import NotFound from './components/NotFound/NotFound';
import LoginForm from './components/LoginForm/LoginForm';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Navigation from './components/Navigation/Navigation';

//user context
export const UserContext = createContext();
export const orderContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [order, setOrder] = useState([]);
  return (
    <div>
      <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <orderContext.Provider value={[order, setOrder]}>
      <Router>
      <Navigation></Navigation>
        <Switch>
        <Route exact path="/">
            <Home></Home>
          </Route>
          <Route path="/home">
            <Home></Home>
          </Route>
          <PrivateRoute path="/orders">
            <Orders></Orders>
          </PrivateRoute>
          <PrivateRoute path="/admin">
            <Admin></Admin>
          </PrivateRoute>
          <Route path="/deals">
            <Deals></Deals>
          </Route>
          <Route path="/login">
            <LoginForm></LoginForm>
          </Route>
          <Route path="*">
            <NotFound></NotFound>
          </Route>
        </Switch>
    </Router>
    </orderContext.Provider>
    </UserContext.Provider>
    </div>
  );
}

export default App;
