import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getData } from "../context/DataContext";
import Loading from "../assets/src_assets_loading4.webm";
import { ChevronLeft } from "lucide-react";
import ProductListView from "../components/ProductListView";

const CategoryProduct = () => {
  const [searchData, setSearchData] = useState([]);
  const { data } = getData();
  const { category } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const filteredData =
      category === "All"
        ? data
        : data.filter((item) => item.category === category);
    setSearchData(filteredData);
    console.log(filteredData);
  }, [category, data]); // ✅ run only when category or data changes

  return (
    <div>
      {searchData.length > 0 ? (
        <div className="max-w-6xl mx-auto mt-10 mb-10 px-4">
          <button
            onClick={() => navigate("/")}
            className="bg-gray-800 mb-5 text-white px-3 py-1 rounded-md cursor-pointer flex gap-1 items-center"
          >
            <ChevronLeft /> Back
          </button>
          {searchData.map((product, index) => (
            <ProductListView key={index} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-[400px]">
          <video muted autoPlay loop>
            <source src={Loading} type="video/webm" />
          </video>
        </div>
      )}
    </div>
  );
};

export default CategoryProduct;
