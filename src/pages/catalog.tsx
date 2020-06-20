import React from 'react';
import { PageProps, Link, graphql } from 'gatsby';
import { Image, Transformation } from 'cloudinary-react';
import Layout from '../components/layout';
import SEO from '../components/seo';

type DataProps = {
    hasura: {
        devices_by_pk: {
            cases_devices: {
                image: string;
                case: {
                    id: number;
                    price: number;
                    name: string;
                };
            }[];
        };
    };
};

const CatalogPage: React.FC<PageProps<DataProps>> = ({
    data,
}): React.ReactElement => (
    <Layout>
        <SEO title="Catalog" />
        <section className="mx-0 xl:mx-40 px-4 xl:px-0">
            <header className="text-2xl border-b mb-16 mt-40 text-center">
                Catalog
            </header>
            <section className="grid lg:grid-cols-3 row-gap-4">
                {data.hasura.devices_by_pk.cases_devices.map(caseDevice => (
                    <Link
                        to={`/case/${caseDevice.case.name}`}
                        key={`case-${caseDevice.case.id}`}
                    >
                        <Image
                            cloudName={process.env.GATSBY_CLOUDINARY_NAME}
                            publicId={caseDevice.image}
                            secure="true"
                            dpr="auto"
                            responsive
                            className="mx-auto"
                        >
                            <Transformation quality="auto" fetchFormat="auto" />
                            <Transformation
                                width="800"
                                height="800"
                                crop="fill"
                            />
                        </Image>
                        <span className="px-6 break-words block underline">
                            {caseDevice.case.name}
                        </span>
                    </Link>
                ))}
            </section>
        </section>
    </Layout>
);

export const query = graphql`
    query {
        hasura {
            devices_by_pk(id: 2) {
                cases_devices {
                    image
                    case {
                        id
                        name
                    }
                }
            }
        }
    }
`;

export default CatalogPage;
