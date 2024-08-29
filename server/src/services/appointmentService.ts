import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface appointment {
  userId: number;
  serviceId: number;
  staffId: number;
  dateTime: Date;
  status: string;
  paymentId?: string;
  orderId?: string;
}

export const insertAppointment = async (data: appointment) => {
  const res = await prisma.appointment.create({
    data: {
      userId: data.userId,
      serviceId: data.serviceId,
      staffId: data.staffId,
      dateTime: data.dateTime,
      status: data.status,
      paymentId: data.paymentId,
      orderId: data.orderId,
    },
  });

  return res;
};
// fetch all appointments for admin

export const getAllAppointments = async () => {
  const data = await prisma.appointment.findMany({
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
  const totalStaffs = await prisma.staff.count();
  const totalServices = await prisma.services.count();
  return { data, totalServices, totalStaffs };
};

// get user  appointments

export const getUserAppointments = async (userId: number) => {
  const data = await prisma.appointment.findMany({
    where: {
      userId,
    },
    include: {
      service: {
        select: {
          name: true,
        },
      },
      staff: {
        select: {
          fullName: true,
        },
      },
    },
  });
  return data;
};
