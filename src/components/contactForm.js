import React from 'react';
import { useForm, ValidationError } from '@formspree/react';

export default function Contactform() {
  const [state, handleSubmit] = useForm("mrgrewjp");
  if (state.succeeded) {
    return <p>Thanks for your message!</p>;
  }
  return (
    <form onSubmit={handleSubmit}>
      <h2>Send me an email and I will get back to you.</h2>

      <label htmlFor="email">
        Email Address
        </label>
      <input
        id="email"
        type="email"
        name="email"
      />
      <ValidationError
        prefix="Email"
        field="email"
        errors={state.errors}
      />
      <label htmlFor="message">Message:</label>

      <textarea
        id="message"
        name="message"
      />
      <ValidationError
        prefix="Message"
        field="message"
        errors={state.errors}
      />
      <button type="submit" disabled={state.submitting} className="button">
        Submit
        </button>
    </form>
  );
}
