import React, { useEffect, useState } from "react";
import axios from "axios";
import { HEADERDATA, SERVER_URL } from "@/utils/constants";
import { FaEnvelope, FaClock, FaUser } from "react-icons/fa";
import { Link, Navigate } from "react-router-dom";

interface StaffMember {
  id: number;
  fullName: string;
  email: string;
  photoUrl: string;
  specialization: string;
  availability: string;
}

const SalonStaff = () => {
  const [staffList, setStaffList] = useState<StaffMember[]>();

  useEffect(() => {
    const fetchStaffMembers = async () => {
      const {
        data: { data },
      } = await axios.get(`${SERVER_URL}/staff/stafflist`, HEADERDATA);
      console.log(data);
      setStaffList(data);
    };
    fetchStaffMembers();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-700 to-red-600 px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="mb-12 text-center text-5xl font-extrabold text-white drop-shadow-lg">
        Meet Our Talented Staff
      </h1>
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
        {staffList &&
          staffList.map((staff) => (
            <div
              key={staff.id}
              className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-purple-500 opacity-10 transition-all duration-300 group-hover:scale-150"></div>
              <div className="relative">
                <div className="mb-6 h-64 w-full overflow-hidden rounded-xl">
                  <img
                    src={staff.photoUrl || "/placeholder-staff.png"}
                    alt={staff.fullName}
                    className="h-full w-full object-cover transition-all duration-300 group-hover:scale-110"
                  />
                </div>
                <h2 className="mb-2 text-3xl font-bold text-gray-800">
                  {staff.fullName}
                </h2>
                <p className="mb-4 text-xl font-semibold text-purple-600">
                  {staff.specialization}
                </p>
                <div className="my-4 flex items-center text-gray-600">
                  <FaUser className="mr-2" />
                  Staff ID:<span className="ml-1">{staff.id}</span>
                </div>
                <div className="my-4 flex items-center text-gray-600">
                  <FaEnvelope className="mr-2" />
                  <span>{staff.email}</span>
                </div>

                <div className="mb-6 flex items-center text-gray-600">
                  <FaClock className="mr-2" />
                  <span>{staff.availability}</span>
                </div>
                <Link to="/book-appointment">
                  <button className="w-full rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 text-center text-lg font-semibold text-white transition-all duration-300 hover:from-purple-700 hover:to-pink-700 hover:shadow-lg">
                    Book Appointment
                  </button>
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SalonStaff;
