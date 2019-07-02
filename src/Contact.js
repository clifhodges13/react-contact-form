import React, { Component } from 'react';
import axios from 'axios';
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

    axios.post('API_URI', data)
      .then(res => {
        this.setState({
          sent: true
        }, this.resetForm())
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
    return( // will change the classNames to match my styles later
      <div className="Form-container">
        <form className="form" onSubmit={ (e) => this.formSubmit(e)}>

          <h1>Contact Us</h1>

          <input onChange={e => this.setState({ name: e.target.value})} name="name" class="message-name" type="text" placeholder="Name" value={this.state.name}/>

          <input onChange={(e) => this.setState({ email: e.target.value})} name="email" class="message-email" type="email" placeholder="your@email.com" required value={this.state.email} />
          
          <textarea onChange={e => this.setState({ message: e.target.value})} name="message" class="message-input" type="text" placeholder="Message" value={this.state.message} required/>

          <button type="submit">{ this.state.buttonText }</button>

        </form>
      </div>
    )
  }

}

export default Contact;
