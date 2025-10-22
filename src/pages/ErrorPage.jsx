import React from "react";
import { Link } from "react-router";
import { Helmet } from "react-helmet-async";

const ErrorPage = () => (
  <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
    <Helmet>
      <title>404 | Page Not Found</title>
    </Helmet>
    <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
    <p className="text-gray-600 mb-6">Sorry, the page you are looking for doesn’t exist.</p>
    <Link
      to="/"
      className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
    >
      Back to Home
    </Link>
  </div>
);

export default ErrorPage;
