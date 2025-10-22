import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../providers/AuthProvider'
import { Helmet } from 'react-helmet-async'
import { FaUserCircle } from 'react-icons/fa'

export default function Navbar() {
  const { user, logout, loading } = useAuth()
  const navigate = useNavigate()

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Helmet>
          <title>Toy Car Store</title>
        </Helmet>
        <Link to="/" className="text-xl font-bold">ToyCar<span className="text-indigo-600">Shop</span></Link>
        <nav className="flex items-center gap-4">
          <NavLink to="/" end className={({isActive})=>isActive? 'text-indigo-600 font-semibold':'hover:text-indigo-600'}>Home</NavLink>
          <NavLink to="/profile" className={({isActive})=>isActive? 'text-indigo-600 font-semibold':'hover:text-indigo-600'}>My Profile</NavLink>
          {loading ? (
            <div>Loading...</div>
          ) : user ? (
            <div className="flex items-center gap-3">
              <div title={user.displayName} className="w-9 h-9 rounded-full overflow-hidden">
                {user.photoURL ? <img src={user.photoURL} alt="user" /> : <FaUserCircle size={36} />}
              </div>
              <button onClick={() => { logout(); navigate('/') }} className="btn">Logout</button>
            </div>
          ) : (
            <Link to="/login" className="btn">Login</Link>
          )}
        </nav>
      </div>
    </header>
  )
}
