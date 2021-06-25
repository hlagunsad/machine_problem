import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Container, Header } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import './App.css';

import { AuthProvider } from "./contexts/auth";
import AuthRoute from './utils/AuthRoute'

import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';

import MenuBar from './components/MenuBar';

function App() {
  return (
      <AuthProvider>
            <Router>
            <Container>
            <MenuBar />
            <Route exact path='/' component={Home} />
            <AuthRoute exact path='/login' component={Login} />
            <AuthRoute exact path='/register' component={Register} />
            </Container>
          </Router>
      </AuthProvider>
  );
}

export default App;
