import React, { ReactElement } from 'react';
import { Helmet } from 'react-helmet';
import Navigation from './navigation';
import Footer from './footer';

import './layout.css';

type DataProps = {
    children: React.ReactElement[];
};

const Layout: React.FC<DataProps> = ({ children }): ReactElement => (
    <React.Fragment>
        <Helmet>
            {/* Snipcart */}
            <link
                href="https://cdn.snipcart.com/themes/2.0/base/snipcart.min.css"
                rel="stylesheet"
                type="text/css"
            />
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
            <script
                id="snipcart"
                src="https://cdn.snipcart.com/scripts/2.0/snipcart.js"
                data-api-key={process.env.GATSBY_SNIPCART_API_KEY}
            ></script>
            {/* Material icons */}
            <link
                href="https://fonts.googleapis.com/icon?family=Material+Icons"
                rel="stylesheet"
            ></link>
            {/* Fonts */}
            <link
                href="https://fonts.googleapis.com/css2?family=Dancing+Script&family=Lexend+Tera&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
                rel="stylesheet"
            ></link>
        </Helmet>
        <Navigation />
        <main className="mt-16">{children}</main>
        <Footer />
    </React.Fragment>
);

export default Layout;
