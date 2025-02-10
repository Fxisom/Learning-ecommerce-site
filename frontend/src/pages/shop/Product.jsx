import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContent } from '../../context/AppContext';
import Rating from '../../components/Rating';
import ProductCard from './ProductCard';
import { toast } from 'react-toastify';

const Product = () => {
    const { productId } = useParams();
    const { products, currency, addToCart, addToWishlist, removeFromWishlist, wishlistItems } = useContext(AppContent);
    const [productData, setProductData] = useState(false);
    const [image, setImage] = useState('');
    const [size, setSize] = useState('');
    const [rating, setRating] = useState(0);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [isInWishlist, setIsInWishlist] = useState(false);  // Wishlist state

    const handleAddToCart = () => {
        if (size) {
            addToCart(productData._id, size);
            toast.success(`${productData.name} added to cart with size ${size}!`);
        } else {
            toast.error('Please select a size first!');
        }
    };

    // Fetch product data and set related products
    const fetchProductData = async () => {
        products.map((item) => {
            if (item._id === productId) {
                setProductData(item);
                setImage(item.image[0]);
                setRating(item.rating || 0);

                const related = products.filter(
                    (product) => product.category === item.category && product._id !== productId
                );
                setRelatedProducts(related.slice(0, 4));
                return null;
            }
        });
    };

    // Set initial wishlist state based on context data
    useEffect(() => {
        if (wishlistItems[productId]) {
            setIsInWishlist(true);
        }
    }, [wishlistItems, productId]);

    // Handle wishlist click: add or remove item from wishlist
    const handleWishlistClick = () => {
        if (isInWishlist) {
            removeFromWishlist(productData._id);
            toast.success(`${productData.name} removed from wishlist!`);
        } else {
            addToWishlist(productData._id);
            toast.success(`${productData.name} added to wishlist!`);
        }
        setIsInWishlist(!isInWishlist);
    };

    useEffect(() => {
        fetchProductData();
    }, [productId, products]);

    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

    return productData ? (
        <div className='pt-8'>
            <div className='max-w-8xl mx-auto px-20 pb-10'>
                <div className='flex gap-8 sm:gap-10 flex-col sm:flex-row'>
                    <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
                        <div className='flex sm:flex-col overflow-x-hidden sm:overflow-y-hidden justify-between sm:justify-normal sm:w-[18%] w-full'>
                            {productData.image.map((item, index) => (
                                <img
                                    onClick={() => setImage(item)}
                                    src={item}
                                    key={index}
                                    className='w-[22%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer'
                                    alt=""
                                />
                            ))}
                        </div>
                        <div className='w-full sm:w-[78%]'>
                            <img className='w-full h-auto' src={image} alt="" />
                        </div>
                    </div>

                    <div className='flex-1'>
                        <h1 className='font-medium text-xl mt-2'>{productData.name}</h1>

                        <div className='flex items-center gap-1 mt-2'>
                            <Rating rating={rating} onRatingChange={handleRatingChange} />
                            <p className='pl-2'>{productData.reviews || 122}</p>
                        </div>

                        <p className='mt-4 text-2xl font-medium'>{currency}{productData.price}</p>
                        <p className='mt-4 text-gray-500 md:w-3/5'>{productData.description}</p>
                        <div className='flex flex-col gap-3 my-6'>
                            <p>Select Size</p>
                            <div className='flex gap-2'>
                                {productData.sizes.map((item, index) => (
                                    <button
                                        onClick={() => setSize(item)}
                                        className={`border py-2 px-4 bg-gray-100 ${item === size ? 'border-orange-500' : ''}`}
                                        key={index}
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <button onClick={handleAddToCart} className='bg-black text-white px-6 py-2 text-sm active:bg-gray-700'>
                            ADD TO CART
                        </button>
                        <button onClick={handleWishlistClick} className='bg-black text-white px-6 py-2 text-sm active:bg-gray-700 ml-7'>
                            {isInWishlist ? 'REMOVE FROM WISHLIST' : 'ADD TO WISHLIST'}
                        </button>
                        <hr className='mt-6 sm:w-4/5' />
                        <div className='text-xs text-gray-500 mt-4 flex flex-col gap-1'>
                            <p>100% Original product.</p>
                            <p>Cash on delivery is available on this product.</p>
                            <p>Easy return and exchange policy within 7 days.</p>
                        </div>
                    </div>
                </div>

                <div className='mt-16'>
                    <div className='flex justify-center'>
                        <h2 className='mb-10 text-3xl inline-block border-b-2 pb-2 border-black text-center'>
                            Related Products
                        </h2>
                    </div>

                    <div >
                        <ProductCard products={relatedProducts} />
                    </div>
                </div>

            </div>
        </div>
    ) : (
        <div className=' opacity-0'></div>
    );
};

export default Product;

