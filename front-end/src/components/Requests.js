import React, {Component} from 'react'
import { withRouter } from 'react-router'

class Requests extends Component
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
                <div className="container">
                <br/>
                    <h5>Αιτήματα</h5>

                </div>
            </div>
        );
    }
}

export default withRouter(Requests);
