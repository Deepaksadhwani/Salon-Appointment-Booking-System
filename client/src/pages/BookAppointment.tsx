import React, { useRef } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { HEADERDATA, SERVER_URL } from "@/utils/constants";
import { FaCalendarAlt, FaUserAlt, FaCut, FaClock } from "react-icons/fa";

const BookAppointment = () => {
  const email = localStorage.getItem("email");
  const serviceIdRef = useRef<HTMLSelectElement>(null);
  const staffIdRef = useRef<HTMLSelectElement>(null);
  const dateTimeRef = useRef<HTMLInputElement>(null);

  const checkoutHandler = async (formData: any) => {
    try {
      const {
        data: { orderId, amount, key_id },
      } = await axios.post(
        `${SERVER_URL}/appointment/create-appointment`,
        { amount: 500 },
        HEADERDATA,
      );

      const options = {
        key: key_id,
        amount: amount,
        currency: "INR",
        name: "Sunshine Salon",
        description: "Salon Appointment Booking",
        image: "https://example.com/your_logo",
        order_id: orderId,
        handler: async (response: any) => {
          const data = await axios.post(
            `${SERVER_URL}/appointment/verify-appointment`,
            {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              formData,
              email,
            },
            HEADERDATA,
          );
          console.log(data);
          toast.success("Your appointment has been scheduled successfully! 🎉");
        },
        prefill: {
          name: "Deepak Sadhwani",
          email: "DeepakSadhwani@example.com",
          contact: "9000090000",
        },
        notes: {
          address: "Sunshine Salon, Main Street",
        },
        theme: {
          color: "#FF69B4",
        },
      };

      const Razorpay = (window as any).Razorpay;
      const razor = new Razorpay(options);
      razor.open();
    } catch (error) {
      console.error("Error during checkout:", error);
      toast.error("Oops! Something went wrong. Please try again.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      serviceId: serviceIdRef.current?.value,
      staffId: staffIdRef.current?.value,
      dateTime: dateTimeRef.current?.value,
      status: "Pending",
    };
    checkoutHandler(formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md transform overflow-hidden rounded-2xl bg-white shadow-xl transition-all duration-300 hover:shadow-2xl">
        <div className="px-6 py-8">
          <h2 className="mb-6 text-center text-3xl font-extrabold text-gray-900">
            Book Your Glamour Session
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <FaCut className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <select
                ref={serviceIdRef}
                name="serviceId"
                className="w-full appearance-none rounded-md border border-gray-300 px-3 py-2 pl-10 placeholder-gray-400 shadow-sm focus:border-pink-500 focus:outline-none focus:ring-pink-500"
                defaultValue=""
              >
                <option value="" disabled>
                  Select a Service
                </option>
                <option value="1">Haircut & Styling</option>
                <option value="2">Full Body Massage</option>
                <option value="3">Manicure & Pedicure</option>
                <option value="4">Facial Treatment</option>
                <option value="5">Hair Coloring</option>
                <option value="6">Bridal Makeup & Hair</option>
              </select>
            </div>
            <div className="relative">
              <FaUserAlt className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <select
                ref={staffIdRef}
                name="staffId"
                className="w-full appearance-none rounded-md border border-gray-300 px-3 py-2 pl-10 placeholder-gray-400 shadow-sm focus:border-pink-500 focus:outline-none focus:ring-pink-500"
                defaultValue=""
              >
                <option value="" disabled>
                  Select a Stylist
                </option>
                <option value="1">Nikita Jain</option>
                <option value="2">Liam Chen</option>
                <option value="3">Sophia Rodriguez</option>
                <option value="4">Noah Patel</option>
                <option value="5">Olivia Kim</option>
                <option value="6">Ethan Johnson</option>
              </select>
            </div>
            <div className="relative">
              <FaCalendarAlt className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                ref={dateTimeRef}
                type="datetime-local"
                name="dateTime"
                className="w-full appearance-none rounded-md border border-gray-300 px-3 py-2 pl-10 placeholder-gray-400 shadow-sm focus:border-pink-500 focus:outline-none focus:ring-pink-500"
              />
            </div>
            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-gradient-to-r from-pink-500 to-purple-600 px-4 py-3 text-sm font-medium text-white transition-all duration-300 ease-in-out hover:from-pink-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <FaClock
                    className="h-5 w-5 text-pink-300 group-hover:text-pink-400"
                    aria-hidden="true"
                  />
                </span>
                Book Now
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;
