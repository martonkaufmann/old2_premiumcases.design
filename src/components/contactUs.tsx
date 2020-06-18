import React, { ReactElement, useState, useRef } from 'react';
import axios from 'axios';
import HCaptcha from '@hcaptcha/react-hcaptcha';

const ContactUs: React.FC = (): ReactElement => {
    const [wasSubmitSuccessful, setWasSubmitSuccessful] = useState(null);
    const [hCaptchaToken, setHCaptchaToken] = useState(null);

    const emailInput = useRef(null);
    const subjectInput = useRef(null);
    const messageInput = useRef(null);

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        axios
            .post('/api/contactUs', {
                token: hCaptchaToken,
                email: emailInput.current.value,
                subject: subjectInput.current.value,
                message: messageInput.current.value,
            })
            .then(() => setWasSubmitSuccessful(true))
            .catch(() => setWasSubmitSuccessful(false));
    };

    return (
        <form
            className="flex-1 flex flex-col w-full"
            method="post"
            action="/api/contactUs"
            onSubmit={onSubmit}
        >
            <header className="border-b border-white text-lg mb-4 text-white">
                Contact us
            </header>
            {wasSubmitSuccessful === false && (
                <div className="text-red-500 mb-4">
                    Failed to submit message, please check that you filled all
                    the fields correctly!
                </div>
            )}
            {wasSubmitSuccessful === true && (
                <div className="text-green-500 mb-4">
                    Thank you for contacting us, we will get back to you
                    shortly!
                </div>
            )}
            <label htmlFor="contact-email" className="text-white">
                Email
            </label>
            <input
                type="email"
                name="email"
                id="contact-email"
                className="rounded-none px-2 py-1 mb-4 focus:outline-none"
                ref={emailInput}
            />
            <label htmlFor="contact-subject" className="text-white">
                Subject
            </label>
            <input
                type="text"
                name="subject"
                id="contact-subject"
                className="rounded-none px-2 py-1 mb-4 focus:outline-none"
                ref={subjectInput}
            />
            <label htmlFor="contact-message" className="text-white">
                Message
            </label>
            <textarea
                name="message"
                id="contact-message"
                className="rounded-none px-2 py-1 focus:outline-none mb-4"
                ref={messageInput}
            ></textarea>
            <HCaptcha
                id="contact-us-hcaptcha"
                sitekey={process.env.GATSBY_HCAPTCHA_SITE_KEY}
                onVerify={setHCaptchaToken}
            />
            <button
                className="px-4 py-3 mt-4 bg-white rounded-none focus:outline-none"
                disabled={hCaptchaToken === null}
            >
                Send message
            </button>
        </form>
    );
};

export default ContactUs;
