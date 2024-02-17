import ResponseImg from "./responseImg";
import React, { useEffect, useState } from 'react';

const Mainpromt = () => {
  const [userName, setUserName] = useState('');
  const [userPromt, setUserPromt] = useState('');

  useEffect(() => {
    // Retrieve user name from session storage
    const storedUserName = sessionStorage.getItem('userName');
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  useEffect(() => {
    // Retrieve user name from session storage
    const storedUserPromt = sessionStorage.getItem('userPromt');
    if (storedUserPromt) {
      setUserPromt(storedUserPromt);
    }
  }, []);

  return (
    <>
      <header>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="text-center sm:text-left">
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Welcome {userName}!
              </h1>

              <p className="mt-1.5 text-sm text-gray-500">
                Let's make a new travel Plan! 🎉
              </p>
            </div>

            <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
              <button
                className="block rounded-lg bg-indigo-600 px-3 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring"
                type="button"
              >
                New travel plan +
              </button>
            </div>
          </div>
        </div>
      </header>
      <div className="border rounded-md bg-stone-500">{userPromt}</div>
      <ResponseImg/>
    </>
  );
}


export default Mainpromt;
