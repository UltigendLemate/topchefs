/*eslint-disable*/
import { NextApiRequest, NextApiResponse } from "next";
import { env } from "~/env.mjs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  console.log(req.body);
  const { phone } = JSON.parse(req.body);
  if (req.method == "POST") {
    try {
      const response = await fetch(
        `https://2factor.in/API/V1/${env.SMS_OTP_KEY}/SMS/${phone}/AUTOGEN`,
        {
          method: "GET",
          redirect: "follow",
        },
      );
      const responseJson = await response.json();

      // Return the response
      return res.status(200).json(responseJson);
    } catch (err) {
      // Handle the error
      console.error(err);
    }
  }
  res.status(400).json({
    message: "Invalid request method",
  });
}
