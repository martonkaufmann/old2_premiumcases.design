import React from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

type DataProps = {
    title: string;
    description?: string;
    lang?: string;
    meta?: {
        name: string;
        content: string;
    }[];
};

type SiteMetadata = {
    title: string;
    description: string;
    author: string;
};

const SEO: React.FC<DataProps> = ({
    title,
    description = '',
    lang = 'en',
    meta = [],
}): React.ReactElement => {
    const query = useStaticQuery(
        graphql`
            query {
                site {
                    siteMetadata {
                        title
                        description
                        author
                    }
                }
            }
        `,
    );
    const siteMetadata: SiteMetadata = query.site.siteMetadata;
    const metaDescription = description || siteMetadata.description;

    return (
        <Helmet
            htmlAttributes={{
                lang,
            }}
            title={title}
            titleTemplate={`%s | ${siteMetadata.title}`}
            meta={[
                {
                    name: 'description',
                    content: metaDescription,
                },
                {
                    property: 'og:title',
                    content: title,
                },
                {
                    property: 'og:description',
                    content: metaDescription,
                },
                {
                    property: 'og:type',
                    content: 'website',
                },
                {
                    property: 'og:site_name',
                    content: siteMetadata.title,
                },
                {
                    name: 'twitter:card',
                    content: 'summary',
                },
                {
                    name: 'twitter:creator',
                    content: siteMetadata.author,
                },
                {
                    name: 'twitter:title',
                    content: title,
                },
                {
                    name: 'twitter:description',
                    content: metaDescription,
                },
            ].concat(meta)}
        />
    );
};

export default SEO;
