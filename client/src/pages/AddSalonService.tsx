import React, { useRef, useState, FormEvent } from "react";
import {
  PlusCircle,
  X,
  Camera,
  Clock,
  DollarSign,
  Type,
  AlignLeft,
} from "lucide-react";
import axios from "axios";
import { HEADERDATA, SERVER_URL } from "@/utils/constants";
import toast from "react-hot-toast";

interface SalonService {
  name: string;
  description: string;
  duration: number;
  price: number;
  imageUrl: string;
}

const AddSalonService: React.FC = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const durationRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const imageUrlRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const newService: SalonService = {
      name: nameRef.current?.value || "",
      description: descriptionRef.current?.value || "",
      duration: Number(durationRef.current?.value) || 0,
      price: Number(priceRef.current?.value) || 0,
      imageUrl: imageUrlRef.current?.value || "",
    };
    try {
      const response = await axios.post(
        `${SERVER_URL}/service//add-service`,
        newService,
        HEADERDATA,
      );
      toast.success("Service has been successfully added. 🦋")
      console.log(response);
      if (nameRef.current) nameRef.current.value = "";
      if (descriptionRef.current) descriptionRef.current.value = "";
      if (durationRef.current) durationRef.current.value = "";
      if (priceRef.current) priceRef.current.value = "";
      if (imageUrlRef.current) imageUrlRef.current.value = "";
      setPreviewImage("");
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImagePreview = () => {
    setPreviewImage(imageUrlRef.current?.value || "");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md transform overflow-hidden rounded-3xl bg-white bg-opacity-90 shadow-2xl backdrop-blur-lg backdrop-filter transition-all duration-300 hover:scale-105 md:max-w-2xl">
        <div className="md:flex">
          <div className="w-full p-8">
            <div className="mb-1 text-sm font-extrabold uppercase tracking-wide text-pink-600">
              Add New Service
            </div>
            <h2 className="mt-1 block text-2xl font-extrabold leading-tight text-gray-900">
              Elevate Your Salon Experience
            </h2>
            <form onSubmit={handleSubmit} className="mt-6 space-y-6">
              <div className="relative">
                <Type className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  ref={nameRef}
                  type="text"
                  name="name"
                  id="name"
                  required
                  className="w-full border-b-2 border-gray-300 py-2 pl-10 pr-3 text-gray-900 transition-colors duration-300 focus:border-pink-500 focus:outline-none"
                  placeholder="Service Name"
                />
              </div>
              <div className="relative">
                <AlignLeft className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <textarea
                  ref={descriptionRef}
                  name="description"
                  id="description"
                  rows={3}
                  className="w-full border-b-2 border-gray-300 py-2 pl-10 pr-3 text-gray-900 transition-colors duration-300 focus:border-pink-500 focus:outline-none"
                  placeholder="Describe the service..."
                ></textarea>
              </div>
              <div className="flex space-x-4">
                <div className="relative flex-1">
                  <Clock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    ref={durationRef}
                    type="number"
                    name="duration"
                    id="duration"
                    required
                    className="w-full border-b-2 border-gray-300 py-2 pl-10 pr-3 text-gray-900 transition-colors duration-300 focus:border-pink-500 focus:outline-none"
                    placeholder="Duration (min)"
                  />
                </div>
                <div className="relative flex-1">
                  <DollarSign className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    ref={priceRef}
                    type="number"
                    name="price"
                    id="price"
                    step="0.01"
                    required
                    className="w-full border-b-2 border-gray-300 py-2 pl-10 pr-3 text-gray-900 transition-colors duration-300 focus:border-pink-500 focus:outline-none"
                    placeholder="Price ($)"
                  />
                </div>
              </div>
              <div className="relative">
                <Camera className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  ref={imageUrlRef}
                  type="url"
                  name="imageUrl"
                  id="imageUrl"
                  className="w-full border-b-2 border-gray-300 py-2 pl-10 pr-20 text-gray-900 transition-colors duration-300 focus:border-pink-500 focus:outline-none"
                  placeholder="Image URL"
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
                    alt="Service preview"
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
                  {isSubmitting ? "Adding Service..." : "Add Service"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSalonService;
