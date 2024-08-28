import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const insertServices = async (
  name: string,
  description: string,
  duration: number,
  price: number,
  imageUrl: string
) => {
  const res = await prisma.services.create({
    data: {
      name,
      description,
      duration,
      price,
      imageUrl,
    },
  });
  return res;
};

/*----------------------fetch services------------------- */

export const fetchServices = async () => {
  const res = await prisma.services.findMany();
  return res;
};
