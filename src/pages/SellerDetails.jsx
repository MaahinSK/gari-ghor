import React from "react";

const SellerDetails = () => (
  <div className="max-w-2xl mx-auto px-4 py-10 text-center">
    <h1 className="text-3xl font-bold mb-4">Seller Information</h1>
    <p className="text-gray-700 mb-3">
      Name: <span className="font-semibold">John Doe</span>
    </p>
    <p className="text-gray-700 mb-3">Email: johndoe@example.com</p>
    <p className="text-gray-700 mb-3">Location: California, USA</p>
    <p className="text-gray-600">
      John is a verified seller specializing in collectible and electric toy cars.
    </p>
  </div>
);

export default SellerDetails;
