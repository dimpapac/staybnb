import React, {Component} from 'react'

class Carousel extends Component {

    constructor (props , context) {
        super( props , context )
        this.state = {
            ad : props.ad,
            photos : props.ad.photos,
            loading : false,
            height : props.height,
            width : props.width
        }
    }

    componentDidMount(){
        
        this.setState({
            loading : true
        })


    }

    render() { 
        const ad = this.state.ad
        const id = "a" + ad._id
        const ref = "#a" + ad._id
        return (
            <div>
            { (this.state.loading) && (
            <div id={id} class="carousel slide" data-interval="false" style={{height: this.state.height}}>
                <ol class="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                    {this.state.photos.slice(1).map((photo) => {
                        return (
                            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                        )
                    })}
                </ol>

                <div>
                { (this.state.photos.length > 0) && (
                <div class="carousel-inner">
                    <div class="carousel-item active">
                    <img class="d-block w-100 img-fluid" style={{height: this.state.height }} src={ "https://localhost:9000/staybnb/api/ads/uploads?fileName=" + this.state.photos[0]}  alt="First slide"/>
                    </div>
                    {(this.state.photos.length > 1) && (this.state.photos.slice(1).map((photo) => {//Loop through every row of the json file and get the attributes
                        return (
                            <div class="carousel-item">
                                <img class="d-block w-100 img-fluid"  style={{height: this.state.height }} src={ "https://localhost:9000/staybnb/api/ads/uploads?fileName=" + photo}  alt="Second slide"/>
                            </div>
                        )     			
                    }))}	
                </div>
                )}
                </div>


                <a class="carousel-control-prev" href={ref} role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href={ref}  role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>
            </div>
            )}
            </div>
        )
    }
}

export default Carousel