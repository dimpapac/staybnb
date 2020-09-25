import React, {Component} from 'react'
import { withRouter } from 'react-router'

import { adService } from '../services/ad.service'

class AdminPage extends Component
{

    constructor(props , context) 
    {
        super(props , context);
        this.state = {
            users : null,
            is_loading : true
        };

        let user = JSON.parse(localStorage.getItem("user"))
        if ((user && user.userType!==0) || !user) {
            this.props.history.push('/')
        }
        this.handleReject = this.handleReject.bind(this)
        this.handleAccept = this.handleAccept.bind(this)
    }

    handleAccept(id){
        adService.approve_user(id)
        window.location.reload()
    }

    handleReject(id){
        adService.delete_user(id)
        window.location.reload()
    }

    componentDidMount(){
        const type = JSON.parse(localStorage.getItem('user')).type
        adService.get_users(type)
        .then( response => {
              this.setState({
                is_loading : false,
                users : response
        })
        });	
    }


    render() {
        return (
        <div>
            <br/>
            <h5 style={{marginLeft:"10%"}}>AdminPage</h5>
            <br/>
            

            { !this.state.is_loading && (
            <div style={{marginTop:"1%",marginLeft:"10%",width:"100%"}}>
                {this.state.users.map((user) => {//Loop through every row of the json file and get the attributes
                    return (
                        <div  class="list-group" style={{marginTop:"1%"}}>
                            <a key={user._id} class=" list-group-item list-group-item-action flex-column align-items-center " style={{width: "60%"}}>
                                <div class="row">
                                    <div class=" float-left  justify-content-between" style={{width : "25%",marginRight:"10%"}}>
                                        <h6>Όνομα : {user.name.firstName}</h6>
                                        <h6>Επώνυμο : {user.name.lastName}</h6>
                                        <h6>username : {user.username}</h6>
                                        <h6>email : {user.email}</h6>
                                    </div>
                                    <div class="  justify-content-between" style={{marginRight:"10%"}}> 
                                        <div class="d-flex w-100 row" style={{marginBottom : "5%"}}>
                                            { user.userType == 1?(<h6>Τύπος Χρήστη : Απλός</h6>):(<h6>Τύπος Χρήστη : Οικοδεσπότης</h6>)}
                                        </div>
                                    </div>
                                    <div class=" float-right "> 
                                        <div class="d-flex w-100 row" style={{marginBottom : "5%"}}>
                                            { user.userType == 2 && user.approved == 0 && ( 
                                                <div class="container ">
                                                    <button  type="button" className="  btn btn-success" style={{marginTop:"10px",width:"100%",marginBottom:"10px"}} onClick={ () => {this.handleAccept(user._id)}}>Αποδοχή</button>
                                                    <button  type="button" className="  btn btn-danger" style={{marginLeft:"1%",marginTop:"10px",width:"100%",marginBottom:"10px"}} onClick={ () => {this.handleReject(user._id)}}>Απόρριψη</button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    )     			
				})}
            </div>
            )
            }
        </div>
        );
    }
}

export default withRouter(AdminPage);
