/*eslint-disable*/
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/server/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == 'POST') {
    const { id } = req.body;
    let speciality = [];
    let cuisine = [];

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

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

