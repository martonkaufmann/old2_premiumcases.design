import React, { ReactElement } from 'react';
import { Helmet } from 'react-helmet';
import Navigation from './navigation';
import Footer from './footer';

import './layout.css';
import 'lazysizes';

type DataProps = {
    children: React.ReactElement[];
};

const Layout: React.FC<DataProps> = ({ children }): ReactElement => (
    <React.Fragment>
        <Helmet>
            <link
                href="https://cdn.snipcart.com/themes/2.0/base/snipcart.min.css"
                rel="stylesheet"
            />
            <link
                href="https://fonts.googleapis.com/css2?family=Material+Icons&family=Dancing+Script&family=Lexend+Tera&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
                rel="stylesheet"
            />
            <meta name="p:domain_verify" content="17b9560087fe53bf637eec7223a3d6d2"/>
        </Helmet>
        <Navigation />
        <main className="mt-16">{children}</main>
        <Footer />
        {/* Snipcart */}
        <script
            defer={true}
            src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"
        ></script>
        <script
            defer={true}
            id="snipcart"
            src="https://cdn.snipcart.com/scripts/2.0/snipcart.js"
            data-api-key={process.env.GATSBY_SNIPCART_API_KEY}
        ></script>
    </React.Fragment>
);

export default Layout;
