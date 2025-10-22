import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router';

const ErrorPage = () => {
  return (
    <>
      <Helmet>
        <title>Page Not Found - ToyCars</title>
      </Helmet>

      <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4">
        <div className="text-center">
          <div className="mb-8">
            <h1 className="text-9xl font-bold text-blue-600">404</h1>
            <h2 className="text-3xl font-bold text-gray-900 mt-4">Page Not Found</h2>
            <p className="text-gray-600 mt-2 max-w-md mx-auto">
              Sorry, we couldn't find the page you're looking for. The page might have been moved or doesn't exist.
            </p>
          </div>
          
          <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
            <Link
              to="/"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors font-semibold"
            >
              Go Back Home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="inline-block bg-gray-600 text-white px-6 py-3 rounded-md hover:bg-gray-700 transition-colors font-semibold"
            >
              Go Back
            </button>
          </div>

          <div className="mt-12">
            <img
              src="/api/placeholder/400/300"
              alt="Lost toy car"
              className="mx-auto h-64 object-contain"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ErrorPage;