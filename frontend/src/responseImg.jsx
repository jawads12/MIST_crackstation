import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ResponseImg() {
  const [responseData, setResponseData] = useState([]);

  useEffect(() => {
    // Fetch user data from the API using Axios
    axios
      .get("http://localhost:5000/api/users")
      .then((response) => {
        // Set the fetched data to the state
        setResponseData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []); // Empty dependency array to ensure the effect runs only once

  // Function to calculate age group based on date of birth
  const calculateAgeGroup = (dob) => {
    // Calculate age from DOB
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    // Determine age group based on age
    if (age <= 12) {
      return "Teen";
    } else if (age <= 18) {
      return "Youth";
    } else if (age <= 60) {
      return "Adult";
    } else {
      return "Senior";
    }
  };

  return (
    <section>
      {responseData.map((user) => (
        <div key={user._id} className="flex items-start gap-4 lg:px-6 my-3">
          {/* Render user data here */}
          <div>
            <h3 className="text-lg/tight font-medium text-gray-900">
              age group is {calculateAgeGroup(user.dob)} gender is {user.gender}
            </h3>
            <p className="mt-0.5 text-gray-700">{user.password}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
