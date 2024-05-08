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

export default async function uploadMedia(
  file: any,
  uid: string,
  category: string
): Promise<any> {
  const image = await cloudinary.uploader.upload(
    `data:${file.mimetype};base64,${file.buffer.toString('base64')}`,
    {
      resource_type: 'image',
      folder: `rental/${category}`,
      public_id: `${uid.slice(0, 5)}}`,
    }
  );
  return image.secure_url;
}

export async function uploadMultipleMedia(
  files: any[],
  uid: string,
  category: string
) {
  const promises = files.map(async (file) => {
    return await cloudinary.uploader.upload(
      `data:${file.mimetype};base64,${file.buffer.toString('base64')}`,
      {
        resource_type: 'auto',
        folder: `rental/${category}`,
        public_id: `${uid.slice(0, 5)}-${Date.now()}`,
      }
    );
  });
  return Promise.all(promises);
}
