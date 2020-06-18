import { NowRequest, NowResponse } from '@vercel/node';
import nodemailer from 'nodemailer';
import { verify } from 'hcaptcha';
import Joi from '@hapi/joi';

interface ValidationResult {
    value: {
        email: string;
        subject: string;
        message: string;
    };
    error: {
        details: {
            message: string;
            path: string[];
            type: string;
        }[];
    };
}

const validateRequest = (request: NowRequest): ValidationResult => {
    return Joi.object({
        email: Joi.string().email().required(),
        subject: Joi.string().empty().required(),
        message: Joi.string().empty().required(),
        token: Joi.string().empty().required(),
    }).validate(request.body || {});
};

const sendContactUsEmail = async (
    replyTo: string,
    subject: string,
    message: string,
): Promise<void> => {
    let transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
        },
    });

    transporter.sendMail({
        from: process.env.SMTP_USER,
        to: process.env.SMTP_USER,
        replyTo: replyTo,
        subject: 'Contact us - ' + subject,
        text: message,
        html: message,
    }, () => {});
};

const isHCaptchaTokenValid = async (token: string): Promise<boolean> => {
    try {
        await verify(process.env.HCAPTCHA_SECRET, token);
    } catch {
        return false;
    }

    return true;
};

export default async (request: NowRequest, response: NowResponse) => {
    if (!request.body) {
        response.status(400).send({});
    }

    const isTokenValid = await isHCaptchaTokenValid(request.body.token);

    if (!isTokenValid) {
        response.status(400).send({});
    }

    const validationResult = validateRequest(request);

    if (validationResult.error) {
        response.status(400).send({});
        return;
    }

    await sendContactUsEmail(
        validationResult.value.email,
        validationResult.value.subject,
        validationResult.value.message,
    );

    response.status(200).send({});
};
