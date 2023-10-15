/*eslint-disable*/
import { NextApiRequest, NextApiResponse } from "next";



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log("payment req")
  const {access_token, paymentRequestId} = JSON.parse(req.body);
  console.log(access_token, paymentRequestId)
  if (req.method == 'POST') {
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${access_token}`
        }
      };
      
      try {
        const response = await fetch(`https://api.instamojo.com/v2/payment_requests/${paymentRequestId}`, options);
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

