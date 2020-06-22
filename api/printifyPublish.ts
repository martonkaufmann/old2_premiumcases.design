import { NowRequest, NowResponse } from '@vercel/node';
import cloudinary from 'cloudinary';
import axios, { AxiosResponse } from 'axios';
import crypto from 'crypto';

const DEVICE_IPHONE_11: number = 1;
const DEVICE_IPHONE_11_PRO: number = 2;
const DEVICE_IPHONE_11_PRO_MAX: number = 3;
const DEVICE_IPHONE_8: number = 4;
const DEVICE_IPHONE_8_PLUS: number = 5;
const DEVICE_IPHONE_X: number = 6;
const DEVICE_IPHONE_XR: number = 7;
const DEVICE_IPHONE_XS: number = 8;
const DEVICE_IPHONE_XS_MAX: number = 9;

const PRINTIFY_DEVICE_IPHONE_11: number = 2243;
const PRINTIFY_DEVICE_IPHONE_11_PRO: number = 2244;
const PRINTIFY_DEVICE_IPHONE_11_PRO_MAX: number = 2245;
const PRINTIFY_DEVICE_IPHONE_8: number = 2088;
const PRINTIFY_DEVICE_IPHONE_8_PLUS: number = 2089;
const PRINTIFY_DEVICE_IPHONE_X: number = 2087;
const PRINTIFY_DEVICE_IPHONE_XR: number = 2103;
const PRINTIFY_DEVICE_IPHONE_XS: number = 2101;
const PRINTIFY_DEVICE_IPHONE_XS_MAX: number = 2102;

const PRINTIFY_SURFACE_GLOSSY: number = 1531;
const PRINTIFY_SURFACE_MATTE: number = 1532;

const DEVICE_MAP: number[][] = [
    [DEVICE_IPHONE_11, PRINTIFY_DEVICE_IPHONE_11],
    [DEVICE_IPHONE_11_PRO, PRINTIFY_DEVICE_IPHONE_11_PRO],
    [DEVICE_IPHONE_11_PRO_MAX, PRINTIFY_DEVICE_IPHONE_11_PRO_MAX],
    [DEVICE_IPHONE_X, PRINTIFY_DEVICE_IPHONE_X],
    [DEVICE_IPHONE_XR, PRINTIFY_DEVICE_IPHONE_XR],
    [DEVICE_IPHONE_XS, PRINTIFY_DEVICE_IPHONE_XS],
    [DEVICE_IPHONE_XS_MAX, PRINTIFY_DEVICE_IPHONE_XS_MAX],
    [DEVICE_IPHONE_8, PRINTIFY_DEVICE_IPHONE_8],
    [DEVICE_IPHONE_8_PLUS, PRINTIFY_DEVICE_IPHONE_8_PLUS],
];

const HASURA_HEARDERS: object = {
    'x-hasura-admin-secret': process.env.HASURA_API_SECRET,
    'content-type': 'application/json',
};

const PRINTIFY_HEADERS: object = {
    Authorization: `Bearer ${process.env.PRINTIFY_TOKEN}`,
};

const printifyProductPublishSuccess = async (
    shopId: number,
    productId: string,
): Promise<AxiosResponse> =>
    axios.post(
        `https://api.printify.com/v1/shops/${shopId}/products/${productId}/publishing_succeeded.json`,
        {},
        { headers: PRINTIFY_HEADERS },
    );

const pritifyGetArtwork = async (artworkId: string): Promise<AxiosResponse> =>
    axios.get(`https://api.printify.com/v1/uploads/${artworkId}.json`, {
        headers: PRINTIFY_HEADERS,
    });

const printifyGetProduct = async (
    shopId: number,
    productId: string,
): Promise<AxiosResponse> =>
    axios.get(
        `https://api.printify.com/v1/shops/${shopId}/products/${productId}.json`,
        { headers: PRINTIFY_HEADERS },
    );

const cloudinaryUploadImage = async (
    url: string,
    publicId: string,
): Promise<cloudinary.UploadApiResponse> =>
    cloudinary.v2.uploader.upload(url, {
        overwrite: false,
        public_id: publicId,
    });

const hasuraSaveCase = async (
    name: string,
    price: number,
    artwork: string,
): Promise<AxiosResponse> =>
    axios.post(
        process.env.HASURA_API_ENDPOINT,
        {
            query: `
                mutation insert_cases_one($name: String!, $price: Int!, $artwork: String!) {
                    insert_cases_one(object: {
                        name: $name,
                        price: $price,
                        artwork: $artwork
                    }) {
                        id
                    }
                }
            `,
            variables: { name, price, artwork },
        },
        { headers: HASURA_HEARDERS },
    );

const hasuraSaveCaseDevice = async (
    deviceId: number,
    caseId: number,
    image: string,
): Promise<AxiosResponse> =>
    axios.post(
        process.env.HASURA_API_ENDPOINT,
        {
            query: `
                mutation insert_cases_devices_one($deviceId: Int!, $caseId: Int!, $image: String!) {
                    insert_cases_devices_one(object: {
                        device_id: $deviceId,
                        case_id: $caseId,
                        image: $image
                    }) {
                        id
                    }
                }
            `,
            variables: { deviceId, caseId, image },
        },
        { headers: HASURA_HEARDERS },
    );

const generateCloudinaryPublicId = (str: string): string =>
    crypto.createHash('md5').update(str).digest('hex');

export default async (request: NowRequest, response: NowResponse) => {
    cloudinary.v2.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    console.log('Got publish message', request.body.resource.id);

    const promises: Promise<any>[] = [];

    const printifyProductId: string = request.body.resource.id;
    const printifyShopId: number = request.body.resource.data.shop_id;
    const printifyGetProductResponse = await printifyGetProduct(
        printifyShopId,
        printifyProductId,
    );
    const printifyProductArtworkId: string =
        printifyGetProductResponse.data.print_areas[0].placeholders[0].images[0]
            .id;
    const printifyGetArtworkResponse = await pritifyGetArtwork(
        printifyProductArtworkId,
    );
    const cloudinaryProductArtworkPublicId = generateCloudinaryPublicId(
        printifyGetArtworkResponse.data.preview_url,
    );

    const hasuraSaveCaseResponse = await hasuraSaveCase(
        printifyGetProductResponse.data.title,
        printifyGetProductResponse.data.variants[0].price,
        cloudinaryProductArtworkPublicId,
    );
    const hasuraCaseId: number =
        hasuraSaveCaseResponse.data.data.insert_cases_one.id;

    promises.push(
        cloudinaryUploadImage(
            printifyGetArtworkResponse.data.preview_url,
            cloudinaryProductArtworkPublicId,
        ),
    );

    for (const [hasuraDeviceId, printifyDeviceId] of DEVICE_MAP) {
        for (const variant of printifyGetProductResponse.data.variants) {
            if (
                variant.options.includes(printifyDeviceId) &&
                variant.options.includes(PRINTIFY_SURFACE_GLOSSY)
            ) {
                const printifyVariantImage = printifyGetProductResponse.data.images.find(
                    image => image.variant_ids.includes(variant.id),
                );
                const cloudinaryVariantImagePublicId = generateCloudinaryPublicId(
                    printifyVariantImage.src,
                );

                promises.push(
                    cloudinaryUploadImage(
                        printifyVariantImage.src,
                        cloudinaryVariantImagePublicId,
                    ),
                );

                promises.push(
                    hasuraSaveCaseDevice(
                        hasuraDeviceId,
                        hasuraCaseId,
                        cloudinaryVariantImagePublicId,
                    ),
                );
            }
        }
    }

    await Promise.all(promises);

    await printifyProductPublishSuccess(printifyShopId, printifyProductId);

    console.log('Case saved and product published');

    response.status(200).send({});
};
