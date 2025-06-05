import { Link } from 'react-router-dom';
import { useState } from 'react';
import Button from '../../ui/Button';
import { X, Plus, Minus } from 'lucide-react'; // or any icon library you use
import { formatCurrency } from '../../utils/helpers';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, deleteItem, increaseItem, decreaseItem, getCard } from '../cart/cartSlice';
import IsInCardButtons from './IsInCardButtons';
import { useDarkMode } from '../darkMode/hook/useDarkMode'; // Import dark mode hook

function MenuItem({ pizza }) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { name, unitPrice, ingredients, soldOut, imageUrl, id } = pizza;
  const { isDarkMode } = useDarkMode(); // Get dark mode state

  // Get current cart items to check if this pizza is already in cart
  // const cartItems = useSelector((state) => state.cart.cart);
  const cartItems = useSelector(getCard);

  const currentItem = cartItems.find((item) => item.pizzaId === pizza.id);
  const isInCart = Boolean(currentItem);

  async function handleAddToCart() {
    setIsLoading(true);
    try {
      const payload = {
        pizzaId: id,
        name,
        unitPrice,
        quantity: 1,
        totalPrice: unitPrice,
      };
      dispatch(addItem(payload));
    } catch (error) {
      console.error('Error adding item to cart:', error);
    } finally {
      setIsLoading(false);
    }
  }

  function handleIncreaseQuantity() {
    dispatch(increaseItem(id));
  }

  function handleDecreaseQuantity() {
    if (currentItem?.quantity === 1) {
      dispatch(deleteItem(id));
    } else {
      dispatch(decreaseItem(id));
    }
  }

  return (
    <li
      className={`group relative overflow-hidden rounded-2xl border-2 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
        soldOut
          ? isDarkMode
            ? 'border-gray-700 bg-gray-800 opacity-70'
            : 'border-gray-300 bg-gray-50 opacity-70'
          : isDarkMode
            ? 'border-transparent bg-gray-900 hover:border-blue-500'
            : 'border-transparent bg-white hover:border-yellow-400'
      }`}
    >
      {/* Sold Out Overlay */}
      {soldOut && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
          <span
            className={`rounded-lg px-4 py-2 text-lg font-bold shadow-lg ${
              isDarkMode ? 'bg-red-700 text-gray-100' : 'bg-red-600 text-white'
            }`}
          >
            SOLD OUT
          </span>
        </div>
      )}

      <Link to={`/menu/${id}`} className="block">
        {/* Image Container */}
        <div
          className={`relative overflow-hidden p-1 ${
            isDarkMode ? 'bg-gradient-to-br from-gray-700 to-gray-800' : 'bg-gradient-to-br from-yellow-50 to-orange-50'
          }`}
        >
          <img
            src={imageUrl}
            alt={name}
            className="mx-auto h-40 w-40 rounded-full object-cover shadow-md transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />

          {/* Price Badge */}
          {!soldOut && (
            <div
              className={`absolute right-4 top-4 rounded-full px-3 py-1 text-sm font-bold shadow-lg ${
                isDarkMode ? 'bg-green-600 text-gray-100' : 'bg-green-500 text-white'
              }`}
            >
              {formatCurrency(unitPrice)}
            </div>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="p-6 pt-4">
        <h3 className={`mb-3 line-clamp-2 text-lg font-bold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
          {name}
        </h3>

        <p className={`mb-4 line-clamp-2 min-h-[2.5rem] text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          {ingredients.join(', ')}
        </p>

        {/* Action Buttons */}
        <div className="flex items-center justify-center space-x-2">
          {!soldOut && !isInCart && (
            <Button
              onClick={handleAddToCart}
              type="primary"
              size="sm"
              disabled={isLoading}
              className={`w-full rounded-lg px-4 py-2 font-semibold transition-colors duration-200 ${
                isDarkMode
                  ? 'bg-blue-500 text-gray-100 hover:bg-blue-600'
                  : 'bg-yellow-500 text-white hover:bg-yellow-600'
              }`}
            >
              {isLoading ? 'Adding...' : 'Add to Cart'}
            </Button>
          )}

          {!soldOut && isInCart && (
            // <div className="flex w-full items-center justify-between gap-2">
            //   {/* Quantity controls */}
            //   <div className="flex items-center gap-1">
            //     <Button
            //       onClick={handleDecreaseQuantity}
            //       size="icon"
            //       className="h-8 w-8 rounded-full bg-yellow-400 text-gray-800 hover:bg-yellow-300"
            //     >
            //       <Minus size={16} />
            //     </Button>
            //   {console.log(currentItem)}

            //     <span className="w-6 text-center font-semibold text-gray-800">{currentItem?.quantity || 0}</span>

            //     <Button
            //       onClick={handleIncreaseQuantity}
            //       size="icon"
            //       className="h-8 w-8 rounded-full bg-yellow-500 text-white hover:bg-yellow-600"
            //     >
            //       <Plus size={16} />
            //     </Button>

            //     <Button
            //       onClick={() => dispatch(deleteItem(id))}
            //       size="small"
            //       variant="destructive"
            //       type='order'
            //       className="h-8 w-8 rounded-full"
            //     >
            //       <X size={16} className="bg-red-500" />
            //     </Button>
            //   </div>

            //   {/* Price */}
            //   <span className="text-lg font-semibold text-green-600">
            //     {formatCurrency(currentItem?.totalPrice || 0)}
            //   </span>
            // </div>
            <IsInCardButtons currentItem={pizza} />
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
