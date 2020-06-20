import React from 'react';
import { PageProps } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';

const PrivacyPolicyPage: React.FC<PageProps> = () => (
    <Layout>
        <SEO title="Privacy Policy" />
        <section className="mx-0 xl:mx-40 px-4 xl:px-0">
            <header className="text-2xl border-b mb-16 mt-40 text-center">
                Privacy Policy
            </header>
            <article>
                <p>
                    The "Premium Cases | Design" website uses cookies, tracking
                    pixels and related technologies for analyzing visitor
                    behaviour to improving our website. The data collected from
                    our website visitors will not be used by or transfered to
                    any third parties.
                </p>
                <p>
                    We use{' '}
                    <a
                        href="https://matomo.org/"
                        target="_blank"
                        rel="noreferrer"
                        className="underline"
                    >
                        matomo
                    </a>{' '}
                    to track and analyze our visitors behaviour.
                </p>
            </article>
        </section>
    </Layout>
);

export default PrivacyPolicyPage;
