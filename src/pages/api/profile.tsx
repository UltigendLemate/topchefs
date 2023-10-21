/*eslint-disable*/
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/server/client";




export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // console.log("req bodyyy : ",req.body);
  if (req.method == 'POST') {
    const { id } = req.body;
    // console.log(req.body);
    let speciality = [];
    let cuisine = [];
    console.log("req here\n\n\n",req.body)

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    // console.log("user data: \n\n",user)

    if (req.body.Speciality) {
      for (const specialityTag of req.body.Speciality) {
        // Create or update the speciality tag entry.
        const specialityTagEntry = await prisma.specialityTags.upsert({
          where: {
            name: specialityTag,
          },
          create: {
            name: specialityTag,
          },
          update: {},
        });

        // Add the speciality tag to the user's speciality tag array.
        speciality.push({ id: specialityTagEntry.id });
      }

      // console.log("user data after spceiality: \n\n", speciality)

    }

    if (req.body.CuisineSpecialization) {

      for (const cuisineSpecialization of req.body.CuisineSpecialization) {
        // Create or update the cuisine specialization entry.
        const cuisineSpecializationEntry = await prisma.cuisineSpecialization.upsert({
          where: {
            name: cuisineSpecialization,
          },
          create: {
            name: cuisineSpecialization,
          },
          update: {},
        });

        // Add the cuisine specialization to the user's cuisine specialization array.
        // cuisineSpecialization.push(cuisineSpecializationEntry.id);
        cuisine.push({ id: cuisineSpecializationEntry.id });

      }

      // console.log("user data after cusine: \n\n", cuisine)

    }



    const updatedUser = await prisma.user.update({
      where: {
        id,
      },
      data: {
        ...req.body,
        Speciality: {
          set: speciality
        },
        CuisineSpecialization: {
          set: cuisine
        },
      },
    })
    console.log("updated user", updatedUser)
    return res.status(200).json(updatedUser)

  }
  res.status(400).json({
    message: 'Invalid request method',
  })
}

