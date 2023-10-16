/*eslint-disable*/
import { NextApiRequest, NextApiResponse } from "next";



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log("payment req")
    console.log(req.body);
  const {access_token, amount, purpose} = JSON.parse(req.body);
  console.log(access_token, amount, purpose)
  if (req.method == 'POST') {
    const options = {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${access_token}`,
        },
        body: new URLSearchParams({
            amount : amount,
            purpose : purpose,
          allow_repeated_payments: "false",
          send_email: "false",
          send_sms: "false",
          redirect_url: 'http://localhost:3000/confirmation'
        })
      };
      
      try {
        const response = await fetch('https://api.instamojo.com/v2/payment_requests/', options);
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

