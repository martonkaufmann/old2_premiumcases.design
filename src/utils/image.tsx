import { Cloudinary, Transformation } from 'cloudinary-core';

const cloudinary = new Cloudinary({
    cloud_name: process.env.GATSBY_CLOUDINARY_NAME,
});

export const cloudinaryResponsiveImage = (
    publicId: string,
    options?: Transformation | Transformation.Options,
): string =>
    cloudinary.url(publicId, {
        quality: 'auto',
        fetchFormat: 'auto',
        secure: true,
        responsive: true,
        dpr: 'auto',
        ...options,
    });
