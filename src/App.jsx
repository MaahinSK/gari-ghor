import { Routes, Route } from 'react-router'
import Home from './pages/Home' 



export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="seller-details" element={<ProtectedRoute><SellerDetails /></ProtectedRoute>} />
        <Route path="toy/:id" element={<ProtectedRoute><ToyDetails /></ProtectedRoute>} />
        <Route path="profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
      </Route>

      <Route path="*" element={<ErrorPage />} />
    </Routes>
  )
}