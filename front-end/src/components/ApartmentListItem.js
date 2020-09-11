import React, {Component} from 'react'
import Carousel from './Carousel'

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
                <a href="#" class=" list-group-item list-group-item-action flex-column align-items-center " style={{width: "100%"}}>
                <div class="row">
                    <div style={{width : "15pc"}}>
                        {/* <img src="https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/don_quixote.jpg" class="img-fluid" alt="quixote"/> */}
                        <Carousel apartment={this.state.info} />
                    </div>
                    <div class="col-sm-8">
                            <div class="d-flex w-100 justify-content-between " style={{marginBottom : "10%"}}>
                                <h5 class="mb-1">{this.state.info.title}</h5>
                                <p class="mb-1 ">address</p>
                            </div>
                            <p class="mb-1 ">{this.state.info.description}</p>
                    </div>
                </div>
                </a>
            </div>
        )
    }
}

export default ApartmentListItem