/*eslint-disable*/
import { NextApiRequest, NextApiResponse } from "next";
import {env } from "~/env.mjs";



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.body);
  if (req.method == 'POST') {
    const options = {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          grant_type: 'client_credentials',
          client_id: env.INSTAMOJO_CLIENT_ID,
          client_secret: env.INSTAMOJO_CLIENT_SECRET
        })
      };
      
      try {
        const response = await fetch('https://api.instamojo.com/oauth2/token/', options);
        const responseJson = await response.json();
      
        // Return the response
        return res.status(200).json(responseJson);
      } catch (err) {
        // Handle the error
        console.error(err);
      }

  }
  res.status(400).json({
    message: 'Invalid request method',
  })
}

