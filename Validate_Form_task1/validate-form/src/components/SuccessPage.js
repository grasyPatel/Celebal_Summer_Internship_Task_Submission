// SuccessPage.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SuccessPage = () => {
  const { state } = useLocation(); // Get form data passed through navigation
  const navigate = useNavigate();

  if (!state) {
    return (
      <div className="p-6">
        <p>No data to display.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Go Back
        </button>
      </div>
    );
  }

  const {
    fName, lName, username, email, phoneCode, phoneNumber,
    country, city, pan, aadhar
  } = state;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 border rounded-lg shadow-lg bg-green-100">
      <h1 className="text-2xl font-bold mb-4 text-green-700">Form Submitted Successfully</h1>
      <div className="space-y-2">
        <p><strong>Full Name:</strong> {fName} {lName}</p>
        <p><strong>Username:</strong> {username}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Phone:</strong> {phoneCode} {phoneNumber}</p>
        <p><strong>Country:</strong> {country}</p>
        <p><strong>City:</strong> {city}</p>
        {pan && <p><strong>PAN:</strong> {pan}</p>}
        {aadhar && <p><strong>Aadhar:</strong> {aadhar}</p>}
      </div>
       <button
          onClick={() => navigate("/")}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Go Back
        </button>
    </div>
  );
};

export default SuccessPage;
