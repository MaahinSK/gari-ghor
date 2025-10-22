import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import ToyCard from "../shared/ToyCard";

const Home = () => {
  const [toys, setToys] = useState([]);
  const [category, setCategory] = useState("All");

  useEffect(() => {
    fetch("/toys.json")
      .then((res) => res.json())
      .then((data) => setToys(data))
      .catch((err) => console.error("Failed to fetch toys:", err));
  }, []);

  const categories = ["All", "Sports", "Classic", "Electric"];

  const filteredToys =
    category === "All" ? toys : toys.filter((toy) => toy.category === category);

  return (
    <div>
      <section className="max-w-7xl mx-auto px-4 py-10">
        <Swiper spaceBetween={50} slidesPerView={1} autoplay={{ delay: 3000 }}>
          <SwiperSlide>
            <img
              src="https://i.ibb.co/mS7cYWD/banner1.jpg"
              className="rounded-2xl shadow-lg w-full h-[400px] object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://i.ibb.co/m9ftjBs/banner2.jpg"
              className="rounded-2xl shadow-lg w-full h-[400px] object-cover"
            />
          </SwiperSlide>
        </Swiper>

        <div className="mt-10 text-center">
          <h2 className="text-3xl font-bold mb-6">Browse Toy Cars</h2>
          <div className="flex justify-center gap-4 mb-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-full border ${
                  category === cat
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 hover:bg-blue-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredToys.map((toy) => (
              <ToyCard key={toy.id} toy={toy} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
