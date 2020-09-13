
import React, {Component} from 'react'
import NavBar from './components/NavBar'
import './App.css';
// import SearchBar from './components/SearchBar';
import { withRouter } from 'react-router'
import AdList from './components/AdList'
import MainPage from './components/MainPage'
import Help from './components/Help'

import { Switch, Route , Redirect} from 'react-router-dom'

class App extends Component
{

    constructor(props) 
    {
        super(props);
        this.state = {
            token: props.userData.token,
            username: props.userData.username,

            setUserData: (token, username) => this.setState({
                token: token,
                username: username,
            }),
        };
    }

    render() {
      return (
        <div>
          <NavBar history={this.props.history}/>
          <Switch >
            <Route exact path='/' component={MainPage} history={this.props.history} />
            <Route path='/ads' component={AdList} history={this.props.history} />
            <Route path='/help' component={Help} history={this.props.history} />
          </Switch>
        </div>
      );
    }
}

export default withRouter(App);
