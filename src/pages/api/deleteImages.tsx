/*eslint-disable*/
import cloudinary from 'cloudinary';
import { NextApiRequest, NextApiResponse } from "next";
import cloudinaryConfig from '~/utils/cloudinaryConfig';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { publicIds } = req.body;
  console.log(publicIds);
  cloudinaryConfig();
  let delIds = [];

  for (const publicId of publicIds) {
    const publicIdMatch = publicId.match(/\/v\d+\/[^/]+\/([^/.]+)/);
    if (!publicIdMatch || !publicIdMatch[1]) {
        return res.status(400).json({ error: 'Invalid image URL.' });
      }
    const newPublicId = "signaturedishes/" + publicIdMatch[1];
    delIds.push(newPublicId);
  }


  console.log(delIds);




  try {
    await cloudinary.v2.api.delete_resources(delIds);
    return res.status(200).json({ message: 'Files deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error});
  }
}
