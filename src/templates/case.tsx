import React, { useState } from 'react';
import { PageProps, Link, graphql } from 'gatsby';
import { Image, Transformation } from 'cloudinary-react';
import { Cloudinary } from 'cloudinary-core';
import Layout from '../components/layout';
import SEO from '../components/seo';

type DataProps = {
    hasura: {
        cases_by_pk: {
            id: number;
            price: number;
            name: string;
            artwork: string;
            case_devices: {
                image: string;
                device: {
                    id: number;
                    name: string;
                };
            }[];
        };
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

const CaseTemplate: React.FC<PageProps<DataProps>> = ({ data }) => {
    const cloudinary = new Cloudinary({
        cloud_name: process.env.GATSBY_CLOUDINARY_NAME,
    });

    const [selectedDeviceId, setSelectedDeviceId] = useState(
        data.hasura.cases_by_pk.case_devices[0].device.id,
    );
    const caseDevice = data.hasura.cases_by_pk.case_devices.find(
        caseDevice => caseDevice.device.id === selectedDeviceId,
    );
    const casePrice = (data.hasura.cases_by_pk.price / 100).toFixed(2);
    const caseImageSource = cloudinary.url(caseDevice.image, {
        quality: 'auto',
        fetchFormat: 'auto',
        secure: true,
        responsive: true,
        dpr: 'auto',
        width: 800,
        height: 800,
        crop: 'fill',
    });

    return (
        <Layout>
            <SEO
                title={data.hasura.cases_by_pk.name}
                meta={[
                    {
                        name: 'twitter:image',
                        content: caseImageSource,
                    },
                    {
                        name: 'og:type',
                        content: 'product',
                    },
                ]}
            />
            <section className="flex flex-col lg:flex-row xl:mx-40 px-4 xl:px-0">
                <section className="w-full">
                    <img src={caseImageSource} />
                </section>
                <aside className="mt-16">
                    <header className="text-2xl font-bold mb-2">
                        {data.hasura.cases_by_pk.name}
                    </header>
                    <section className="mb-12">${casePrice}</section>
                    <section className="mb-12">
                        <ol>
                            <li className="mb-1">
                                Dual layer case for extra durability and
                                protection
                            </li>
                            <li className="mb-1">
                                Impact resistant Polycarbonate outer shell
                            </li>
                            <li className="mb-1">
                                Inner TPU liner for extra impact resistance
                            </li>
                            <li className="mb-1">Photographic print quality</li>
                            <li>Clear, open ports for connectivity</li>
                        </ol>
                    </section>
                    <section className="my-6">
                        <header className="text-lg mb-4">
                            Select your device
                        </header>
                        <div className="flex flex-wrap">
                            {data.hasura.cases_by_pk.case_devices.map(
                                ({ device }) => (
                                    <button
                                        onClick={() =>
                                            setSelectedDeviceId(device.id)
                                        }
                                        className={`px-4 py-3 whitespace-no-wrap mb-3 mr-3 border border-black rounded-none focus:outline-none ${
                                            device.id === selectedDeviceId
                                                ? 'text-black bg-white'
                                                : 'text-white bg-black'
                                        } transition-colors duration-100 hover:bg-white hover:text-black`}
                                    >
                                        {device.name}
                                    </button>
                                ),
                            )}
                        </div>
                    </section>
                    <button
                        className="snipcart-add-item bg-red-400 text-white px-6 py-4 mt-12 rounded-none w-full md:w-auto focus:outline-none"
                        data-item-id={data.hasura.cases_by_pk.id}
                        data-item-price={casePrice}
                        data-item-image={caseImageSource}
                        data-item-name={data.hasura.cases_by_pk.name}
                        data-item-custom1-name="Device"
                        data-item-custom1-options={data.hasura.cases_by_pk.case_devices
                            .map(({ device }) => device.name)
                            .join('|')}
                        data-item-url={`${process.env.GATSBY_APP_URL}/case/${data.hasura.cases_by_pk.name}`}
                    >
                        Add to cart - ${casePrice}
                    </button>
                </aside>
            </section>
            <section className="mt-20 mb-20 xl:mx-40">
                <header className="text-2xl w-full border-b pb-4 text-center mb-16">
                    Latest designs
                </header>
                <section className="flex overflow-auto lg:grid lg:grid-cols-4 lg:row-gap-4">
                    {data.hasura.devices_by_pk.cases_devices.map(caseDevice => (
                        <Link
                            to={`/case/${caseDevice.case.name}`}
                            key={`case-${caseDevice.case.id}`}
                            className="w-64 lg:w-auto flex-shrink-0"
                        >
                            <Image
                                cloudName={process.env.GATSBY_CLOUDINARY_NAME}
                                publicId={caseDevice.image}
                                secure="true"
                                dpr="auto"
                                responsive
                                className="mx-auto"
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
                            <span className="px-6 break-words block underline text-sm">
                                {caseDevice.case.name}
                            </span>
                        </Link>
                    ))}
                </section>
            </section>
        </Layout>
    );
};

export default CaseTemplate;

export const query = graphql`
    query($id: Int!) {
        hasura {
            cases_by_pk(id: $id) {
                id
                name
                artwork
                price
                case_devices {
                    image
                    device {
                        id
                        name
                    }
                }
            }

            devices_by_pk(id: 2) {
                cases_devices(limit: 16) {
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
