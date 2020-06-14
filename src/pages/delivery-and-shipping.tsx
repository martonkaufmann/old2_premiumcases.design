import React from 'react';
import { PageProps } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';

const DeliveryAndShippingPage: React.FC<PageProps> = () => (
    <Layout>
        <SEO title="Delivery And Shipping" />
        <section className="mx-0 xl:mx-40 px-4 xl:px-0">
            <header className="text-2xl border-b mb-16 mt-40 text-center">
                Delivery And Shipping
            </header>
            <article>TBA</article>
        </section>
    </Layout>
);

export default DeliveryAndShippingPage;
