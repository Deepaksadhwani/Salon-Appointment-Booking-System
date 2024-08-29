import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface appointment {
  userId: number;
  serviceId: number;
  staffId: number;
  dateTime: Date;
  status: string;
}

export const insertAppointment = async (data: appointment) => {
    const res = await prisma.appointment.create({
        data: {
          userId: data.userId,
          serviceId: data.serviceId,
          staffId: data.staffId,
          dateTime: data.dateTime,
          status: data.status,
        },
        include: {
          user: {
            select: {
              fullName: true,
              email: true,
            },
          },
          service: {
            select: {
              name: true,
              description: true,
            },
          },
          staff: {
            select: {
              fullName: true,
              email: true,
              specialization: true,
            },
          },
        },
      });
    
      return res;
};
