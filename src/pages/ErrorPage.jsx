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
              src="data:image/jpeg;base64,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"
              alt=""
              className="mx-auto h-64 object-contain"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ErrorPage;