import React, {Component} from 'react'
import { withRouter } from 'react-router'

class AdminPage extends Component
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
                AdminPage
            </div>
        );
    }
}

export default withRouter(AdminPage);
