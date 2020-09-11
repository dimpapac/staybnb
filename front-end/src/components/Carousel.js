import React, {Component} from 'react'

class Carousel extends Component {

    constructor (props , context) {
        super( props , context )
        this.state = {
            photos : ["https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/don_quixote.jpg"]
        }
    }

    render() { 
        return (
            <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel" style={{height: "12pc"}}>
            <ol class="carousel-indicators">
                <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                {/* <li data-target="#carouselExampleIndicators" data-slide-to="2"></li> */}
            </ol>
            <div class="carousel-inner">
                <div class="carousel-item active">
                <img class="d-block w-100 img-fluid" style={{height: "12pc"}} src="https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/don_quixote.jpg" alt="First slide"/>
                </div>
                {this.state.photos.map((photo) => {//Loop through every row of the json file and get the attributes
                    return (
                        <div class="carousel-item">
                            <img class="d-block w-100 img-fluid"  style={{height: "12pc"}} src={photo}  alt="Second slide"/>
                        </div>
                    )     			
                })}	
            </div>
            <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </a>
            </div>
        )
    }
}

export default Carousel