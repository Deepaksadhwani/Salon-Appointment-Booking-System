import React, { useRef, useState, FormEvent } from "react";
import {
  PlusCircle,
  X,
  Camera,
  Mail,
  User,
  Briefcase,
  Calendar
} from "lucide-react";
import axios from "axios";
import { HEADERDATA, SERVER_URL } from "@/utils/constants";
import toast from "react-hot-toast";

interface StaffMember {
  fullName: string;
  email: string;
  photoUrl: string;
  specialization: string;
  availability: string;
}

const AddSalonStaff: React.FC = () => {
  const fullNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const specializationRef = useRef<HTMLInputElement>(null);
  const availabilityRef = useRef<HTMLInputElement>(null);
  const photoUrlRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const newStaff: StaffMember = {
      fullName: fullNameRef.current?.value || "",
      email: emailRef.current?.value || "",
      specialization: specializationRef.current?.value || "",
      availability: availabilityRef.current?.value || "",
      photoUrl: photoUrlRef.current?.value || "",
    };
    try {
      const response = await axios.post(
        `${SERVER_URL}/staff/add-staff`,
        newStaff,
        HEADERDATA
      );
      toast.success("Staff member has been successfully added. 🎉")
      console.log(response);
      if (fullNameRef.current) fullNameRef.current.value = "";
      if (emailRef.current) emailRef.current.value = "";
      if (specializationRef.current) specializationRef.current.value = "";
      if (availabilityRef.current) availabilityRef.current.value = "";
      if (photoUrlRef.current) photoUrlRef.current.value = "";
      setPreviewImage("");
    } catch (error) {
      console.log(error);
      toast.error("Failed to add staff member. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImagePreview = () => {
    setPreviewImage(photoUrlRef.current?.value || "");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md transform overflow-hidden rounded-3xl bg-white bg-opacity-90 shadow-2xl backdrop-blur-lg backdrop-filter transition-all duration-300 hover:scale-105 md:max-w-2xl">
        <div className="md:flex">
          <div className="w-full p-8">
            <div className="mb-1 text-sm font-extrabold uppercase tracking-wide text-pink-600">
              Add New Staff Member
            </div>
            <h2 className="mt-1 block text-2xl font-extrabold leading-tight text-gray-900">
              Expand Your Salon Team
            </h2>
            <form onSubmit={handleSubmit} className="mt-6 space-y-6">
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  ref={fullNameRef}
                  type="text"
                  name="fullName"
                  id="fullName"
                  required
                  className="w-full border-b-2 border-gray-300 py-2 pl-10 pr-3 text-gray-900 transition-colors duration-300 focus:border-pink-500 focus:outline-none"
                  placeholder="Full Name"
                />
              </div>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  ref={emailRef}
                  type="email"
                  name="email"
                  id="email"
                  required
                  className="w-full border-b-2 border-gray-300 py-2 pl-10 pr-3 text-gray-900 transition-colors duration-300 focus:border-pink-500 focus:outline-none"
                  placeholder="Email Address"
                />
              </div>
              <div className="relative">
                <Briefcase className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  ref={specializationRef}
                  type="text"
                  name="specialization"
                  id="specialization"
                  required
                  className="w-full border-b-2 border-gray-300 py-2 pl-10 pr-3 text-gray-900 transition-colors duration-300 focus:border-pink-500 focus:outline-none"
                  placeholder="Specialization"
                />
              </div>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  ref={availabilityRef}
                  type="text"
                  name="availability"
                  id="availability"
                  required
                  className="w-full border-b-2 border-gray-300 py-2 pl-10 pr-3 text-gray-900 transition-colors duration-300 focus:border-pink-500 focus:outline-none"
                  placeholder="Availability (e.g., Mon-Fri, 9AM-5PM)"
                />
              </div>
              <div className="relative">
                <Camera className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  ref={photoUrlRef}
                  type="url"
                  name="photoUrl"
                  id="photoUrl"
                  className="w-full border-b-2 border-gray-300 py-2 pl-10 pr-20 text-gray-900 transition-colors duration-300 focus:border-pink-500 focus:outline-none"
                  placeholder="Photo URL"
                />
                <button
                  type="button"
                  onClick={handleImagePreview}
                  className="absolute right-2 top-2 rounded-full bg-pink-500 px-3 py-1 text-xs font-bold uppercase text-white transition-colors duration-300 hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
                >
                  Preview
                </button>
              </div>
              {previewImage && (
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src={previewImage}
                    alt="Staff preview"
                    className="h-48 w-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setPreviewImage("")}
                    className="absolute right-2 top-2 rounded-full bg-white p-1 shadow-md transition-colors duration-300 hover:bg-gray-100"
                  >
                    <X className="h-4 w-4 text-gray-500" />
                  </button>
                </div>
              )}
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`flex w-full items-center justify-center rounded-full border border-transparent bg-gradient-to-r from-pink-500 to-red-500 px-4 py-3 text-sm font-bold text-white shadow-sm transition-all duration-300 hover:from-pink-600 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 ${isSubmitting ? "cursor-not-allowed opacity-75" : ""}`}
                >
                  {isSubmitting ? (
                    <svg
                      className="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : (
                    <PlusCircle className="mr-2 h-5 w-5" />
                  )}
                  {isSubmitting ? "Adding Staff..." : "Add Staff Member"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSalonStaff;