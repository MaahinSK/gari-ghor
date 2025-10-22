import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function ToyCard({ toy }){
  const navigate = useNavigate()

  const viewMore = () => {
    navigate(`/toy/${toy.toyId}`)
  }

  return (
    <div className="bg-white rounded shadow p-4">
      <img src={toy.pictureURL} alt={toy.toyName} className="w-full h-40 object-contain" />
      <h3 className="font-semibold mt-2">{toy.toyName}</h3>
      <div className="text-sm">Rating: {toy.rating} | Qty: {toy.availableQuantity}</div>
      <div className="text-lg font-bold mt-2">${toy.price}</div>
      <button onClick={viewMore} className="btn mt-3">View More</button>
    </div>
  )
}
