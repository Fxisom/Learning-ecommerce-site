import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { AppContent } from "../context/AppContext"
import { useContext } from "react"
import axios from "axios"
import { toast } from "react-toastify"


const Navbar = () => {

    const navigate = useNavigate()
    const { getCartCount,userData, backendUrl, setUserData, setIsLoggedin } = useContext(AppContent)

    const sendVerificationOtp = async () => {
        try {
            axios.defaults.withCredentials = true;

            const { data } = await axios.post(backendUrl + '/api/auth/send-verify-otp')

            if (data.success) {
                navigate('/email-verify')
                toast.success(data.message)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const logout = async () => {
        try {
            axios.defaults.withCredentials = true
            const { data } = await axios.post(backendUrl + '/api/auth/logout')
            data.success && setIsLoggedin(false)
            data.success && setUserData(false)
            navigate('/')
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <header className="fixed-nav-bar w-nav mt-0">

            {/* Sub-header bar with Sign In */}
            <div className="sub-header bg-black text-white py-2 text-sm flex justify-between px-4 items-center">
                <span>Free shipping, 30-day return or refund guarantee.</span>
                {userData ? <div className='w-8 h-8 flex justify-center items-center rounded-full bg-white text-black relative group'>{userData.name[0].toUpperCase()}
                    <div className='absolute hidden group-hover:block top-full right-0 z-10 text-black pt-10'>
                        <ul className='list-none m-0 p-2 bg-gray-100 text-sm rounded shadow-lg'>
                            {!userData.isAccountVerified && <li onClick={sendVerificationOtp} className='py-1 px-2 hover:bg-gray-200 cursor-pointer'>Verify email</li>}
                             
                            <li onClick={logout} className='py-1 px-2 hover:bg-gray-200 cursor-pointer pr-10'>Logout</li>
                        </ul>
                    </div>
                </div> : <div className="flex space-x-4 items-center">

                    <button onClick={() => navigate('/login')} className="hover:underline">
                        Sign In
                    </button>

                </div>}

            </div>

            {/* Main Navigation */}
            <nav className="max-w-screen-2xl mx-auto px-4 flex justify-between items-center mt-4">

                {/* Logo */}
                <div className="nav__logo">
                    <Link><img src="/logo_1.png" alt="Wear4U Logo" className='w-24 h-auto' />
</Link>
                </div>

                {/* Navigation Links */}
                <ul className='nav__links flex space-x-6'>
                    <li className="link hover:text-primary">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="link hover:text-primary">
                        <Link to="/shop">Shop</Link>
                    </li>
                    <li className="link hover:text-primary">
                        <Link to="/about">About</Link>
                    </li>
                    <li className="link hover:text-primary">
                        <Link to="/contact">Contact</Link>
                    </li>
                </ul>

                {/* Nav Icons */}
                <div className="nav__icons relative flex space-x-4 ">
                    <span className="hover:text-primary">
                        <Link to='/search'>
                            <i className="ri-search-line"></i>
                        </Link>
                    </span>
                    <span className="hover:text-primary">
    <Link to='/cart' className='flex items-center'>
        <i className="ri-shopping-bag-line"></i>
        <sup className='text-sm inline-block px-1.5 text-white rounded-full bg-primary text-center'>{getCartCount()}</sup>
    </Link>
</span>

                    <span className="hover:text-primary">
                        <Link to='/wishlist'>
                            <i className="ri-heart-line"></i>
                        </Link>
                    </span>
                </div>
            </nav>
        </header>
    )
}

export default Navbar;


