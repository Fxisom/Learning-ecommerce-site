import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AppContent = createContext();


export const AppContextProvider = (props) => {
  const currency = '$';
  const delivery_fee = 10;

  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const navigate = useNavigate();
 


  const addToCart = async (itemId, size) => {

    if (!size) {
        toast.error('Select Product Size');
        return;
    }

    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
        if (cartData[itemId][size]) {
            cartData[itemId][size] += 1;
        }
        else {
            cartData[itemId][size] = 1;
        }
    }
    else {
        cartData[itemId] = {};
        cartData[itemId][size] = 1;
    }
    setCartItems(cartData);



}

const getCartCount = () => {
  let totalCount = 0;
  for (const items in cartItems) {
      for (const item in cartItems[items]) {
          try {
              if (cartItems[items][item] > 0) {
                  totalCount += cartItems[items][item];
              }
          } catch (error) {
            toast.error(error.message)
          }
      }
  }
  return totalCount;
}


  const getAuthState = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/auth/is-auth');
      if (data.success) {
        setIsLoggedin(true);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getUserData = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/data');
      data.success ? setUserData(data.userData) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getProductsData = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list');
      if (response.data.success) {
       
        const productsWithDefaultRating = response.data.products.map((product) => ({
          ...product,
          rating: product.rating || 0, 
        }));
        setProducts(productsWithDefaultRating.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getProductsData();
  }, []);

  console.log("Backend URL:", backendUrl);

  useEffect(() => {
    getAuthState();
  });

  const value = {
    getProductsData,
    products,
    backendUrl,
    isLoggedin,
    setIsLoggedin,
    userData,
    setUserData,
    getUserData,
    currency ,addToCart,setCartItems,
    getCartCount, navigate,delivery_fee
  };

  return <AppContent.Provider value={value}>{props.children}</AppContent.Provider>;
};

AppContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
