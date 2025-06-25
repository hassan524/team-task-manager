import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/signup",
        formData,
        { withCredentials: true } // this includes cookie
      );

      setMessage(res.data.message);
    } catch (error: any) {
      if (error.response?.data?.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage("Something went wrong");
      }
    }
  };

  return (
    <section className="h-full w-full flex md:flex-row flex-col items-center justify-center gap-5">
      {/* Left */}
      <div className="h-full w-1/2 md:flex hidden justify-center items-center px-[1rem]">
        <div className="w-[28rem] mt-10">
          <img src="/authImage.png" alt="Auth" className="w-full object-contain" />
        </div>
      </div>

      {/* Right */}
      <div className="h-full md:w-1/2 w-full flex justify-center items-center">
        <div className="auth-form-wrapper flex relative p-[1rem]">
          <div id="auth-form" className="py-[4rem] w-full flex flex-col gap-5 sm:w-96 rounded-2xl p-6 lg:bg-slate-50 relative z-10">
            <h2 className="md:text-3xl text-[3rem] text-center font-bold mb-4">Seconds to sign up!</h2>

            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="px-4 py-2 w-full rounded-2xl border border-gray-300"
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="px-4 py-2 rounded-2xl border border-gray-300"
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="px-4 py-2 rounded-2xl border border-gray-300"
              />

              <button type="submit" className="mt-2 bg-[#6352FB] text-white py-2 rounded-2xl">
                Sign Up
              </button>
            </form>

            {message && (
              <p className="text-sm text-center text-red-500 mt-4">{message}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
