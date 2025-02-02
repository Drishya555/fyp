import { useState } from "react";
import a from "../assets/heroimg.png";
import b from "../assets/hospital.jpg";
import c from "../assets/heroo.jpg";
import d from "../assets/register.jpg";
import e from "../assets/heroo.jpg";

const initialProducts = [
  { img: a, name: "Mediciti Hospital", category: "Bhaisepati, Lalitpur", discount: "20% off on all services" },
  { img: b, name: "Hams Hospital", category: "Dhumbarahi, Kathmandu" },
  { img: c, name: "Norvic Hospital", category: "Lalitpur", discount: "20% off on all services" },
  { img: d, name: "Mediaid Hospital", category: "IDK", discount: "20% off on all services" },
  { img: e, name: "IDK hospital", category: "IDRK" },
];

const Shop = () => {
  const [products, setProducts] = useState(initialProducts);
  const [sortOrder, setSortOrder] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSort = (order) => {
    let sortedProducts = [...products];
    if (order === "asc") {
      sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (order === "desc") {
      sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
    }
    setProducts(sortedProducts);
    setSortOrder(order);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-[90%] mx-auto mt-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">All Hospitals</h2>
        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search hospitals..."
            className="border border-gray-300 px-4 py-2 rounded-md shadow-md text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 transition w-60"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {/* Sort Dropdown */}
          <div className="relative">
            <select
              className="border border-gray-300 px-4 py-2 rounded-md bg-white shadow-md text-gray-700 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 transition cursor-pointer"
              value={sortOrder}
              onChange={(e) => handleSort(e.target.value)}
            >
              <option value="">Sort By</option>
              <option value="asc">Name: A to Z</option>
              <option value="desc">Name: Z to A</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product, index) => (
          <div
            key={index}
            className="w-full shadow-sm rounded-lg overflow-hidden hover:scale-101 hover:cursor-pointer transition-transform duration-300"
          >
            {/* Image */}
            <div className="w-full h-[600px] sm:h-[450px]">
              <img
                src={product.img}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Details */}
            <div className="p-4">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-500">{product.category}</p>
              {product.discount && (
                <p className="text-green-600 font-semibold">{product.discount}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
