import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface StaffMember {
  fullName: string;
  email: string;
  photoUrl: string;
  specialization: string;
  availability: string;
}

export const addStaffMember = async (staff: StaffMember) => {
  const res = await prisma.staff.create({
    data: {
      fullName: staff.fullName,
      email: staff.email,
      photoUrl: staff.photoUrl,
      specialization: staff.specialization,
      availability: staff.availability,
    },
  });
  return res;
};

export const fetchAllStaff = async () => {
  const res = prisma.staff.findMany();
  return res;
};
