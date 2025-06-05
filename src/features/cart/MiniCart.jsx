import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CartItem from './CartItem';
import { getCard, getTotalCartItem, getTotalCartPrice } from './cartSlice';
import { useDarkMode } from '../darkMode/hook/useDarkMode'; // Import dark mode hook

// MiniCart displays a floating cart button and expandable cart panel
function MiniCart() {
  const [isOpen, setIsOpen] = useState(false);
  // const cart = useSelector((state) => state.cart?.cart || []);
  const cart = useSelector(getCard || []);
  const { isDarkMode } = useDarkMode(); // Get dark mode state

  // const total = cart.reduce((acc, item) => acc + item.totalPrice, 0);
  const total = useSelector(getTotalCartPrice);

  // const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const itemCount = useSelector(getTotalCartItem);

  return (
    <div className="fixed bottom-20 right-4 z-50">
      {/* Mini Cart Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex h-16 w-16 items-center justify-center rounded-full p-2 shadow-lg transition ${
          isDarkMode ? 'bg-blue-500 hover:bg-blue-600' : 'bg-yellow-400 hover:bg-yellow-500'
        }`}
      >
        <span className="relative">
          🛒
          {itemCount > 0 && (
            <span
              className={`absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full text-xs text-white ${
                isDarkMode ? 'bg-red-600' : 'bg-red-500'
              }`}
            >
              {itemCount}
            </span>
          )}
        </span>
      </button>

      {/* Expanded Cart Panel */}
      {isOpen && (
        <div
          className={`absolute bottom-20 right-0 w-80 rounded-lg border p-4 shadow-xl ${
            isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
          }`}
        >
          <h3 className={`mb-4 text-lg font-bold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
            Your Cart ({itemCount})
          </h3>

          {cart.length === 0 ? (
            <p className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Your cart is empty</p>
          ) : (
            <>
              <div className="max-h-64 space-y-2 overflow-y-auto">
                {cart.map((item) => (
                  <CartItem item={item} key={item.pizzaId} miniView />
                ))}
              </div>
              <div className={`mt-4 border-t pt-2 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <p className={`font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                  Total: ${total.toFixed(2)}
                </p>
                <Link
                  to="/cart"
                  className={`mt-2 block w-full rounded py-2 text-center font-medium text-white transition ${
                    isDarkMode ? 'bg-blue-500 hover:bg-blue-600' : 'bg-yellow-400 hover:bg-yellow-500'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  View Cart
                </Link>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default MiniCart;
