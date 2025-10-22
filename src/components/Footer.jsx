import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => (
  <footer className="bg-gray-900 text-gray-300 py-6 mt-10">
    <div className="max-w-7xl mx-auto text-center">
      <p className="text-lg font-semibold mb-3">ToyCarHub © 2025</p>
      <div className="flex justify-center gap-6 mb-3 text-2xl">
        <FaFacebook className="hover:text-blue-500 cursor-pointer" />
        <FaTwitter className="hover:text-sky-400 cursor-pointer" />
        <FaInstagram className="hover:text-pink-500 cursor-pointer" />
      </div>
      <div className="text-sm space-x-3">
        <a href="#" className="hover:underline">Terms</a>
        <a href="#" className="hover:underline">Privacy</a>
        <a href="#" className="hover:underline">Support</a>
      </div>
    </div>
  </footer>
);

export default Footer;
