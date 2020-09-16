import React, {Component} from 'react'
import Carousel from './Carousel'

class AdListItem extends Component {

    constructor (props , context) {
        super( props , context )
        this.state = {
            info : props.ad,
            hover: false
        }
        this.toggleHover = this.toggleHover.bind(this);
    }

    toggleHover() {
        this.setState({hover: !this.state.hover})
    }

    render() { 
        var linkStyle;
        if (this.state.hover) {
            linkStyle = {color: '#ed1212',cursor: 'pointer'}
        } else {
            linkStyle = {color: '#000'}
        }
        
        return (
            <div  style={linkStyle} onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover}>
                <a key={this.state.info._id} class=" list-group-item list-group-item-action flex-column align-items-center " style={{width: "100%"}}>
                <div class="row">
                    <div class="float-left" style={{width : "17pc"}}>
                        <Carousel ad={this.state.info} height={"12pc"} />
                    </div>
                    <div onClick={ () => {
                        localStorage.setItem('ad', this.state.info._id);
                        this.props.history.push('/preview');
                    }}
                    class="col-sm-7 float-right" > 
                            <div class="d-flex w-100 justify-content-between " style={{marginBottom : "10%"}}>
                                <h5 class="mb-1">{this.state.info.title}</h5>
                                <p class="mb-1 ">{this.state.info.location.address}</p>
                            </div>
                            <p class="mb-1 ">{this.state.info.description}</p>
                    </div>
                </div>
                </a>
            </div>
        )
    }
}

export default AdListItem