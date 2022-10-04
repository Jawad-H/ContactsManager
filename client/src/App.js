import AddContact from "./pages/AddContact";
import ContactInfo from "./pages/ContactInfo";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

function App() {
  const user = useSelector((state) => state.user.currentUser);
  const useri = JSON.parse(localStorage.getItem("persist:root"))?.user;
  const currentUser = user && JSON.parse(useri).currentUser;
  const TOKEN = currentUser?.accessToken;
  axios.defaults.headers.common['token'] = `Bearer ${user?.accessToken || TOKEN}`;

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {!user ? <Redirect to="/login" /> : <Redirect to="/home" />}
        </Route>
        <Route path="/home">
          {!user ? <Redirect to="/login" /> : <Home />}
        </Route>
        <Route path="/login">
          {user ? <Redirect to="/home" /> : <Login />}
        </Route>
        <Route path="/register">
          {user ? <Redirect to="/home" /> : <Register />}
        </Route>
        <Route path="/contact/:id">
          {!user ? <Redirect to="/login" /> : <ContactInfo />}
        </Route>
        <Route path="/Add">
          {!user ? <Redirect to="/login" /> : <AddContact />}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
