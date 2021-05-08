
import React from 'react';
import { useForm, ValidationError } from '@formspree/react';

export default function Formspree() {
    const [state, handleSubmit] = useForm("mrgrewjp");
    if (state.succeeded) {
        return <p>Thanks for joining!</p>;
    }
    return (
        <form onSubmit={handleSubmit}>
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