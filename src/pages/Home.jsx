import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useAuth } from '../hooks/useAuth';
import { FaStar, FaEye } from 'react-icons/fa';
import { Link } from 'react-router';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Home = () => {
  const [toys, setToys] = useState([]);
  const [filteredToys, setFilteredToys] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('popular');
  const [sellers, setSellers] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    fetch('/toys.json')
      .then(res => res.json())
      .then(data => {
        setToys(data);
        
        // Get unique subcategories
        const categories = ['popular', 'all', ...new Set(data.map(toy => toy.subCategory))];
        setSubCategories(categories);
        
        // Filter popular toys by default
        setFilteredToys(data.filter(toy => toy.popular));
        
        // Calculate seller data
        const sellerData = data.reduce((acc, toy) => {
          if (!acc[toy.sellerEmail]) {
            acc[toy.sellerEmail] = {
              name: toy.sellerName,
              email: toy.sellerEmail,
              ratings: [],
              toyCount: 0
            };
          }
          acc[toy.sellerEmail].ratings.push(toy.rating);
          acc[toy.sellerEmail].toyCount++;
          return acc;
        }, {});
        
        const sellersWithAvgRating = Object.values(sellerData).map(seller => ({
          ...seller,
          avgRating: (seller.ratings.reduce((a, b) => a + b, 0) / seller.ratings.length).toFixed(1)
        }));
        
        setSellers(sellersWithAvgRating);
      });
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === 'popular') {
      setFilteredToys(toys.filter(toy => toy.popular));
    } else if (category === 'all') {
      setFilteredToys(toys);
    } else {
      setFilteredToys(toys.filter(toy => toy.subCategory === category));
    }
  };

  const topExpensiveToys = [...toys]
    .sort((a, b) => b.price - a.price)
    .slice(0, 3);

  const sliderToys = toys.filter(toy => toy.toyId > toys.length - 4);

  return (
    <>
      <Helmet>
        <title>ToyCars - Premium Toy Car Collection</title>
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Slider */}
        <section className="mb-12">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            loop={true}
            className="h-96"
          >
            {sliderToys.map(toy => (
              <SwiperSlide key={toy.toyId}>
                <div className="relative h-96 bg-linear-to-r from-blue-600 to-purple-600">
                  <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                  <div className="relative z-10 h-full flex items-center justify-center">
                    <div className="text-center text-white">
                      <img 
                        src={toy.pictureURL} 
                        alt={toy.toyName}
                        className="h-60 mx-auto mb-4 object-contain"
                      />
                      <h2 className="text-4xl font-bold mb-2">{toy.toyName}</h2>
                      <p className="text-xl">${toy.price}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Sellers Section - Protected */}
          {user && (
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-center mb-8">Our Sellers</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sellers.map((seller, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-2">{seller.name}</h3>
                    <p className="text-gray-600 mb-2">{seller.email}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <FaStar className="text-yellow-400 mr-1" />
                        <span>{seller.avgRating}</span>
                      </div>
                      <span className="text-sm text-gray-500">{seller.toyCount} toys</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left Sidebar  */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
                <h3 className="text-xl font-semibold mb-4">Categories</h3>
                <ul className="space-y-2">
                  {subCategories.map(category => (
                    <li key={category}>
                      <button
                        onClick={() => handleCategoryChange(category)}
                        className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                          selectedCategory === category
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Main Content  */}
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold mb-6">
                {selectedCategory === 'popular' ? 'Popular Toys' : 
                 selectedCategory === 'all' ? 'All Toys' : 
                 `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Toys`}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredToys.map(toy => (
                  <div key={toy.toyId} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <img 
                      src={toy.pictureURL} 
                      alt={toy.toyName}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-xl font-semibold mb-2">{toy.toyName}</h3>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <FaStar className="text-yellow-400 mr-1" />
                          <span>{toy.rating}</span>
                        </div>
                        <span className="text-gray-600">Qty: {toy.availableQuantity}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-blue-600">${toy.price}</span>
                        <Link
                     to={`/toy/${toy.toyId}`}
                              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center">
                         <FaEye className="mr-2" />
                            View More
                      </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Sidebar  */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
                <h3 className="text-xl font-semibold mb-4">Most Expensive</h3>
                <div className="space-y-4">
                  {topExpensiveToys.map(toy => (
                    <div key={toy.toyId} className="border rounded-lg p-4">
                      <img 
                        src={toy.pictureURL} 
                        alt={toy.toyName}
                        className="w-full h-32 object-contain mb-2"
                      />
                      <h4 className="font-semibold">{toy.toyName}</h4>
                      <p className="text-xl font-bold text-blue-600">${toy.price}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;