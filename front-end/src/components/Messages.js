import React, { Component } from 'react';
import { withRouter } from 'react-router'
import '../css/messages.css';

import { messagesService } from '../services/messages.service'

class Messages extends Component {

	constructor (props , context) {
        super( props , context )
        this.state = {
            loading : true,
            inbox: [],
            sent: [],
            sendFlags: [],
            message : null,
            gone: false
        }
        this.handleOpenReply = this.handleOpenReply.bind(this);
        this.handleMessage = this.handleMessage.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
    }

    sendMessage(e, i) {
    	e.preventDefault()
        const sender_id = JSON.parse(localStorage.getItem('user'))._id
        const username = this.state.inbox[i].receiver_username
        const receiver_id = this.state.inbox[i].sender_id
        const receiver_username = this.state.inbox[i].sender_username
        if (this.state.message) {
            console.log('message exists')
            messagesService.send_message(sender_id, receiver_id, this.state.message, username, receiver_username)
            this.setState({
            	gone: true
            })
            this.setState(state => {
				const sendFlags = state.sendFlags.map((item, j) => {
					if (Number(j) === Number(i))
						return !item;
					else
						return item;
				});
				return {
					sendFlags,
				};
		    })
		    const id = JSON.parse(localStorage.getItem('user'))._id
		    messagesService.get_sent(id)
	        .then( response => {
	            if ( response != null ) {
	                this.setState((prevState, props) => ({
	                    sent : response.reverse(),
	                }))
	            }
	        })
        }
    }

    handleMessage(event) {
        this.setState({
            message: event.target.value
        });
    }

    componentDidMount() {

        const id = JSON.parse(localStorage.getItem('user'))._id
        messagesService.get_inbox(id)
        .then( response => {
            if ( response != null ) {
                this.setState((prevState, props) => ({
                    inbox : response.reverse(),
                    loading: false
                }))
                response.map((resp) => {
                	this.state.sendFlags.push(false)
                })
            }
        })
        messagesService.get_sent(id)
        .then( response => {
            if ( response != null ) {
                this.setState((prevState, props) => ({
                    sent : response.reverse(),
                    loading: false
                }))
            }
        })
    }

    handleOpenReply(i) {

    	this.setState(state => {
			const sendFlags = state.sendFlags.map((item, j) => {
				if (Number(j) === Number(i))
					return !item;
				else
					return item;
			});
			return {
				sendFlags,
			};
	    })
    }

    render() {
    	return (
    		<div>
    			<div className="container">
	    			<br/>
					<h5>Μηνύματα</h5>
					{this.state.loading &&
						<div className="text-center">
							<i className="fa fa-spinner fa-pulse fa-spin fa-fw"></i> 
						</div>
					}
					{!this.state.loading &&
						<div className="row">
							<div className="nav flex-column nav-pills col-md-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
								<a className="nav-link active" id="v-pills-inbox-tab" data-toggle="pill" href="#v-pills-inbox" role="tab" aria-controls="v-pills-inbox" aria-selected="true">Εισερχόμενα</a>
								<a className="nav-link" id="v-pills-sent-tab" data-toggle="pill" href="#v-pills-sent" role="tab" aria-controls="v-pills-sent" aria-selected="false">Απεσταλμένα</a>
							</div>
							<div  className="tab-content col-md-9" id="v-pills-tabContent">
								<div className="tab-pane fade show active" id="v-pills-inbox" role="tabpanel" aria-labelledby="v-pills-inbox-tab">
									{this.state.gone &&
										<div>
											<h6>Στάλθηκε!</h6>
										</div>
									}
									<ul className="list-group">
										{this.state.inbox.map((inb_message, i) => {
											return (
												<li className="list-group-item" style={{padding: "4px 12px"}}>
													<div className="row m-0">
														<div className="col-3 p-0">
															<div className="">{ inb_message.sender_username }</div>
															{/*!inb_message.read &&
																<span className="badge badge-danger">Νέο</span>
															*/}
														</div>
														<div className="col-5" style={{padding: "8px 12px"}}>
															<span className="text-truncated text-muted">{inb_message.message}</span>									
														</div>
														<div className="col-4 p-0">
															<button className="btn btn-link float-right" onClick={() => {this.handleOpenReply(i)}}><i className="fa fa-reply"></i></button>
														</div>
													</div>
													{this.state.sendFlags[i] &&
													<div>
														<br/>
														<form>
				                                            <div className="form-group">
				                                                <textarea rows="4" type="text" value={this.state.message} className="form-control" onChange={this.handleMessage}/>
				                                            </div>
				                                            <button className="btn btn-info w-100" onClick={(e) => {this.sendMessage(e, i)}}>Απάντηση</button>
				                                        </form>
														<br/>
													</div>}
												</li>
											);
										})}
										{(this.state.inbox.length == 0) &&
											<div className="font-weight-light font-italic">Κανένα μήνυμα. Αντίοοο!</div>
										}
									</ul>
								</div>
								<div className="tab-pane fade" id="v-pills-sent" role="tabpanel" aria-labelledby="v-pills-sent-tab">
									<ul className="list-group">
										{this.state.sent.map((sent_message, i) => {
											return (
												<li className="list-group-item" style={{padding: "4px 12px"}}>
														<div className="row m-0">
															<div className="col-3 p-0">
																<button className="btn btn-link" disabled>{ sent_message.receiver_username }</button>
															</div>
															<div className="col-5" style={{padding: "8px 12px"}}>
																<span className="text-truncated text-muted">{sent_message.message}</span>									
															</div>
														</div>
													</li>
											);
										})}
										{(this.state.sent.length == 0) &&
											<div className="font-weight-light font-italic">Κανένα εξερχόμενο μήνυμα</div>
										}
									</ul>
								</div>
							</div>
						</div>
					}
	        	</div>
	        </div>
    	);
	}
}

export default withRouter(Messages);
