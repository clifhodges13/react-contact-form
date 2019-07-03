import React, { Component } from 'react';
import axios from 'axios';
// import helpers from './helpers.js';
import './Contact.css';

class Contact extends Component {
  
  state = {
    name: '',
    message: '',
    email: '',
    sent: false,
    buttonText: 'Submit'
  }

  formSubmit = (e) => {
    e.preventDefault()

    this.setState({
      buttonText: '...sending'
    })

    let data = {
      name: this.state.name,
      email: this.state.email,
      message: this.state.message
    }

    axios.post({
      method: 'post',
      url: 'https://nodejs-express.lambda-webpt8.now.sh/',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      }
    }, data
    )
      .then(res => { // the message is not being sent, so the .catch is executing. im showing a 404 not found error in console
        this.setState({
          sent: true
        }, 
        this.resetForm())
        console.log(this);
      })
      .catch(() => {
        console.log('Message not sent')
      })
  }

  resetForm = () => {
    this.setState({
      name: '',
      message: '',
      email: '',
      buttonText: 'Message Sent'
    })
  } 

  render() {
    return(
      <div className="Form-container">
        <form className="form" onSubmit={(e) => this.formSubmit(e)}>

          <h1>Contact Us</h1>

          <input onChange={e => this.setState({ name: e.target.value})} name="name" className="message-name" type="text" placeholder="Name" value={this.state.name} />

          <input onChange={e => this.setState({ email: e.target.value})} name="email" className="message-email" type="email" placeholder="your@email.com" required value={this.state.email} />
          
          <textarea onChange={e => this.setState({ message: e.target.value})} name="message" className="message-input" type="text" placeholder="Message" value={this.state.message} required />

          <button type="submit">{ this.state.buttonText }</button>

        </form>
      </div>
    )
  }

}

export default Contact;
