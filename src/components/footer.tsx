import React, { ReactElement } from 'react';
import { Link } from 'gatsby';
import ContactUs from './contactUs';

const Footer: React.FC = (): ReactElement => (
    <footer className="bg-black px-4 xl:px-0 mt-20">
        <section className="flex flex-col lg:flex-row xl:mx-40 py-8 border-b border-white">
            <ul className="text-white flex-1 flex mb-8 lg:mb-0 w-full">
                <li className="mr-8">
                    <header className="border-b border-white text-lg mb-4">
                        Customer service
                    </header>
                    <ul>
                        <li className="mb-1">
                            <Link to="/delivery-and-shipping">
                                Delivery and Shipping
                            </Link>
                        </li>
                        <li className="mb-1">
                            <Link to="/returns-and-exchanges">
                                Returns and Exchanges
                            </Link>
                        </li>
                        <li className="mb-1">
                            <Link to="/terms-and-conditions">
                                Terms and Conditions
                            </Link>
                        </li>
                        <li className="">
                            <Link to="/privacy-policy">Privacy Policy</Link>
                        </li>
                    </ul>
                </li>
                <li>
                    <header className="border-b border-white text-lg mb-4">
                        Social
                    </header>
                    <ul>
                        <li className="mb-1">
                            <a
                                href="https://twitter.com/cases_design"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Twitter
                            </a>
                        </li>
                        <li className="mb-1">
                            <a
                                href="https://www.pinterest.com/account1228/"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Pinterest
                            </a>
                        </li>
                        <li className="mb-1">
                            <a
                                href="https://www.instagram.com/premiumcases.design/"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Instagram
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>
            <ContactUs />
        </section>
        <section className="flex items-center justify-center h-12 text-white">
            Made with
            <span className="material-icons text-red-500 mx-2">favorite</span>
            using&nbsp;
            <a
                target="_blank"
                href="https://www.gatsbyjs.org/"
                rel="noreferrer"
                className="underline"
            >
                Gastby
            </a>
        </section>
    </footer>
);

export default Footer;
