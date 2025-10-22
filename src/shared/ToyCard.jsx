import React from "react";
import { useNavigate } from "react-router";

const ToyCard = ({ toy }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition-all">
      <img
        src={toy.image}
        alt={toy.name}
        className="h-48 w-full object-cover cursor-pointer"
        onClick={() => navigate(`/toy/${toy.id}`)}
      />
      <div className="p-4 text-center">
        <h3 className="text-xl font-semibold">{toy.name}</h3>
        <p className="text-gray-500">Price: ${toy.price}</p>
        <button
          onClick={() => navigate(`/toy/${toy.id}`)}
          className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default ToyCard;
