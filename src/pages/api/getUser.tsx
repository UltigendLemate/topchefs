/*eslint-disable*/
import { NextApiRequest, NextApiResponse } from "next";
import { env } from "~/env.mjs";
import {prisma} from "~/server/client";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    console.log(req.body);
    const { id } = JSON.parse(req.body);
    if (req.method == "POST") {
        try {
            const user = await prisma.user.findUnique({
                where: { id},
          
              });


            

            // Return the response
            return res.status(200).json(user);
        } catch (err) {
            // Handle the error
            console.error(err);
        }
    }
    res.status(400).json({
        message: "Invalid request method",
    });
}
