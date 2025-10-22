import React, { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const Profile = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="max-w-md mx-auto px-4 py-10 text-center">
      <img
        src={user?.photoURL || "https://i.ibb.co/MBtjqXQ/no-image.png"}
        alt="User"
        className="w-32 h-32 mx-auto rounded-full border-4 border-blue-500 mb-4"
      />
      <h2 className="text-2xl font-semibold mb-2">{user?.displayName || "Anonymous"}</h2>
      <p className="text-gray-600">{user?.email}</p>
      <p className="mt-4 text-gray-500 text-sm">Member since: 2025</p>
    </div>
  );
};

export default Profile;
