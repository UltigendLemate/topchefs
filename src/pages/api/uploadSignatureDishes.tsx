/*eslint-disable*/
import { NextApiRequest, NextApiResponse } from "next";
import { env } from "~/env.mjs";
import formidable from 'formidable';
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
  const form = new formidable.IncomingForm({
    // keepExtensions: true,
    multiples: true,
  });
  await form.parse(req, (err: any, fields: any, files: any) => {
    if (err) {
      return res.status(500).json({ error: 'Error parsing form data.' });
    }
    console.log(files);
    const images = files.image;
    // console.log("\n\nyes\n\n",images, typeof(images));

    // Initialize Cloudinary with your configuration
    cloudinaryConfig();
    if (images.path) {
      cloudinary.v2.uploader.upload(images.path, { folder: "signaturedishes" }, (error, result) => {
        if (error) {
          return res.status(500).json({ error: 'Error uploading image to Cloudinary.' });
        }

        res.status(200).json([result]);
      });
    }

    else {

      // Upload the images to Cloudinary
      Promise.all(
        Object.keys(images).map(async (key) => {
          return await cloudinary.v2.uploader.upload(images[key].path, { folder: "signaturedishes" })
        })
      ).then((results) => {
        res.status(200).json(results);
      }).catch((error) => {
        console.log(error);
        res.status(500).json({ error });
      });
    }


  });
}
