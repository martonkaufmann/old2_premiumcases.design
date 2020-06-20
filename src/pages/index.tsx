import React from 'react';
import { PageProps, Link, graphql } from 'gatsby';
import { Image, Transformation } from 'cloudinary-react';
import { Cloudinary } from 'cloudinary-core';
import Layout from '../components/layout';
import SEO from '../components/seo';

type DataProps = {
    hasura: {
        cases: {
            id: number;
            name: string;
            artwork: string;
        }[];
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

const IndexPage: React.FC<PageProps<DataProps>> = ({
    data,
}): React.ReactElement => {
    const cloudinary = new Cloudinary({
        cloud_name: process.env.GATSBY_CLOUDINARY_NAME,
    });

    const headerImageSource = cloudinary.url('assets/index-header', {
        quality: 'auto',
        fetchFormat: 'auto',
        secure: true,
        responsive: true,
        dpr: 'auto',
    });

    return (
        <Layout>
            <SEO title="Home" />
            <header className="w-48 h-32 mx-auto items-center justify-center flex-col hidden lg:flex">
                <div
                    className="border-b border-gray-800"
                    style={{
                        fontFamily: 'Dancing Script',
                        fontSize: '2.2rem',
                    }}
                >
                    Premium Cases
                </div>
                <div
                    style={{
                        fontFamily: 'Lexend Tera',
                        fontSize: '1.8rem',
                        letterSpacing: '.2em',
                    }}
                >
                    DESIGN
                </div>
            </header>
            <section
                className="bg-cover flex items-center justify-center bg-center"
                style={{
                    height: 'calc(100vh - 12rem)',
                    backgroundImage: `url("${headerImageSource}")`,
                }}
            >
                <header className="text-white text-xl lg:text-2xl xl:text-3xl italic font-hairline text-center lg:w-1/2">
                    Keep your phone secure & stylish whether headed to the
                    office or wrapped in pastels for a spring time soirée.
                </header>
            </section>
            <section className="mt-40">
                <header className="text-2xl text-center mb-16">
                    Latest designs
                </header>
                <div className="grid grid-cols-8 grid-flow-row">
                    {data.hasura.cases.map(c => (
                        <Link
                            to={`/case/${c.name}`}
                            className="block overflow-hidden relative group"
                            key={`artwork-${c.id}`}
                        >
                            <Image
                                cloudName={process.env.GATSBY_CLOUDINARY_NAME}
                                publicId={c.artwork}
                                secure="true"
                                dpr="auto"
                                responsive
                                className="transition-transform duration-200 transform scale-100 group-hover:scale-110"
                                alt={c.name}
                            >
                                <Transformation
                                    quality="auto"
                                    fetchFormat="auto"
                                />
                                <Transformation
                                    width="400"
                                    height="400"
                                    crop="fill"
                                />
                            </Image>
                            <div className="flex justify-center items-center text-center p-4 bg-gray-800 bg-opacity-75 text-white absolute inset-0 transition-opacity duration-200 opacity-0 group-hover:opacity-100">
                                {c.name}
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
            <section className="mt-40 mx-0 xl:mx-40 xl:flex xl:flex-row px-4 xl:px-0">
                <Image
                    cloudName={process.env.GATSBY_CLOUDINARY_NAME}
                    publicId="assets/index-about"
                    secure="true"
                    dpr="auto"
                    responsive
                    className="mx-auto"
                    alt="About our cases"
                >
                    <Transformation quality="auto" fetchFormat="auto" />
                    <Transformation width="600" height="600" crop="fill" />
                </Image>
                <article className="ml-0 xl:ml-24 mt-12 xl:mt-0 flex-1 text-center">
                    <header className="text-2xl mb-16">About our cases</header>
                    <section className="mb-12 text-lg">
                        Accessorize your phone without sacrificing security with
                        our cases, they feature an impact resistant
                        Polycarbonate outer shell and inner TPU liner for extra
                        impact resistance.
                    </section>
                    <ol>
                        <li className="mb-3">
                            Dual layer case for extra durability and protection
                        </li>
                        <li className="mb-3">
                            Impact resistant Polycarbonate outer shell
                        </li>
                        <li className="mb-3">
                            Inner TPU liner for extra impact resistance
                        </li>
                        <li className="mb-3">Photographic print quality</li>
                        <li>Clear, open ports for connectivity</li>
                    </ol>
                </article>
            </section>
            <section className="mt-40 xl:mx-40 xl:flex xl:flex-row">
                <header className="text-2xl w-full xl:w-64 flex-shrink-0 border-b pb-4 xl:pb-0 xl:border-b-0 xl:border-r text-center xl:mt-6 mb-16 xl:mb-0">
                    Catalog
                </header>
                <section className="grid grid-cols-2 lg:grid-cols-4 row-gap-4">
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
                                alt={caseDevice.case.name}
                            >
                                <Transformation
                                    quality="auto"
                                    fetchFormat="auto"
                                />
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
                    <div className="lg:col-span-4 flex justify-center mt-16">
                        <Link
                            to="/cases"
                            className="text-white bg-black px-6 py-4 flex items-center"
                        >
                            Show more{' '}
                            <span className="material-icons ml-1">
                                chevron_right
                            </span>
                        </Link>
                    </div>
                </section>
            </section>
        </Layout>
    );
};

export const query = graphql`
    query {
        hasura {
            cases(limit: 24) {
                id
                name
                artwork
            }

            devices_by_pk(id: 2) {
                cases_devices(offset: 20, limit: 16) {
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

export default IndexPage;
