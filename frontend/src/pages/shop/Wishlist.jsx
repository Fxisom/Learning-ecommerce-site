import { useContext, useEffect, useState } from 'react';
import { AppContent } from '../../context/AppContext';
import { assets } from '../../assets/assets.js';
import { Link } from 'react-router-dom';

const Wishlist = () => {
    const { wishlistItems, removeFromWishlist, products } = useContext(AppContent);
    const [wishlistData, setWishlistData] = useState([]);

    useEffect(() => {
        const tempData = Object.keys(wishlistItems).map(itemId => {
            return products.find(product => product._id === itemId);
        }).filter(Boolean);
        setWishlistData(tempData);
    }, [wishlistItems, products]);

    return (
        <div className='border-t pt-14 mb-20 mx-20'>
            <div className='text-2xl mb-3'>
                <h2>YOUR WISHLIST</h2>
            </div>

            <div>
                {wishlistData.map((product, index) => (
                    <div key={index} className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr] sm:grid-cols-[4fr_0.5fr] items-center gap-4'>
                        <div className='flex items-start gap-6'>
                            {/* Link for product image, name, and price */}
                            <Link to={`/product/${product._id}`} className="flex items-start gap-6">
                                <img className='w-16 sm:w-20' src={product.image[0]} alt={product.name} />
                                <div>
                                    <p className='text-xs sm:text-lg font-medium'>{product.name}</p>
                                    <p className='text-sm text-gray-500 mt-1'>${product.price}</p>
                                </div>
                            </Link>
                        </div>
                        <img 
                            onClick={() => removeFromWishlist(product._id)} 
                            className='w-4 mr-4 sm:w-5 cursor-pointer' 
                            src={assets.bin_icon} 
                            alt="Remove" 
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Wishlist;

