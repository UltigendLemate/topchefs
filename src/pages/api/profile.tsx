/*eslint-disable*/
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log(req.body);
  


    if (req.method == 'POST'){
        const {id} = req.body;
        const updatedUser = await prisma.user.update({
            where: {
              id,
            },
            data: {
              ...req.body
            },
          })
          console.log("updated user", updatedUser)
          return res.status(200).json(updatedUser)
        
    }
    res.status(400).json({
            message: 'Invalid request method',
          })
  }

