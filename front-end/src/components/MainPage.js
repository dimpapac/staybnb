import React, {Component} from 'react'
import SearchBar from './SearchBar';
import { withRouter } from 'react-router'

class MainPage extends Component
{

    constructor(props , context) 
    {
        super(props , context);
        this.state = {

        };
    }

    render() {
        return (
            <div>
              <SearchBar/>
            </div>
        );
    }
}

export default withRouter(MainPage);
