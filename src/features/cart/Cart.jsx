import { Link } from 'react-router-dom';
import LinkButton from '../../ui/LinkButton';
import CartItem from './CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, deleteItem, increaseItem, decreaseItem, clearCart } from './cartSlice';
import EmptyCart from './EmptyCart';
import { useDarkMode } from '../darkMode/hook/useDarkMode'; // Import dark mode hook

// Cart displays the user’s cart with items, total, and action buttons
function Cart() {
  // const cart = fakeCart;
  // first cart is reducer second cart is the array cart:[]
  const cart = useSelector((state) => state.cart?.cart || []); // Optional chaining
  // this is the quantity of every item
  const quantity = cart.reduce((acc, item) => acc + item.quantity, 0);
  // total of every single item
  const total = cart.reduce((acc, item) => acc + item.totalPrice, 0);
  const { isDarkMode } = useDarkMode(); // Get dark mode state

  // console.log(cart[0]);
  // if (cart.length > 0) {
  //   const { name, pizzaId, unitPrice } = cart[0];
  //   console.log(name, pizzaId, unitPrice);
  // }

  const dispatch = useDispatch();
  // const total = cart.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  // console.log(total);
  if (cart.length <= 0) return <EmptyCart />;
  return (
    <div className={`mx-auto max-w-3xl px-4 py-10 ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <LinkButton
        to="/menu"
        className={isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-yellow-600 hover:text-yellow-700'}
      >
        ← Back to menu
      </LinkButton>

      <h2 className={`mb-8 mt-6 text-center text-3xl font-bold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
        🛒 Your Cart
      </h2>

      <div className="space-y-4">
        {cart.map((item) => (
          <CartItem item={item} key={item.pizzaId} />
        ))}
      </div>

      <div
        className={`mt-8 flex items-center justify-between border-t pt-6 ${
          isDarkMode ? 'border-gray-700' : 'border-gray-200'
        }`}
      >
        <p className={`text-xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>Total: ${total}</p>

        <div className="flex gap-4">
          <Link
            to="/order/new"
            className={`rounded-lg px-4 py-2 text-white transition ${
              isDarkMode ? 'bg-blue-500 hover:bg-blue-600' : 'bg-yellow-400 hover:bg-yellow-500'
            }`}
          >
            Order Pizzas
          </Link>
          <button
            onClick={() => dispatch(clearCart())}
            className={`rounded-lg px-4 py-2 text-white transition ${
              isDarkMode ? 'bg-red-600 hover:bg-red-700' : 'bg-red-500 hover:bg-red-600'
            }`}
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
