/*eslint-disable*/
import cloudinary from 'cloudinary';
import cloudinaryConfig from '~/utils/cloudinaryConfig';
import { NextApiRequest, NextApiResponse } from "next";




export default async function handler(req: NextApiRequest, res: NextApiResponse){
  if (req.method === 'POST') {
    try {
      // Extract the public ID from the image URL
      cloudinaryConfig();
      const {url} = req.body;
      console.log(url);

      const publicIdMatch = url.match(/\/v\d+\/[^/]+\/([^/.]+)/);
      console.log("public id\n\n\n\n\n",publicIdMatch[1])
      if (!publicIdMatch || !publicIdMatch[1]) {
        return res.status(400).json({ error: 'Invalid image URL.' });
      }

      const publicId = publicIdMatch[1];

      // Delete the image from Cloudinary
      const result = await cloudinary.v2.uploader.destroy("topchefs/" + publicId);

      if (result.result === 'ok') {
        res.status(200).json({ message: 'Image deleted successfully.' });
      } else {
        console.log("error : " , result);
        res.status(500).json({ error: 'Failed to delete the image.' });
      }
    } catch (error) {
      console.log("error : " , error);
      res.status(500).json({ error: 'An error occurred while deleting the image.' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
