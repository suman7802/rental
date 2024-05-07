import {v2 as cloudinary} from 'cloudinary';

import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_SECRET,
} from './keys';

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

// category: 'media' or 'profile'
export  default function uploadMedia(files: any, uid: string, category: string) {
  return files.map(async (file: any) => {
    return await cloudinary.uploader.upload(file.tempFilePath, {
      resource_type: file.mimetype === 'video/mp4' ? 'video' : 'image',
      folder: `rental/${category}`,
      public_id: `${uid}}`,
    });
  });
}
