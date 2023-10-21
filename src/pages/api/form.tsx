import formidable from "formidable-serverless";
import { NextApiHandler } from "next";

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler: NextApiHandler = async (req, res) => {
  const form = new formidable.IncomingForm();
  form.parse(req, (err, _, files) => {
    console.log(err, files);
  });
  res.status(200);
};

export default handler;
