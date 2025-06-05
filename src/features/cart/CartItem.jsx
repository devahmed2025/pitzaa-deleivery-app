import { formatCurrency } from '../../utils/helpers';
import { useDispatch } from 'react-redux';
import { increaseItem, decreaseItem, deleteItem } from './cartSlice';
import Button from '../../ui/Button';
import { useDarkMode } from '../darkMode/hook/useDarkMode'; // Import dark mode hook

// CartItem displays a single item in the cart with quantity controls
function CartItem({ item, miniView = false }) {
  const { pizzaId, name, unitPrice, quantity, totalPrice } = item;
  const dispatch = useDispatch();
  const { isDarkMode } = useDarkMode(); // Get dark mode state

  return (
    <div
      className={`flex items-center justify-between ${
        miniView
          ? 'py-2'
          : `rounded-lg border p-4 shadow-sm ${
              isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
            }`
      }`}
    >
      {/* Left Section */}
      <div className="flex-1">
        <div className={`${miniView && 'flex flex-row justify-start gap-2'}`}>
          <span
            className={` ${miniView ? 'block text-sm' : 'hidden'} ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            {quantity}
          </span>
          <h3
            className={`${
              miniView ? 'text-sm' : 'text-lg'
            } font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}
          >
            {name}
          </h3>
        </div>

        {!miniView && (
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {quantity} × {formatCurrency(unitPrice)}
          </p>
        )}
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2">
        <Button
          type="round"
          size={miniView ? 'xs' : 'sm'}
          onClick={() => dispatch(decreaseItem(pizzaId))}
          className={isDarkMode ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-200 hover:bg-gray-300'}
        >
          -
        </Button>

        <Button
          type="round"
          size={miniView ? 'xs' : 'sm'}
          onClick={() => dispatch(increaseItem(pizzaId))}
          className={isDarkMode ? 'bg-blue-500 hover:bg-blue-600' : 'bg-yellow-400 hover:bg-yellow-500'}
        >
          +
        </Button>

        <p
          className={`${
            miniView ? 'text-sm' : 'text-lg'
          } font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}
        >
          {formatCurrency(totalPrice)}
        </p>
        {!miniView && (
          <Button
            size="sm"
            type="order"
            onClick={() => dispatch(deleteItem(pizzaId))}
            className={isDarkMode ? 'bg-red-600 hover:bg-red-700' : 'bg-red-500 hover:bg-red-600'}
          >
            x
          </Button>
        )}
      </div>
    </div>
  );
}

export default CartItem;