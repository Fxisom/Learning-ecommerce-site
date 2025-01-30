import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; // Import the Navbar component
import Footer from './components/footer';
import Login from './pages/home/Login';
import Home from './pages/home/Home';
import ResetPassword from './pages/home/ResetPassword';
import EmailVerify from './pages/home/EmailVerify';
import CategoryPage from './pages/Category/CategoryPage';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import ShopPage from './pages/shop/ShopPage';
import Product from './pages/shop/Product';
import Cart from './pages/shop/Cart';





// import ScrollToTop from './components/ScrollToTop';

function App() {
  
  return (
    <div>
     {/* <ScrollToTop></ScrollToTop> */}
      <ToastContainer /> {/* This will show toasts globally */}

      <Navbar /> {/* The Navbar will be displayed on all pages */}

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/email-verify' element={<EmailVerify />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path='/cart' element={<Cart />} />
      
     
 
      </Routes>
      <Footer /> {/* If you want a footer to appear on all pages */}
    </div>
  );
}

export default App;

