module.exports = {
    siteMetadata: {
        title: `Premium Cases|Design`,
        description: `Keep your phone secure & stylish whether headed to the office or wrapped in pastels for a spring time soirée.`,
        author: `PremiumCases|Design`,
    },
    plugins: [
        `gatsby-plugin-postcss`,
        `gatsby-plugin-react-helmet`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/src/images`,
            },
        },
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `gatsby-starter-default`,
                short_name: `starter`,
                start_url: `/`,
                background_color: `#663399`,
                theme_color: `#663399`,
                display: `minimal-ui`,
                icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
            },
        },
        {
            resolve: 'gatsby-source-graphql',
            options: {
                // Arbitrary name for the remote schema Query type
                typeName: 'HASURA',
                // Field under which the remote schema will be accessible. You'll use this in your Gatsby query
                fieldName: 'hasura',
                // Url to query from
                url: process.env.HASURA_API_ENDPOINT,
                // HTTP headers
                headers: {
                    // Learn about environment variables: https://gatsby.dev/env-vars
                    'x-hasura-admin-secret': process.env.HASURA_API_SECRET,
                    'content-type': 'application/json',
                },
            },
        },
        {
            resolve: `gatsby-plugin-google-analytics`,
            options: {
              // The property ID; the tracking code won't be generated without it
              trackingId: process.env.GATSBY_GOOGLE_TRACKING_ID,
              // Defines where to place the tracking script - `true` in the head and `false` in the body
              head: false,
              // Avoids sending pageview hits from custom paths
              exclude: [],
              // Delays sending pageview hits on route update (in milliseconds)
              pageTransitionDelay: 0,
              defer: true,
            },
          },
        // this (optional) plugin enables Progressive Web App + Offline functionality
        // To learn more, visit: https://gatsby.dev/offline
        // `gatsby-plugin-offline`,
    ],
};
