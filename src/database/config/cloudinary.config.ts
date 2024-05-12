import { v2 as cloudinary } from 'cloudinary';
import { config } from 'dotenv';
config();

export const CloudinaryConfig = {
  provide: 'CLOUDINARY',
  useFactory: () => {
    return cloudinary.config({
      cloud_name: process.env.CLOUNDINARY_CLOUD_NAME,
      api_key: process.env.CLOUNDINARY_API_KEY,
      api_secret: process.env.CLOUNDINARY_API_SECRET,
    });
  },
};
