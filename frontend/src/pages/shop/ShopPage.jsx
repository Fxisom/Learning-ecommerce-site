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
  const [sortType, setSortType] = useState("relevant");
  const [filtersState, setFiltersState] = useState({
    category: "all",
    priceRange: "",
  });

  useEffect(() => {
    getProductsData(); // Fetch products when component mounts
  }, []);

  useEffect(() => {
    applyFiltersAndSort();
  }, [filtersState, products, sortType]); // Apply filters and sorting whenever filters or sorting change

  const applyFiltersAndSort = () => {
    let filtered = products;

    // Apply category filter
    if (filtersState.category !== "all") {
      filtered = filtered.filter(
        (product) =>
          product.category.trim().toLowerCase() ===
          filtersState.category.trim().toLowerCase()
      );
    }

    // Apply price range filter
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

    // Apply sorting
    switch (sortType) {
      case "low-high":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "high-low":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "a-z":
        filtered.sort((a, b) => a.name.localeCompare(b.name)); // Adjust this to the correct property
        break;
      case "z-a":
        filtered.sort((a, b) => b.name.localeCompare(a.name)); // Adjust this to the correct property
        break;
      default:
        break;
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

      <div className="flex flex-col md:flex-row justify-between mt-8 mx-20">
        <div className="md:w-1/10 mb-8 md:mb-0">
          <ShopFiltering
            filters={filters}
            filtersState={filtersState}
            setFiltersState={setFiltersState}
            clearFilters={clearFilters}
          />
        </div>

        <div className="md:w-11/12">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl ml-9">ALL COLLECTIONS ------</h2>
            <select
              onChange={(e) => setSortType(e.target.value)}
              className="border-2 border-gray-300 text-sm px-2"
            >
              <option value="relevant">Sort by: Relevant</option>
              <option value="a-z">Sort by: A-Z</option>
              <option value="z-a">Sort by: Z-A</option>
              <option value="low-high">Sort by: Low to High</option>
              <option value="high-low">Sort by: High to Low</option>
            </select>
          </div>
          <ProductCard products={filteredProducts} />
        </div>
      </div>
    </>
  );
};

export default ShopPage;











