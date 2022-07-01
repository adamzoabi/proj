import React, {Component} from 'react';
import './App.css';

import NavBar from './component/NavBar';
import Footer from './component/Footer';
import About from './component/About';
import Home from './component/Home';
import SignUp from './component/SignUp';
import SignIn from './component/SignIn';
import Logout from './component/Logout';
import BizSignUp from './component/BizSignUp';
import CreateCard from './component/CreateCard';
import MyCards from './component/MyCards';
import EditCardScreen from './component/EditCardScreen';
import Favorites from './component/Favorites';

import http from './services/httpService';
import {apiUrl} from './config.json';
import userService from './services/userService';

import {Switch, Route} from 'react-router-dom';
import ProtectedRoute from './component/common/ProtectedRoute';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {

  state = {}

  componentDidMount(){
    const user  = userService.getCurrentUser();
    this.setState({user});
    if(user){
      http.get(`${apiUrl}/users/me`).then(console.log);
    }
  }

  render(){
    const {user} = this.state;
    return (
      <div className="d-flex flex-column min-vh-100">
        <ToastContainer />
        <header>
          <NavBar user={user} />
        </header>
        <main className='container-fluid flex-fill'>
          <Switch>
            <ProtectedRoute
              path='/my-cards'
              component={MyCards}
              biz={true}
            />
            <ProtectedRoute
              path='/create-card'
              component={CreateCard}
              biz={true}
            /> 
            <ProtectedRoute
              path='/Favorites-cards'
              component={Favorites}
              biz={true}
            /> 
            <ProtectedRoute
            path="/card/:id/edit"
            component={EditCardScreen}
            biz={true}
          />
            {/* <Route path='/create-card' component={CreateCard} /> */}
            <Route path='/biz-signup' component={BizSignUp} />
            <Route path='/logout' component={Logout} />
            <Route path='/signup' component={SignUp} />
            <Route path='/signin' component={SignIn} />
            <Route path='/about' component={About} />
            <Route path='/' exact component={Home} />
          </Switch>
        </main>
        <footer>
          <Footer />
        </footer>
    </div>
    );
  }
}


export default App;
