'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from "next/navigation";

const GetStarted: React.FC = () => {
  const router = useRouter();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');


  const handleSubmit = async () => {
    if (firstName === '' || lastName === '' || phone === '' || password === '') {
        return;
    }
    
    try {
        const res = await fetch("api/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            phone: phone,
            password: password,
        }),
        });

        if (res.ok) {
          router.push("/login");
          console.log(res)
        } else {
          console.log("User registration failed.");
        }
    } catch (error) {
        console.log("Error during registration: ", error);
    }
    };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-transparent border-transparent rounded-3xl p-8 sm:p-10 lg:p-12">
        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
          {/* <Image src={logo} alt="Your Company Logo" className="mx-auto h-8 w-auto" /> */}
          <h2 className="mt-5 text-lg font-RalewayRegular leading-9 text-black">
            Get started with your account
          </h2>
        </div>

        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-md">
          <form className="space-y-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-RalewayRegular leading-6 text-black">
                First Name
              </label>
              <div className="mt-2">
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  autoComplete="given-name"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="p-2 bg-transparent font-RalewayMedium block w-full rounded-2xl border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-black placeholder:text-light-gray sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-RalewayRegular leading-6 text-black">
                Last Name
              </label>
              <div className="mt-2">
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  autoComplete="family-name"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="p-2 bg-transparent font-RalewayMedium block w-full rounded-2xl border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-black placeholder:text-light-gray sm:text-sm sm:leading-6"
                />
              </div>
            </div>

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
              <label htmlFor="password" className="block text-sm font-RalewayRegular leading-6 text-black">
                Password
              </label>
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
              <a
                onClick={handleSubmit}
                className="flex w-full justify-center rounded-2xl bg-black px-3 py-1.5 text-sm font-RalewayMedium leading-6 text-white shadow-sm hover:bg-hover-blue focus-visible:outline hover:cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign up
              </a>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-black font-RalewayMedium">
            Already have an account?{' '}
            <a href="/login" className="font-RalewayBold leading-6 text-black hover:text-hover-blue hover:cursor-pointer">
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
