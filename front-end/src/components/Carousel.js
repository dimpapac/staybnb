import React, {Component} from 'react'

class Carousel extends Component {

    constructor (props , context) {
        super( props , context )
        this.state = {
            apartment : props.apartment,
            photos : ["https://source.unsplash.com/random"],
            loading : false
        }
    }

    componentDidMount(){
        this.setState({
            loading : true
        })
    }

    render() { 
        const apartment = this.state.apartment
        const id = "a" + apartment._id
        const ref = "#a" + apartment._id

        console.log(ref)
        return (
            <div>
            { (this.state.loading) && (
            <div id={id} class="carousel slide" data-interval="false" style={{height: "12pc"}}>
                <ol class="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    {/* <li data-target="#carouselExampleIndicators" data-slide-to="2"></li> */}
                </ol>
                <div class="carousel-inner">
                    <div class="carousel-item active">
                    <img class="d-block w-100 img-fluid" style={{height: "12pc"}} src="https://source.unsplash.com/random" alt="First slide"/>
                    </div>
                    {this.state.photos.map((photo) => {//Loop through every row of the json file and get the attributes
                        return (
                            <div class="carousel-item">
                                <img class="d-block w-100 img-fluid"  style={{height: "12pc"}} src={photo}  alt="Second slide"/>
                            </div>
                        )     			
                    })}	
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