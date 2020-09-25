import React, {Component} from 'react'
import { withRouter } from 'react-router'

class AdminPage extends Component
{

    constructor(props , context) 
    {
        super(props , context);
        this.state = {

        };

        let user = JSON.parse(localStorage.getItem("user"))
        if ((user && user.userType!==0) || !user) {
            this.props.history.push('/')
        }
    }


    render() {
        return (
            <div>
                AdminPage
            </div>
        );
    }
}

export default withRouter(AdminPage);
