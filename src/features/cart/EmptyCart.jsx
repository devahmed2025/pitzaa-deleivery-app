import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react'; // Optional: Add an icon
import { useDarkMode } from '../darkMode/hook/useDarkMode'; // Import dark mode hook

// EmptyCart displays a message when the cart is empty
function EmptyCart() {
  const { isDarkMode } = useDarkMode(); // Get dark mode state

  return (
    <div
      className={`flex flex-col items-center justify-center rounded-xl py-20 text-center shadow-sm ${
        isDarkMode ? 'dark bg-gray-800' : 'bg-gray-50'
      }`}
    >
      <ShoppingCart
        className={`mb-4 h-10 w-10 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`}
      />
      <p
        className={`mb-2 text-lg font-medium ${
          isDarkMode ? 'text-gray-200' : 'text-gray-700'
        }`}
      >
        Your cart is empty
      </p>
      <p
        className={`mb-6 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
      >
        Looks like you haven’t added anything yet.
      </p>
      <Link
        to="/menu"
        className={`inline-block rounded-xl px-6 py-2 text-sm font-semibold text-white transition ${
          isDarkMode ? 'bg-blue-500 hover:bg-blue-600' : 'bg-yellow-400 hover:bg-yellow-500'
        }`}
      >
        ← Back to Menu
      </Link>
    </div>
  );
}

export default EmptyCart;