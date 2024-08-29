import { HEADERDATA, SERVER_URL } from "@/utils/constants";
import axios from "axios";
import { useEffect, useState } from "react";

const UserAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const getUserAppointments = async () => {
      try {
        const {
          data: { data },
        } = await axios.get(
          `${SERVER_URL}/appointment/user-appointment`,
          HEADERDATA,
        );
        console.log(data)
        setAppointments(data);
      } catch (error) {
        console.error("Failed to fetch appointments", error);
      }
    };
    getUserAppointments();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl  font-bold mb-6">Your Appointments</h1>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {appointments && appointments.map((appointment:any) => (
          <div
            key={appointment.id}
            className="bg-white shadow-lg rounded-lg p-6 border border-gray-200"
          >
            <h2 className="text-xl font-semibold mb-2">
              Appointment #{appointment.id}
            </h2>
            <p className="text-gray-600 mb-2">
              <span className="font-semibold">Service Name:</span>
              {appointment.service.name}
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-semibold">Staff Name:</span>{" "}
              {appointment.staff.fullName}
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-semibold">Date & Time:</span>{" "}
              {new Date(appointment.dateTime).toLocaleString()}
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-semibold">Status:</span>{" "}
              <span
                className={`${
                  appointment.status === "SUCCESSFUL"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {appointment.status}
              </span>
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-semibold">Amount: </span>
             <span className="font-semibold text-green-500">$500</span> 
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-semibold">Order ID:</span>
              {appointment.orderId}
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-semibold">Payment ID:</span>
              {appointment.paymentId}
            </p>
            <p className="text-gray-400 text-sm">
              Created at:{" "}
              {new Date(appointment.createdAt).toLocaleDateString()}
            </p>
            <p className="text-gray-400 text-sm">
              Last updated:{" "}
              {new Date(appointment.updatedAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserAppointments;
