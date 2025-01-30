import PropTypes from "prop-types";
import Rating from "../../components/Rating"; 
import { useState } from "react";
import { Link } from "react-router-dom"; 

const ProductCard = ({ products }) => {
  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:max-w-screen-xl">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCardItem key={product._id || product.name} product={product} />
        ))}
      </div>
    </div>
  );
};


const ProductCardItem = ({ product }) => {
  const [rating, setRating] = useState(product.rating || 0);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };


  const productPrice = Array.isArray(product.price) ? product.price[0] : product.price;

  return (
    <div className="overflow-hidden w-full h-full max-w-sm mx-auto relative group">
      <Link to={`/product/${product._id}`} className="block">
        <i className="ri-shopping-bag-line absolute top-2 right-4 text-lg text-black bg-white rounded-full px-2 py-1 shadow-sm cursor-pointer opacity-0 group-hover:opacity-100 transform translate-x-full group-hover:translate-x-0 transition-all duration-300"></i>
        <i className="ri-heart-line absolute top-12 right-4 text-lg text-black bg-white rounded-full px-2 py-1 shadow-sm cursor-pointer opacity-0 group-hover:opacity-100 transform translate-x-full group-hover:translate-x-0 transition-all duration-300"></i>

        <div className="container mx-auto w-[300px] h-[300px] bg-gray-100">
          {product.image && product.image.length > 0 ? (
            <img
              src={product.image[0]} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-300 flex items-center justify-center">
              <span className="text-gray-600">No Image Available</span>
            </div>
          )}
        </div>

        <div className="container mx-auto w-full p-2">
          <h3 className="text-xs font-semibold text-gray-900">{product.name}</h3>
          <Rating rating={rating} onRatingChange={handleRatingChange} />

          <div className="flex justify-between items-center mt-1">
            <p className="text-xs font-bold text-gray-900">
              ${productPrice.toFixed(2)}
            </p>

          </div>
        </div>
      </Link>
    </div>
  );
};


ProductCardItem.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string.isRequired,
    image: PropTypes.arrayOf(PropTypes.string).isRequired,
    price: PropTypes.oneOfType([PropTypes.array, PropTypes.number]).isRequired,
    rating: PropTypes.number, 
  }).isRequired,
};


ProductCard.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.string.isRequired,
      image: PropTypes.arrayOf(PropTypes.string).isRequired,
      price: PropTypes.oneOfType([PropTypes.array, PropTypes.number]).isRequired,
      rating: PropTypes.number, 
    })
  ).isRequired,
};

export default ProductCard;




