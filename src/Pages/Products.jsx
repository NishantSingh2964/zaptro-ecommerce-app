import React, { useEffect, useState } from 'react';
import { getData } from '../context/DataContext';
import FilterSection from '../components/FilterSection';
import Loading from '../assets/src_assets_Loading4.webm';
import ProductCard from '../components/ProductCard';
import Pagination from '../components/Pagination';
import Lottie from 'lottie-react';
import notFound from '../assets/notfound.json';
import MobileFilter from '../components/MobileFilter';

const Products = () => {
  const { data } = getData();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [page, setPage] = useState(1);
  const [openFilter, setOpenFilter] = useState(false); // toggle for mobile

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setPage(1);
  };

  const handleBrandChange = (e) => {
    setBrand(e.target.value);
    setPage(1);
  };

  const pageHandler = (selectedPage) => {
    setPage(selectedPage);
  };

  const filteredData = data?.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) &&
      (category === "All" || item.category === category) &&
      (brand === "All" || item.brand === brand) &&
      item.price >= priceRange[0] &&
      item.price <= priceRange[1]
  );

  const dynamicPage = Math.ceil(filteredData?.length / 8);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="px-2 sm:px-4">
      <div className="max-w-7xl mx-auto mb-10">
        {data?.length > 0 ? (
          <div className="flex flex-col md:flex-row gap-6 md:gap-8">
            {/* Sidebar for md+ */}
            <div className="hidden md:block w-1/4">
              <FilterSection
                search={search}
                setSearch={setSearch}
                brand={brand}
                setBrand={setBrand}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                category={category}
                setCategoty={setCategory}
                handleCategoryChange={handleCategoryChange}
                handleBrandChange={handleBrandChange}
              />
            </div>

            <div className="flex-1">
              {/* Mobile dropdown filter */}
              <MobileFilter
                openFilter={openFilter}
                setOpenFilter={setOpenFilter}
                search={search}
                setSearch={setSearch}
                brand={brand}
                setBrand={setBrand}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                category={category}
                setCategory={setCategory}
                handleBrandChange={handleBrandChange}
                handleCategoryChange={handleCategoryChange}
              />

              {/* Product Grid */}
              {filteredData?.length > 0 ? (
                <div className="flex flex-col items-center justify-center w-full">
                  <div className="grid grid-cols-2  md:grid-cols-4 gap-6 mt-6 w-full">
                    {filteredData
                      ?.slice(page * 8 - 8, page * 8)
                      .map((product, index) => (
                        <ProductCard key={index} product={product} />
                      ))}
                  </div>
                  <div className="mt-6">
                    <Pagination
                      pageHandler={pageHandler}
                      page={page}
                      dynamicPage={dynamicPage}
                    />
                  </div>
                </div>
              ) : (
                <div className="flex justify-center items-center w-full mt-10">
                  <Lottie
                    animationData={notFound}
                    className="w-[250px] sm:w-[400px] md:w-[500px]"
                  />
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-[400px]">
            <video muted autoPlay loop>
              <source src={Loading} type="video/webm" />
            </video>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
