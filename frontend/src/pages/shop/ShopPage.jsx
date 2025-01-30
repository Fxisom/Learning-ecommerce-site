import { useContext, useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { AppContent } from "../../context/AppContext";
import ShopFiltering from "./ShopFiltering";

const filters = {
  categories: ["all", "men", "women", "kids"],
  priceRanges: [
    { label: "Under $50", min: 0, max: 50 },
    { label: "$50 - $100", min: 50, max: 100 },
    { label: "$100 - $200", min: 100, max: 200 },
    { label: "$200 & above", min: 200, max: Infinity },
  ],
};

const ShopPage = () => {
  const { products, getProductsData } = useContext(AppContent); 
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [filtersState, setFiltersState] = useState({
    category: "all",
    priceRange: "",
  });

  useEffect(() => {
    getProductsData(); // Fetch products when component mounts
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filtersState, products]); // Apply filters whenever filters change or new products are fetched

  const applyFilters = () => {
    let filtered = products;
  
    // Filter by category if it's not "all"
    if (filtersState.category !== "all") {
      filtered = filtered.filter(
        (product) => product.category.trim().toLowerCase() === filtersState.category.trim().toLowerCase()
      );
    }
  
    // Filter by price range
    if (filtersState.priceRange) {
      const [minPrice, maxPrice] = filtersState.priceRange
        .split("-")
        .map(Number);
      filtered = filtered.filter(
        (product) =>
          product.price >= (minPrice || 0) &&
          product.price <= (maxPrice || Infinity)
      );
    }
  
    setFilteredProducts(filtered);
  };
  

  const clearFilters = () => {
    setFiltersState({ category: "all", priceRange: "" });
  };

  return (
    <>
      <section className="bg-blue-200 py-16 px-4 text-center mt-8 w-11/12 mx-auto rounded-lg">
        <h2 className="text-4xl font-bold text-white mb-6">Shop Page</h2>
        <p className="text-lg text-white max-w-2xl mx-auto">
          Dress the Way You Feel – Bold, Confident, and Ready for Anything.
        </p>
      </section>

      <div className="flex flex-col md:flex-row justify-between w-full mt-8">
        <div className="w-full md:w-1/4 mb-8 md:mb-0">
          <ShopFiltering
            filters={filters}
            filtersState={filtersState}
            setFiltersState={setFiltersState}
            clearFilters={clearFilters}
          />
        </div>

        <div className="w-full md:w-3/4">
          <ProductCard products={filteredProducts} />
        </div>
      </div>
    </>
  );
};

export default ShopPage;








