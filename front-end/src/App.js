
import React, {Component} from 'react'
import NavBar from './components/NavBar'
import './App.css';
// import SearchBar from './components/SearchBar';
import { withRouter } from 'react-router'
import AdList from './components/AdList'
import MainPage from './components/MainPage'
import Help from './components/Help'
import AdPreview from './components/AdPreview'
import AdRegister from './components/AdRegister'
import HostPage from './components/HostPage'
import Bookings from './components/Bookings'
import Profile from './components/Profile'
import Messages from './components/Messages'
import Requests from './components/Requests'
import AdminPage from './components/AdminPage'

import { Switch, Route , Redirect} from 'react-router-dom'

class App extends Component
{

    constructor(props) 
    {
        super(props);
        this.state = {
            token: props.userData.token,
            username: props.userData.username,
            userType: 3,


            setUserData: (token, username) => this.setState({
                token: token,
                username: username,
            }),
        };
    }

    componentDidMount(){
        let user = JSON.parse(localStorage.getItem("user"))
        console.log("app", user)
        if (user){

            this.setState({
                userType: user.userType
            });
        } 
        else{
            this.setState({
                userType: 3
            });
        }
    }

    render() {
      return (
        <div>
          <NavBar history={this.props.history}/>
          <Switch >
            <Route exact path='/' component={() => <MainPage userType={this.state.userType}/>} history={this.props.history} />
            <Route path='/ads' component={AdList} history={this.props.history} />
            <Route path='/help' component={Help} history={this.props.history} />
            <Route path='/preview' component={AdPreview} history={this.props.history} />
            <Route path='/newAd' component={AdRegister} history={this.props.history} />
            <Route path='/host' component={HostPage} history={this.props.history} />
            <Route path='/bookings' component={Bookings} history={this.props.history} />
            <Route path='/profile' component={Profile} history={this.props.history} />
            <Route path='/messages' component={Messages} history={this.props.history} />
            <Route path='/requests' component={Requests} history={this.props.history} />
            <Route path='/admin' component={AdminPage} history={this.props.history} />
          </Switch>
        </div>
      );
    }
}

export default withRouter(App);
