/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const slugify = require('slugify');

exports.createPages = async ({ actions, graphql }) => {
    const { data } = await graphql(`
        query {
            hasura {
                cases {
                    id
                    name
                }
            }
        }
    `);

    for (const c of data.hasura.cases) {
        actions.createPage({
            path: `/case/${slugify(c.name)}`,
            component: require.resolve(`./src/templates/case.tsx`),
            context: { id: c.id },
        });
    }
};
