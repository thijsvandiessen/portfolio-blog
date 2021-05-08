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
          <ContactForm />
        </section>
      </main>
    );
  }
}

export default ContactPage;
