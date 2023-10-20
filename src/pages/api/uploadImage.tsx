/*eslint-disable*/
import { NextApiRequest, NextApiResponse } from "next";
import { env } from "~/env.mjs";
import formidable from 'formidable';
import fs from 'fs';
export const config = {
  api: {
    bodyParser: false, // Disable automatic parsing
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const form = new formidable.IncomingForm();

      form.parse(req, async (err, fields, files) => {
        if (err) {
          console.error("Error parsing form data:", err);
          return res.status(500).json({ message: "Error parsing form data" });
        }
        const file = files.file as Buffer;
        const formData = new FormData();
        formData.append("file", file); // 'as Buffer' to cast the file to Buffer
        formData.append("upload_preset", env.CLOUDINARY_PRESET);

        const uploadResponse = await fetch(`https://api.cloudinary.com/v1_1/${env.CLOUDINARY_KEY}/image/upload`, {
          method: "POST",
          body: formData,
        });

        if (uploadResponse.ok) {
          const uploadedImageData =await uploadResponse.json().then((data) => {
            return res.status(200).json(data);
          });
        } else {
          console.error("Image upload to Cloudinary failed");
          console.log(uploadResponse);
          res.status(500).json({ message: "Image upload failed" });
        }
        
      });
    } 
    catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Error on the server" });
    }
  }

  else {res.status(400).json({ message: "Invalid request method" }); }
}
