/*eslint-disable*/
import { NextApiRequest, NextApiResponse } from "next";
import { env } from "~/env.mjs";
import formidable from 'formidable-serverless';
import cloudinary from 'cloudinary';
// import fs from 'fs';
import cloudinaryConfig from "~/utils/cloudinaryConfig";
export const config = {
  api: {
    bodyParser: false, // Disable automatic parsing
  },
};


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed.' });
  }
    const form = new formidable.IncomingForm();
    form.parse(req, (err: any, fields: any, files: { file: { path: any; }; } ) => {
      if (err) {
        return res.status(500).json({ error: 'Error parsing form data.' });
      }
  
      const image = files.file.path;
  
      // Initialize Cloudinary with your configuration
      cloudinaryConfig();
  
      // Upload the image to Cloudinary
      cloudinary.v2.uploader.upload(image, {folder : "topchefs"} ,(error, result) => {
        if (error) {
          return res.status(500).json({ error: 'Error uploading image to Cloudinary.' });
        }
  
        res.status(200).json(result);
      });
    });
  }