import React from 'react';
import { PageProps } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';

const TermsAndConditionsPage: React.FC<PageProps> = () => (
    <Layout>
        <SEO title="Terms And Conditions" />
        <section className="mx-0 xl:mx-40 px-4 xl:px-0">
            <header className="text-2xl border-b mb-16 mt-40 text-center">
                Terms And Conditions
            </header>
            <article>TBA</article>
        </section>
    </Layout>
);

export default TermsAndConditionsPage;
