import React, {Component} from 'react'
import Carousel from './Carousel'

class AdListItem extends Component {

    constructor (props , context) {
        super( props , context )
        this.state = {
            info : props.ad,
            hover: false,
            flag: this.props.flag,
            score : null
        }
        this.toggleHover = this.toggleHover.bind(this);
    }

    toggleHover() {
        this.setState({hover: !this.state.hover})
    }

    componentDidMount(){
        let sum = 0
        if( this.state.info.reviews ){
            this.state.info.reviews.map(review => {
                sum = sum + parseInt(review.stars)
            })
        }
        this.setState({
            score : sum / this.state.info.totalReviews
        })
        
    }

    render() { 


        var linkStyle;
        if (this.state.hover) {
            linkStyle = {color: '#ed1212',cursor: 'pointer'}
        } else {
            linkStyle = {color: '#000'}
        }
        const filters = ["wifi","airco","heat","parking","kitchen","elevator","tv"]
        const filterValues =  [this.props.wifi , this.props.airco , this.props.heat , this.props.parking , this.props.kitchen , this.props.elevator , this.props.tv]
        let flag = 0;
        for (let i = 0; i < 7; i++) {
            if ( filterValues[i] == true && this.state.info.filters.[filters[i]] == "false" ){
                console.log("As")
                flag = 1
            }
        }
        if (flag == 0) {
        return (
            <div  style={linkStyle} onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover}>
                <a key={this.state.info._id} class=" list-group-item list-group-item-action flex-column align-items-center " style={{width: "100%"}}>
                <div class="row">
                    <div class="float-left" style={{width : "25%",marginRight:"2%"}}>
                        <Carousel ad={this.state.info} height={"12pc"} />
                    </div>
                    <div onClick={ () => {
                        localStorage.setItem('ad', this.state.info._id);
                        this.props.history.push({
                            pathname: 'preview',
                            state: {
                                flag : this.state.flag
                            }
                        });
                    }}
                    class="col-sm-7 float-right" > 
                            <div class="d-flex w-100 justify-content-between row" style={{marginBottom : "5%"}}>
                                <h5 class="mb-1">{this.state.info.title}</h5>
                                <p class="mb-1 ">{this.state.info.location.address}</p>
                            </div>
                            <div class="row" style={{marginBottom : "5%"}}>                                  
                                {this.state.info.filters.wifi === "true" && (<span class=" badge badge-primary" style={{marginLeft:"1%"}}>Wifi</span>)}
                                {this.state.info.filters.airco === "true"  && (<span class=" badge badge-primary" style={{marginLeft:"1%"}}>Κλιματισμός</span>)}
                                {this.state.info.filters.heat === "true"  && (<span class=" badge badge-primary" style={{marginLeft:"1%"}}>Θέρμανση</span>)}
                                {this.state.info.filters.kitchen === "true"  && (<span class=" badge badge-primary" style={{marginLeft:"1%"}}>Κουζίνα</span>)}
                                {this.state.info.filters.parking === "true"  && (<span class=" badge badge-primary" style={{marginLeft:"1%"}}>Χώρος Στάθμευσης</span>)}
                                {this.state.info.filters.elevator === "true"  && (<span class=" badge badge-primary" style={{marginLeft:"1%"}}>Ανελκυστήρας</span>)}
                                {this.state.info.filters.tv === "true"  && (<span class=" badge badge-primary" style={{marginLeft:"1%"}}>Τηλεόραση</span>)}
                            </div>
                            <div class="row">      
                                <p class="mb-1 ">{this.state.info.price}€ / το βράδυ</p>
                            </div>
                            <div class="row">      
                            <p class="mb-1 ">{this.state.info.totalReviews} Αξιολογήσεις</p>
                            </div>
                            { this.state.info.totalReviews > 0 && (
                                <div class="row">      
                                    <p class="mb-1 ">{this.state.score} / 5 Αστέρια</p>
                                </div>
                            )}
                    </div>
                </div>
                </a>
            </div>
        )
        }
        else{
            return null
        }
    }
}

export default AdListItem