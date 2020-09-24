import React, {Component} from 'react'
import { withRouter } from 'react-router'


class BookingListItem extends Component {

    constructor (props , context) {
        super( props , context )
        this.state = {
            info : this.props.booking,
            hover: false
        }
        this.toggleHover = this.toggleHover.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    toggleHover() {
        this.setState({hover: !this.state.hover})
    }



    handleShow(event){
        event.stopPropagation();
        this.setState({ 
            setShow: true
        });
    };

    handleClose(event){
        event.stopPropagation();
        this.setState({ 
            setShow: false
        });
    };

    render(){
        var linkStyle;
        if (this.state.hover) {
            linkStyle = {color: '#ed1212',cursor: 'pointer'}
        } else {
            linkStyle = {color: '#000'}
        }
        var dateFormat = require('dateformat');


        return(
            <div  style={linkStyle} onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover} style={{width:"80%",marginLeft:"10%"}} 
            onClick={ () => {
                localStorage.setItem('ad', this.state.info.adId);
                this.props.history.push({
                    pathname: 'preview',
                    state: {
                        flag : 0
                    }
                });
            }}>
                <a key={this.state.info._id} class=" list-group-item list-group-item-action flex-column align-items-center " style={{width: "60%"}}>
                <div class="row">
                    <div class=" float-left  justify-content-between" style={{width : "25%",marginRight:"25%"}}>
                        <h5>Από : {dateFormat(this.state.info.bookedFrom, "dd-mm-yyyy")}</h5>
                        <h5>Μέχρι : {dateFormat(this.state.info.bookedTill, "dd-mm-yyyy")}</h5>
                    </div>
                    <div class=" float-right  justify-content-between" style={{marginRight:"10%"}}> 
                        <div class="d-flex w-100 row" style={{marginBottom : "5%"}}>
                            <h5 class="mb-1">username Οικοδεσπότη: {this.state.info.hostName}</h5>
                        </div>
                    </div>
                </div>
                </a>
            </div>
        )
    }

}


export default withRouter(BookingListItem);