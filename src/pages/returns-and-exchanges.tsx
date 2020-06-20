import React from 'react';
import { PageProps } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';

const ReturnsAndExchangesPage: React.FC<PageProps> = () => (
    <Layout>
        <SEO title="Returns And Exchanges" />
        <section className="mx-0 xl:mx-40 px-4 xl:px-0">
            <header className="text-2xl border-b mb-16 mt-40 text-center">
                Returns And Exchanges
            </header>
            <article>
                <h1 className="text-lg mb-4">
                    Does Premium Cases guarantee its product?
                </h1>
                <p className="mb-2">
                    Of course! We're 100% committed to making you happy. Each
                    case is hand checked by a member of our team before it goes
                    out the door to ensure you get the best! While we make every
                    effort to ensure your case arrives in perfect condition,
                    sometimes things could happen. If you discover a fault with
                    the item(s) you have received, please take pictures of the
                    defect and contact us right away. We will work with you to
                    guarantee your satisfaction.
                </p>
                <p className="mb-2">
                    Please keep in mind that our products are made on demand
                    thus we cannot offer a refund or accept a returned item for
                    any other reason than that it is faulty and/or there are
                    issues with the print quality of the product.
                </p>
                <p>
                    Returns made will be refunded in your original form of
                    payment. If the payment was made using credit / debit card
                    or bank account, there might be a lead time required by
                    PayPal (our credit card settlement service provider) to set
                    up the credit transaction with your bank.
                </p>

                <section className="text-center text-lg font-bold mt-10">
                    Still not getting your answers? Contact us anytime!
                </section>
            </article>
        </section>
    </Layout>
);

export default ReturnsAndExchangesPage;
