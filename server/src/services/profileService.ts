import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Updating user photo and fullName
export const updateUserProfile = async (
  id: number,
  fullName: string,
  photoUrl?: string,
  role?: string
) => {
  const data: { fullName: string; photoUrl?: string; role?: string } = {
    fullName,
  };

  if (photoUrl) {
    data.photoUrl = photoUrl;
  }

  if (role) {
    data.role = role;
  }

  const res = await prisma.user.update({
    where: {
      id,
    },
    data,
  });

  return res;
};

// fetching user data

export const getUserProfileData = async (id: number) => {
  const res = await prisma.user.findMany({
    where: {
      id,
    },
    select: {
      fullName: true,
      photoUrl: true,
      role: true
    },
  });
  return res;
};
