import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { HEADERDATA, SERVER_URL } from "@/utils/constants";
import { FaEnvelope, FaClock } from 'react-icons/fa';

interface StaffMember {
    id: number;
    fullName: string;
    email: string;
    photoUrl: string;
    specialization: string;
    availability: string;
    rating? : number
  }
  
  const staffMembers: StaffMember[] = [
    {
      id: 1,
      fullName: "Nikita Jain",
      email: "emma.thompson@example.com",
      photoUrl: "https://media.istockphoto.com/id/1783230082/photo/portrait-of-young-female-hairdresser-in-salon.jpg?s=612x612&w=0&k=20&c=cIbwrspB8bY1vyJ3Mng2mPtdykekPJqLIMkdBWvwEVw=",
      specialization: "Hair Stylist",
      availability: "Mon-Fri, 9AM-5PM",
      
    },
    {
      id: 2,
      fullName: "Liam Chen",
      email: "liam.chen@example.com",
      photoUrl: "https://media.istockphoto.com/id/1813538470/photo/asian-hairstylist-applying-dye-and-coloring-hair-of-male-client-in-beauty-salon.jpg?s=612x612&w=0&k=20&c=nXvyQuKrB-NrphhWm9v2lWGKd8erQz5YOdp-JPe70J8=",
      specialization: "Colorist",
      availability: "Tue-Sat, 10AM-6PM"
    },
    {
      id: 3,
      fullName: "Sophia Rodriguez",
      email: "sophia.rodriguez@example.com",
      photoUrl: "https://media.istockphoto.com/id/1029003064/photo/friendly-nail-technician-applying-a-product-on-customers-hands.jpg?s=612x612&w=0&k=20&c=gLh652qKYRXoeoj81jSmtcyg_AipvHjF5xuaz1fbm5A=",
      specialization: "Nail Technician",
      availability: "Wed-Sun, 11AM-7PM"
    },
    {
      id: 4,
      fullName: "Noah Patel",
      email: "noah.patel@example.com",
      photoUrl: "https://media.istockphoto.com/id/1245229656/photo/hairdresser-stands-in-a-hairdressing-studio.jpg?s=612x612&w=0&k=20&c=l3U90beypNBKpkHIq-2FFPjDvF__8vNlZLZsvw0znp8=",
      specialization: "Barber",
      availability: "Mon-Thu, 8AM-4PM",
    
    },
    {
      id: 5,
      fullName: "Olivia Kim",
      email: "olivia.kim@example.com",
      photoUrl: "https://media.istockphoto.com/id/1471012291/photo/makeup-vlogger-streaming-at-her-studio.jpg?s=612x612&w=0&k=20&c=7wDf0SvHQl3_xpAz57x6ffkFqpp4B-asxYdfuSceIKQ=",
      specialization: "Makeup Artist",
      availability: "Fri-Tue, 12PM-8PM"
    },
    {
      id: 6,
      fullName: "Ethan Johnson",
      email: "ethan.johnson@example.com",
      photoUrl: "https://media.istockphoto.com/id/1138186021/photo/young-massage-therapist-massaging-a-woman.jpg?s=612x612&w=0&k=20&c=F1fenaIF6lzXGdzHC_PKjmM75uAhTlw3XTz_SoIWFNw=",
      specialization: "Massage Therapist",
      availability: "Thu-Mon, 9AM-5PM"
    }
  ];


  
  const SalonStaff: React.FC = () => {
    const [staffList] = useState<StaffMember[]>(staffMembers);
  
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-700 to-red-600 px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="mb-12 text-center text-5xl font-extrabold text-white drop-shadow-lg">
          Meet Our Talented Staff
        </h1>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {staffList.map((staff) => (
            <div
              key={staff.id}
              className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="absolute -right-16 -top-16 h-40 w-40 bg-purple-500 opacity-10 rounded-full transition-all duration-300 group-hover:scale-150"></div>
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
                <p className="mb-4 text-xl font-semibold text-purple-600">{staff.specialization}</p>
                <div className="my-4 flex items-center text-gray-600">
                  <FaEnvelope className="mr-2" />
                  <span>{staff.email}</span>
                </div>
                <div className="mb-6 flex items-center text-gray-600">
                  <FaClock className="mr-2" />
                  <span>{staff.availability}</span>
                </div>
                <button
                  className="w-full rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 text-center text-lg font-semibold text-white transition-all duration-300 hover:from-purple-700 hover:to-pink-700 hover:shadow-lg"
                  onClick={() => {/* Add functionality to book or contact staff */}}
                >
                  Book Appointment
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default SalonStaff;