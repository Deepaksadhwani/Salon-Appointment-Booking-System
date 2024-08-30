import { useEffect, useRef, useState } from "react";
import combAnimation from "@/assets/combing.json";
import scissorAnimation from "@/assets/scissor.json";
import { authValidationSchema } from "@/utils/zodSchemas";
import axios from "axios";
import { SERVER_URL } from "@/utils/constants";
import Lottie from "lottie-react";
import { z } from "zod";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/appStore";
import { useNavigate } from "react-router-dom";
import { addToken } from "@/store/slices/userSlice";
import Loader from "@/components/Loader";

const Authentication = () => {
  type FormInputTypes = z.infer<typeof authValidationSchema>;
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const name = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const [isSign, setIsSign] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const toggleSignInForm = () => {
    setIsSign((prev) => !prev);
  };

  const authHandler = async (endPoint: string) => {
    setError("");
    setIsLoading(true);
    const data: FormInputTypes = {
      fullName: name.current?.value || "",
      email: email.current?.value || "",
      password: password.current?.value || "",
    };
    console.log(data);
    const parsed = authValidationSchema.safeParse(data);
    if (!parsed.success) {
      return setError("Password must contain at least 8 words.");
    }
    try {
      const response = await axios.post(
        `${SERVER_URL}${endPoint}`,
        parsed.data,
      );
      const token = response.headers["authorization"]?.split(" ")[1];
      localStorage.setItem("token", token);
      localStorage.setItem("email", response.data.data.email)
      localStorage.setItem("userData", JSON.stringify(response.data.data));
      navigate("/");
      console.log(response);
    } catch (error: any) {
      console.log(error.response);
      setError(error.response.data.Message);
    } finally {
      setIsLoading(false);
    }
  };

  const validateHandler = async () => {
    if (!isSign) {
      authHandler("/user/sign-up");
    } else {
      authHandler("/user/sign-in");
    }
  };

  useEffect(() => {
    const userToken = localStorage.getItem("token");

    if (userToken) {
      dispatch(addToken(userToken));
      navigate("/");
    }
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500);
    return  () => clearTimeout(timer)
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <section className="bg-gradient-to-bl from-gray-400 via-white to-gray-400">
      <div className="fixed right-60 hidden w-60 drop-shadow-lg xl:block">
        <Lottie animationData={combAnimation} />
      </div>
      <div className="fixed bottom-20 left-80 hidden w-60 drop-shadow-lg xl:block">
        <Lottie animationData={scissorAnimation} />
      </div>

      <div className="mx-auto flex min-h-screen flex-col items-center justify-center px-6 py-8 lg:py-0">
        <a
          href="#"
          className="mb-6 flex items-center text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img
            className="mr-2 h-8 w-8"
            src="https://cdn-icons-png.flaticon.com/512/1057/1057470.png"
            alt="logo"
          />
          {isSign ? "Login To Book  Appointment" : " Create an account"}
        </a>
        <div className="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
              {isSign ? "Sign in" : "Sign up"} to your account
            </h1>
            <div className="space-y-4 md:space-y-6">
              <div>
                {!isSign && (
                  <div>
                    <label
                      htmlFor="password"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Name
                    </label>
                    <input
                      ref={name}
                      type="text"
                      name="name"
                      id="text"
                      placeholder="Enter full name"
                      className="focus:ring-primary-600 focus:border-primary-600 mb-4 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      required
                    />
                  </div>
                )}
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  ref={email}
                  type="email"
                  name="email"
                  id="email"
                  className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="example@gmail.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  ref={password}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex h-5 items-center">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 h-4 w-4 rounded border border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-primary-600 dark:text-primary-500 text-sm font-medium hover:underline"
                >
                  Forgot password?
                </a>
              </div>
              <p className="font-medium text-red-800">{error}</p>

              <button
                onClick={validateHandler}
                className="bg-primary-600 hover:bg-primary-700 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 w-full rounded-lg bg-blue-500 px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4"
              >
                {isSign ? "Sign in" : "Sign up"}
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                {isSign
                  ? "Don’t have an account yet?"
                  : "Already have an account?"}
                <button
                  onClick={toggleSignInForm}
                  className="px-1 font-semibold text-blue-500"
                >
                  {isSign ? "Sign up" : "Sign in"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Authentication;
