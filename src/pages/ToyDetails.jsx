import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import { FaStar, FaShoppingBag } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';

const ToyDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [toy, setToy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });

  useEffect(() => {
    fetch('/toys.json')
      .then(res => res.json())
      .then(data => {
        const foundToy = data.find(t => t.toyId === parseInt(id));
        setToy(foundToy);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching toy:', error);
        setLoading(false);
      });
  }, [id]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Toy trial request submitted successfully! We will contact you soon.');
    setFormData({ name: '', email: '' });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!toy) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">Toy not found</h2>
          <p className="text-gray-600">The toy you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{toy.toyName} - ToyCars</title>
      </Helmet>

      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Toy Image and Details */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <img 
                src={toy.pictureURL} 
                alt={toy.toyName}
                className="w-full h-96 object-contain mb-6"
              />
              
              <h1 className="text-3xl font-bold mb-4">{toy.toyName}</h1>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-600">Seller</p>
                  <p className="font-semibold">{toy.sellerName}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-600">Price</p>
                  <p className="text-2xl font-bold text-blue-600">${toy.price}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-600">Rating</p>
                  <div className="flex items-center">
                    <FaStar className="text-yellow-400 mr-1" />
                    <span className="font-semibold">{toy.rating}</span>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-600">Available Quantity</p>
                  <p className="font-semibold">{toy.availableQuantity}</p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Description</h3>
                <p className="text-gray-700">{toy.description}</p>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Seller Information</h4>
                <p>Name: {toy.sellerName}</p>
                <p>Email: {toy.sellerEmail}</p>
                <p>Category: {toy.subCategory}</p>
              </div>
            </div>

            {/* Try Now Form */}
            <div className="bg-white rounded-lg shadow-md p-6 h-fit sticky top-24">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <FaShoppingBag className="mr-2" />
                Try This Toy Now
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your email"
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors font-semibold"
                >
                  Try Now
                </button>
              </form>

              <div className="mt-6 p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">Why Try Our Toys?</h4>
                <ul className="text-green-700 text-sm space-y-1">
                  <li>• Premium quality materials</li>
                  <li>• Safe for all ages</li>
                  <li>• Free shipping on trials</li>
                  <li>• 30-day satisfaction guarantee</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ToyDetails;