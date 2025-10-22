import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router";

const ToyDetails = () => {
  const { id } = useParams();
  const [toy, setToy] = useState(null);

  useEffect(() => {
    fetch("/toys.json")
      .then((res) => res.json())
      .then((data) => setToy(data.find((t) => t.id === parseInt(id))))
      .catch((err) => console.error(err));
  }, [id]);

  if (!toy)
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <p>Loading...</p>
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
        <img src={toy.image} alt={toy.name} className="w-full h-80 object-cover" />
        <div className="p-6 space-y-3">
          <h2 className="text-3xl font-bold">{toy.name}</h2>
          <p className="text-gray-500">{toy.description}</p>
          <p className="font-semibold">Category: {toy.category}</p>
          <p className="text-blue-600 text-lg font-bold">Price: ${toy.price}</p>
          <Link
            to="/seller-details"
            className="mt-4 inline-block bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
          >
            View Seller Info
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ToyDetails;
