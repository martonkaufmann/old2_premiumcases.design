import React from 'react';
import { PageProps, Link, graphql } from 'gatsby';
import { cloudinaryResponsiveImage } from './../utils/image';
import slugify from 'slugify';
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
}): React.ReactElement => (
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
                backgroundImage: `url("${cloudinaryResponsiveImage(
                    'assets/index-header',
                )}")`,
            }}
        >
            <header className="text-white text-xl lg:text-2xl xl:text-3xl italic font-hairline text-center lg:w-1/2">
                Keep your phone secure & stylish whether headed to the office or
                wrapped in pastels for a spring time soirée.
            </header>
        </section>
        <section className="mt-40">
            <header className="text-2xl text-center mb-16">
                Latest designs
            </header>
            <div className="grid grid-cols-8 grid-flow-row">
                {data.hasura.cases.map(c => (
                    <Link
                        to={`/case/${slugify(c.name)}`}
                        className="block overflow-hidden relative group"
                        key={`artwork-${c.id}`}
                    >
                        <img
                            alt={c.name}
                            className="lazyload transition-transform duration-200 transform scale-100 group-hover:scale-110"
                            data-src={cloudinaryResponsiveImage(c.artwork, {
                                width: 300,
                                height: 300,
                                crop: 'fill',
                            })}
                        />
                        <div className="lg:text-sm flex justify-center items-center text-center p-4 bg-gray-800 bg-opacity-75 text-white absolute inset-0 transition-opacity duration-200 opacity-0 group-hover:opacity-100">
                            {c.name}
                        </div>
                    </Link>
                ))}
            </div>
        </section>
        <section className="mt-40 mx-0 xl:mx-40 xl:flex xl:flex-row px-4 xl:px-0">
            <img
                alt="About our cases"
                className="lazyload mx-auto"
                data-src={cloudinaryResponsiveImage('assets/index-about', {
                    width: 600,
                    height: 600,
                    crop: 'fill',
                })}
            />
            <article className="ml-0 xl:ml-24 mt-12 xl:mt-0 flex-1 text-center">
                <header className="text-2xl mb-16">About our cases</header>
                <section className="mb-12 text-lg">
                    Accessorize your phone without sacrificing security with our
                    cases, they feature an impact resistant Polycarbonate outer
                    shell and inner TPU liner for extra impact resistance.
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
                        to={`/case/${slugify(caseDevice.case.name)}`}
                        key={`case-${caseDevice.case.id}`}
                    >
                        <img
                            alt={caseDevice.case.name}
                            className="lazyload mx-auto"
                            data-src={cloudinaryResponsiveImage(
                                caseDevice.image,
                                { width: 500, height: 500, crop: 'fill' },
                            )}
                        />
                        <span className="px-6 break-words block underline">
                            {caseDevice.case.name}
                        </span>
                    </Link>
                ))}
                <div className="col-span-2 lg:col-span-4 flex justify-center mt-16">
                    <Link
                        to="/catalog"
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

export const query = graphql`
    query {
        hasura {
            cases(limit: 24, order_by: {id: desc}) {
                id
                name
                artwork
            }

            devices_by_pk(id: 2) {
                cases_devices(offset: 20, limit: 16, order_by: {id: desc}) {
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
