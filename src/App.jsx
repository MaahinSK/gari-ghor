import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import ToyDetails from './pages/ToyDetails';
import MyProfile from './pages/MyProfile';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ErrorPage from './pages/ErrorPage';
import { useAuth } from './hooks/useAuth';
import Loader from './components/Loader';

function App() {
  const { loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  return (
    <HelmetProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Routes>
            {/* Routes with Navbar and Footer */}
            <Route path="/" element={
              <>
                <Navbar />
                <Home />
                <Footer />
              </>
            } />
            <Route path="/login" element={
              <>
                <Navbar />
                <Login />
                <Footer />
              </>
            } />
            <Route path="/register" element={
              <>
                <Navbar />
                <Register />
                <Footer />
              </>
            } />
            <Route path="/forgot-password" element={
              <>
                <Navbar />
                <ForgotPassword />
                <Footer />
              </>
            } />
            <Route path="/toy/:id" element={
              <PrivateRoute>
                <Navbar />
                <ToyDetails />
                <Footer />
              </PrivateRoute>
            } />
            <Route path="/my-profile" element={
              <PrivateRoute>
                <Navbar />
                <MyProfile />
                <Footer />
              </PrivateRoute>
            } />
            
            {/* Error page without Navbar and Footer */}
            <Route path="*" element={<ErrorPage />} />
          </Routes>
          
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;