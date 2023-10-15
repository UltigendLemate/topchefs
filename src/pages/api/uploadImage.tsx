/*eslint-disable*/
import { NextApiRequest, NextApiResponse } from "next";
import {env } from "~/env.mjs";



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.body);
  const { upImage } = JSON.parse(req.body);
  if (req.method == 'POST') {

      
      try {
        const formData = new FormData();
      // Append the image to form data
      formData.append('file', upImage!);
      // Bind the upload preset to the form data
      formData.append("upload_preset", env.CLOUDINARY_PRESET)
      const url = `https://api.cloudinary.com/v1_1/${env.CLOUDINARY_KEY}/image/upload`
      console.log(formData);
      const uploadResponse = await fetch(url, { method: "POST", body: formData });
      const uploadedImageData = await uploadResponse.json();
      console.log(uploadedImageData);
      const imageUrl = uploadedImageData.secure_url;
      console.log(imageUrl);
      
        // Return the response
        return res.status(200).json(uploadedImageData);
      } catch (err) {
        // Handle the error
        console.error(err);
      }

  }
  res.status(400).json({
    message: 'Invalid request method',
  })
}

