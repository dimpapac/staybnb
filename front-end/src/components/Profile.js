import React, {Component} from 'react'
import { withRouter } from 'react-router'
import { adService } from '../services/ad.service'


class Profile extends Component
{

    constructor(props , context) 
    {
        super(props , context);
        this.state = {
            
        };
        this.firstName = React.createRef();
        this.lastName = React.createRef();
        this.email = React.createRef();
        
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = event => {
        const userId = JSON.parse(localStorage.getItem('user'))._id
        adService.update_user( userId , this.firstName.current.value , this.lastName.current.value , this.email.current.value )
        event.preventDefault();
    };

    render() {
      let user = JSON.parse(localStorage.getItem("user"))
      return (
        <div style={{width: "40%", margin: "0 auto"}}>
            <h2 style={{textAlign: "center"}}>Προσωπικά Στοιχεία</h2>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="username">Όνομα</label>
                  <input type="text" className="form-control" ref={this.firstName} defaultValue={user.name.firstName} name="firstName" />
              </div>
              <div className="form-group">
                <label htmlFor="username">Επώνυμο</label>
                  <input type="text" className="form-control" ref={this.lastName} defaultValue={user.name.lastName} name="lastName" />
              </div>
              <div className="form-group">
                <label htmlFor="username">Email</label>
                  <input type="email" className="form-control" ref={this.email} defaultValue={user.email} name="email"/>
              </div>
              <button className="btn btn-primary w-100" type="submit" >
                Ενημέρωση Προφίλ
              </button>
            </form>
        </div>
      );
    }
}

export default withRouter(Profile);
