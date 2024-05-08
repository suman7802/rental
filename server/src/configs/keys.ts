import dotenv from 'dotenv';
dotenv.config();

// load environment variables
export const PORT = process.env.PORT || 8000;
export const SECRET = process.env.SECRET as string;
export const NODE_ENV = process.env.NODE_ENV as string;
export const JWT_SECRET = process.env.JWT_SECRET as string;
export const COOKIE_NAME = process.env.COOKIE_NAME as string;
export const DATABASE_URL = process.env.DATABASE_URL as string;
export const ALLOW_ORIGIN = process.env.ALLOW_ORIGIN as string;
export const ADMIN = (process.env.ADMIN ? process.env.ADMIN : 'default').split(',');
export const AGE_OF_COOKIE: number = Number(process.env.AGE_OF_COOKIE) || 1000 * 60 * 60 * 24 * 365;


// firebase config
export const FIREBASE_API_KEY = process.env.FIREBASE_API_KEY as string;
export const FIREBASE_AUTH_DOMAIN = process.env.FIREBASE_AUTH_DOMAIN as string;
export const FIREBASE_PROJECT_ID = process.env.FIREBASE_PROJECT_ID as string;
export const FIREBASE_STORAGE_BUCKET = process.env.FIREBASE_STORAGE_BUCKET as string;
export const FIREBASE_MESSAGING_SENDER_ID = process.env.FIREBASE_MESSAGING_SENDER_ID as string;
export const FIREBASE_APP_ID = process.env.FIREBASE_APP_ID as string;


// cloudinary config
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY as string;
export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME as string;
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET as string;