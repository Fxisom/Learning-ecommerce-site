import { useState, useContext, useEffect } from "react";
import { AppContent } from "../../context/AppContext";
import ProductCard from "./ProductCard";

const TrendingProduct = () => {
  const { products } = useContext(AppContent); 
  const [selectedCategory, setSelectedCategory] = useState("new arrivals");
  const [animateProducts, setAnimateProducts] = useState(false);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setAnimateProducts(true); 
  };

  const filteredProducts = products.filter((product) => {
    if (selectedCategory === "new arrivals") return product.newarrival;
    if (selectedCategory === "best sellers") return product.bestseller;
    if (selectedCategory === "hot sales") return product.hotsales;
    return true;
  });

  useEffect(() => {
    if (animateProducts) {
      const timeout = setTimeout(() => setAnimateProducts(false), 500);
      return () => clearTimeout(timeout);
    }
  }, [animateProducts]);

  const categoryButtonStyle = (isSelected) => ({
    fontSize: "1.875rem",
    fontWeight: "normal",
    cursor: "pointer",
    color: isSelected ? "#1f2937" : "#6b7280",
    borderBottom: isSelected ? "2px solid #1f2937" : "none",
    paddingBottom: isSelected ? "0.25rem" : "0",
    transition: "all 0.3s ease",
  });

  const productGridStyle = {
    marginTop: "2.25rem",
    opacity: animateProducts ? "0" : "1",
    transform: animateProducts ? "translateX(100px)" : "translateX(0)",
    transition: "opacity 0.5s ease, transform 0.5s ease",
  };

  return (
    <div className="p-4 mt-10">
      <div className="mb-5 flex justify-center space-x-20">
        <h3
          style={categoryButtonStyle(selectedCategory === "new arrivals")}
          onClick={() => handleCategoryChange("new arrivals")}
        >
          New Arrivals
        </h3>
        <h3
          style={categoryButtonStyle(selectedCategory === "best sellers")}
          onClick={() => handleCategoryChange("best sellers")}
        >
          Best Sellers
        </h3>
        <h3
          style={categoryButtonStyle(selectedCategory === "hot sales")}
          onClick={() => handleCategoryChange("hot sales")}
        >
          Hot Sales
        </h3>
      </div>
      <div style={productGridStyle}>
        <ProductCard products={filteredProducts} />
      </div>
    </div>
  );
};

export default TrendingProduct;














