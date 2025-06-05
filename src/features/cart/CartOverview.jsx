import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useDarkMode } from '../darkMode/hook/useDarkMode'; // Import dark mode hook

// CartOverview displays a summary of the cart with total items and price
function CartOverview() {
  const cart = useSelector((state) => state.cart?.cart || []); // Optional chaining
  const quantity = cart.reduce((acc, item) => acc + item.quantity, 0);
  const total = cart.reduce((acc, item) => acc + item.totalPrice, 0);
  const { isDarkMode } = useDarkMode(); // Get dark mode state

  return (
    <div
      className={`flex items-center justify-between border p-5 text-sm uppercase ${
        isDarkMode
          ? 'dark border-blue-500 bg-gray-800 text-gray-100 hover:bg-gray-700'
          : 'border-yellow-300 bg-slate-700 text-slate-100 hover:bg-slate-800'
      }`}
    >
      <p className="space-x-5 font-semibold">
        <span>{quantity} pizzas</span>
        <span className={isDarkMode ? 'text-blue-400' : 'text-yellow-500'}>${total}</span>
      </p>
      <Link className={isDarkMode ? 'hover:text-blue-400' : 'hover:text-yellow-400'} to="/cart">
        Open cart →
      </Link>
    </div>
  );
}

export default CartOverview;
