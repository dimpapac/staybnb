
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
            startComp : MainPage,


            setUserData: (token, username) => this.setState({
                token: token,
                username: username,
            }),
        };
        this.mainPageHandler = this.mainPageHandler.bind(this);
    }

    componentDidMount(){
        let user = JSON.parse(localStorage.getItem("user"))
        if (user){

            this.setState({
                userType: user.userType
            });

            if ( user.userType == 2 ){
                this.setState({
                    startComp: HostPage
                });
            }
            else if ( user.userType == 0 ){
                this.setState({
                    startComp: AdminPage
                });
            }
        } 
        else{
            this.setState({
                userType: 3
            });
        }
    }


    mainPageHandler( comp ){
        this.setState({
            startComp : comp
        });
    }

    render() {
      return (
        <div>
          <NavBar action={this.mainPageHandler} history={this.props.history}/>
          <Switch >
            <Route exact path='/' component={this.state.startComp} history={this.props.history} />
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
