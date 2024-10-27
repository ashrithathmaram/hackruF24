'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { useDispatch } from "react-redux";
import { authActions } from "../state/reducers/authSlice"

import { useRouter } from "next/navigation";


const SignIn: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async(e: React.ChangeEvent<any>) => {
    e.preventDefault();

    if (!e.target.phone.value || !e.target.password.value) {
      return "All fields are required";
    }
    const loggedInResponse = await fetch("api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        {
        phone: e.target.phone.value,
        password: e.target.password.value,
      }),
    });
    const loggedIn = await loggedInResponse.json();
    console.log(loggedIn);
    if (loggedIn.token) {
      dispatch(
        authActions.setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      e.target.reset();
      router.push("/");
    }
    else{
      console.log(loggedIn.msg);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-transaprent border-transparent rounded-3xl p-8 sm:p-10 lg:p-12">
        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
          {/* <Image src={logo} alt="Your Company Logo" className="mx-auto h-8 w-auto" /> */}
          <h2 className="mt-5 text-lg font-RalewayRegular leading-9 text-black">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-md">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="phone" className="block text-sm font-RalewayRegular leading-6 text-black">
                Phone
              </label>
              <div className="mt-2">
                <input
                  id="phone"
                  name="phone"
                  type="phone"
                  autoComplete="phone"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="p-2 bg-transparent font-RalewayMedium block w-full rounded-2xl border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-black placeholder:text-light-gray sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-RalewayRegular leading-6 text-black">
                  Password
                </label>
                <div className="text-sm">
                  <a className="font-RalewayMedium text-black hover:text-black">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="p-2 bg-transparent block w-full rounded-2xl border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-black placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-2xl bg-black px-3 py-1.5 text-sm font-RalewayMedium leading-6 text-white shadow-sm hover:bg-hover-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-black font-RalewayMedium">
            Don&apos;t have an account?{' '}
            <a href="/signup" className="font-RalewayBold leading-6 black hover:text-hover-blue">
              Get Started
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
