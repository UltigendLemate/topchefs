import cloudinary from 'cloudinary';
import {env} from '~/env.mjs';
const cloudinaryConfig = () => {
  cloudinary.v2.config({
    cloud_name: env.CLOUDINARY_API_CLOUD_NAME,
    api_key: env.CLOUDINARY_API_KEY,
    api_secret: env.CLOUDINARY_API_SECRET_KEY,
  });
};

export default cloudinaryConfig;
