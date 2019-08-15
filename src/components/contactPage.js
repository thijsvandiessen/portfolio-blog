import React, {Component} from 'react';
import ContactForm from './contactForm';
import GradientHeader from './gradientHeader';


class ContactPage extends Component {
  render() {
    const heading = {
      title: 'Get in contact with me',
    };

    return (
      <main>
        <GradientHeader heading={heading} />
        <section className="content-container">
          <h2>Send me an email and I will get back to you.</h2>
          <ContactForm />
        </section>
      </main>
    );
  }
}

export default ContactPage;
