import { Link } from "react-router";
import { FiSearch, FiShoppingCart, FiUser } from "react-icons/fi";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        
         
          <h1 className="text-2xl font-black tracking-tight text-gray-900">
            ZEAL<span className="text-blue-600">.</span>
          </h1>
        

        
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            to="/"
            className="text-sm font-medium text-gray-700 transition hover:text-blue-600"
          >
            Home
          </Link>

          <Link
            to="/shop"
            className="text-sm font-medium text-gray-700 transition hover:text-blue-600"
          >
            Shop
          </Link>

          <Link
            to="/categories"
            className="text-sm font-medium text-gray-700 transition hover:text-blue-600"
          >
            Categories
          </Link>
        </nav>

        
        <div className="hidden w-64 lg:block">
          <div className="flex items-center rounded-full border border-gray-200 bg-gray-50 px-4 py-2.5 transition focus-within:border-blue-500 focus-within:bg-white">
            <FiSearch className="mr-2 text-gray-400" size={18} />

            <input
              type="text"
              placeholder="Search products..."
              className="w-full bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
            />
          </div>
        </div>

        
        <div className="flex items-center gap-2">

          
          <Link
            to="/becomeSeller"
            className="bg-blue-600 text-white rounded-full px-4 py-2 text-sm font-semibold transition hover:bg-blue-400 md:block"
          >
            Become a Seller
          </Link>

          
          <Link
            to="/cart"
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-gray-700 transition hover:bg-gray-100 hover:text-blue-600"
          >
            <FiShoppingCart size={20} />

            <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-blue-600 px-1 text-[10px] font-bold text-white">
              0
            </span>
          </Link>

          
          <Link
            to="/account"
            className="hidden h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition hover:bg-blue-600 hover:text-white sm:flex"
          >
            <FiUser size={19} />
          </Link>

        </div>
      </div>
    </header>
  );
};

export default Header;