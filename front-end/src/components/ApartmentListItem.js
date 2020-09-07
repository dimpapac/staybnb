import React, {Component} from 'react'

class ApartmentListItem extends Component {

    constructor (props , context) {
        super( props , context )
        this.state = {
            info : props.apartment
        }
    }

    render() { 
        return (
            <div>
                <h1>ASDAD</h1>
            </div>
        )
    }
}

export default ApartmentListItem