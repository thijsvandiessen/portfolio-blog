import React, {Component} from 'react';

class ContactForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      message: '',
      isValidated: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let change = {}
    change[event.target.name] = event.target.value
    this.setState(change)
  }

  handleSubmit(event) {
    // todo
  }



  render() {
    return (<form action="https://formspree.io/info@vandiessen.com" method="POST" id="contactForm" onSubmit={this.handleSubmit}>
      <label htmlFor="name">Your name:</label>
      <input
        type="text"
        id="name"
        name="name"
        value={this.state.name}
        onChange={this.handleChange.bind(this)}
        required="required"
        placeholder="Just your name"/>
      <label htmlFor="email">Your email address:</label>
      <input
        type="email"
        id="email"
        name="email"
        value={this.state.email}
        onChange={this.handleChange.bind(this)}
        required="required"
        placeholder="I would like to contact you too"/>
      <label htmlFor="message">Message:</label>
      <textarea
        id="message"
        name="message"
        value={this.state.message}
        onChange={this.handleChange.bind(this)}
        placeholder="Your message">
      </textarea>
      <input type="hidden" name="isValidated" value="false" />
      <input type="submit" value="Submit" className="button"/>
    </form>
  );
  }
}

export default ContactForm;
