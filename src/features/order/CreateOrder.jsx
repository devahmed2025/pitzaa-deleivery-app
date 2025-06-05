import { createOrder } from '../../services/apiRestaurant';
import Button from '../../ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import { getCard, clearCart } from '../cart/cartSlice';
import { fetchAddress } from '../user/userSlice';
import EmptyCart from '../cart/EmptyCart';
import store from '../../../store';
import { useEffect, useState } from 'react';
import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import { useDarkMode } from '../darkMode/hook/useDarkMode'; // Import dark mode hook

// Enhanced phone validation with better regex
const isValidPhone = (str) => /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(str);

// Format currency helper
const formatCurrency = (amount) => `$${amount.toFixed(2)}`;

// CreateOrder component handles order creation with user input and cart summary
function CreateOrder() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  const cart = useSelector(getCard) || [];
  const formErrors = useActionData();
  const [isPriority, setIsPriority] = useState(false);
  const { isDarkMode } = useDarkMode(); // Get dark mode state

  const { username, position, address, error, status, phone } = useSelector((state) => state.user);
  const isAddressLoading = status === 'loading';

  const [isAddress, setIsAddress] = useState(address || '');
  const [userphone, setUserPhone] = useState(phone || '');
  // console.log(address);

  // Calculate totals
  const subtotal = cart.reduce((acc, item) => acc + item.totalPrice, 0);
  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
  const priorityFee = isPriority ? 2 : 0;
  const totalAmount = subtotal + priorityFee;

  // Update address state when Redux address changes
  useEffect(() => {
    setIsAddress(address);
  }, [address]);

  if (cart.length === 0) return <EmptyCart />;

  return (
    <div className={`mx-auto max-w-4xl px-4 py-8 ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className={`mb-2 text-3xl font-bold ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
          Complete Your Order
        </h1>
        <p className={`text-gray-600 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Please provide your details to finalize your order
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Order Form */}
        <div
          className={`rounded-lg border p-6 shadow-sm ${
            isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
          }`}
        >
          <h2 className={`mb-6 text-xl font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
            Delivery Information
          </h2>

          <Form method="POST" action="/order/new" className="space-y-6">
            {/* Customer Name */}
            <div className="space-y-2">
              <label
                htmlFor="customer"
                className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
              >
                Full Name *
              </label>
              <input
                id="customer"
                type="text"
                name="customer"
                required
                placeholder="Enter your full name"
                className={`w-full rounded-lg border px-4 py-3 transition-all focus:border-transparent focus:ring-2 ${
                  isDarkMode
                    ? 'border-gray-600 bg-gray-700 text-gray-200 focus:ring-blue-500'
                    : 'border-gray-300 bg-white text-gray-900 focus:ring-yellow-500'
                }`}
              />
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <label
                htmlFor="phone"
                className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
              >
                Phone Number *
              </label>
              <input
                id="phone"
                type="tel"
                name="phone"
                defaultValue={userphone}
                onChange={(e) => setUserPhone(e.target.value)}
                required
                placeholder="e.g., +1 (555) 123-4567"
                className={`w-full rounded-lg border px-4 py-3 transition-all focus:border-transparent focus:ring-2 ${
                  formErrors?.phone
                    ? 'border-red-300 bg-red-50 text-gray-900'
                    : isDarkMode
                      ? 'border-gray-600 bg-gray-700 text-gray-200 focus:ring-blue-500'
                      : 'border-gray-300 bg-white text-gray-900 focus:ring-yellow-500'
                }`}
              />
              {formErrors?.phone && (
                <p className="mt-1 flex items-center text-sm text-red-600">
                  <span className="mr-1">⚠️</span>
                  {formErrors.phone}
                </p>
              )}
            </div>

            {/* Address */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="address"
                  className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                >
                  Delivery Address *
                </label>
                {!isAddressLoading && (
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(fetchAddress());
                    }}
                    size="sm"
                    disabled={isAddressLoading}
                    type="primary"
                    className={isDarkMode ? 'bg-blue-500 hover:bg-blue-600' : 'bg-yellow-500 hover:bg-yellow-600'}
                  >
                    Get Position
                  </Button>
                )}
              </div>

              <textarea
                id="address"
                name="address"
                required
                disabled={isAddressLoading}
                value={isAddress}
                onChange={(e) => setIsAddress(e.target.value)}
                rows="3"
                placeholder="Enter your complete delivery address including street, city, and postal code"
                className={`w-full resize-none rounded-lg border px-4 py-3 transition-all focus:border-transparent focus:ring-2 ${
                  isDarkMode
                    ? 'border-gray-600 bg-gray-700 text-gray-200 focus:ring-blue-500'
                    : 'border-gray-300 bg-white text-gray-900 focus:ring-yellow-500'
                }`}
              />
              {status === 'error' && (
                <p className="mt-1 flex items-center text-sm text-red-600">
                  <span className="mr-1">⚠️</span>
                  {error}
                </p>
              )}
            </div>

            {/* Priority Option */}
            <div
              className={`rounded-lg border p-4 ${
                isDarkMode ? 'border-blue-600 bg-gray-700' : 'border-yellow-200 bg-yellow-50'
              }`}
            >
              <div className="flex items-start space-x-3">
                <input
                  id="priority"
                  type="checkbox"
                  name="priority"
                  checked={isPriority}
                  onChange={(e) => setIsPriority(e.target.checked)}
                  className={`mt-1 h-5 w-5 rounded border-gray-300 ${
                    isDarkMode ? 'text-blue-500 focus:ring-blue-500' : 'text-yellow-600 focus:ring-yellow-500'
                  }`}
                />
                <div className="flex-1">
                  <label
                    htmlFor="priority"
                    className={`block cursor-pointer text-sm font-medium ${
                      isDarkMode ? 'text-gray-200' : 'text-gray-900'
                    }`}
                  >
                    Priority Delivery (+$2.00)
                  </label>
                  <p className={`mt-1 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Get your order faster with priority processing and delivery
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button
                disabled={isSubmitting}
                className={`w-full rounded-lg px-6 py-3 font-semibold text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
                  isDarkMode ? 'bg-blue-500 hover:bg-blue-600' : 'bg-yellow-500 hover:bg-yellow-600'
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing Order...
                  </span>
                ) : (
                  `Place Order • ${formatCurrency(totalAmount)}`
                )}
              </Button>
              <input type="hidden" name="cart" value={JSON.stringify(cart)} />
            </div>
          </Form>
        </div>

        {/* Order Summary */}
        <div className={`h-fit rounded-lg p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
          <h2 className={`mb-6 text-xl font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
            Order Summary
          </h2>

          {/* Cart Items */}
          <div className="mb-6 space-y-4">
            {cart.map((item) => (
              <div
                key={item.pizzaId}
                className={`flex items-center justify-between py-3 last:border-b-0 ${
                  isDarkMode ? 'border-gray-700' : 'border-gray-200'
                } border-b`}
              >
                <div className="flex-1">
                  <h3 className={`font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>{item.name}</h3>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Quantity: {item.quantity}
                  </p>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                    {formatCurrency(item.totalPrice)}
                  </p>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {formatCurrency(item.unitPrice)} each
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Order Totals */}
          <div className={`space-y-3 pt-4 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} border-t`}>
            <div className="flex justify-between text-sm">
              <span className={` ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Subtotal ({totalQuantity} items)
              </span>
              <span className={` ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>{formatCurrency(subtotal)}</span>
            </div>

            {isPriority && (
              <div className="flex justify-between text-sm">
                <span className={` ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Priority Fee</span>
                <span className={` ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                  {formatCurrency(priorityFee)}
                </span>
              </div>
            )}

            <div className="flex justify-between text-sm">
              <span className={` ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Delivery</span>
              <span className="text-green-600">Free</span>
            </div>

            <div
              className={`flex justify-between text-lg font-semibold ${
                isDarkMode ? 'border-gray-700' : 'border-gray-200'
              } border-t pt-3`}
            >
              <span className={` ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>Total</span>
              <span className={` ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                {formatCurrency(totalAmount)}
              </span>
            </div>
          </div>

          {/* Delivery Info */}
          <div
            className={`mt-6 rounded-lg border p-4 ${
              isDarkMode ? 'border-gray-700 bg-gray-700' : 'border-gray-200 bg-white'
            }`}
          >
            <div className="mb-2 flex items-center space-x-2">
              <svg
                className={`h-5 w-5 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className={`font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                Estimated Delivery Time
              </h3>
            </div>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {isPriority ? '20-30 minutes' : '30-45 minutes'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Enhanced action function with better validation and priority fee handling
export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  // console.log(data);
  // Parse cart data
  const cart = JSON.parse(data.cart);
  // console.log('Cart data:', cart);

  // Convert priority to boolean correctly
  const priority = data.priority === 'on'; // Form checkbox returns 'on' when checked
  const priorityFee = priority ? 2 : 0;

  // Calculate subtotal from cart items
  const subtotal = cart.reduce((acc, item) => acc + item.totalPrice, 0);
  const totalAmount = subtotal + priorityFee;

  // Create order object
  const order = {
    ...data,
    phone: data.phone,
    address: data.address,
    priority, // This is now a proper boolean
    cart,
    subtotal,
    priorityFee,
    totalAmount: subtotal + priorityFee,
  };

  // console.log('Order object to submit:', order);

  // Enhanced validation
  const errors = {};

  if (!data.customer?.trim()) {
    errors.customer = 'Full name is required';
  }

  if (!data.phone?.trim()) {
    errors.phone = 'Phone number is required';
  } else if (!isValidPhone(data.phone)) {
    errors.phone = 'Please enter a valid phone number (minimum 10 digits)';
  }

  if (Object.keys(errors).length > 0) {
    // console.log('Validation errors:', errors);
    return errors;
  }

  try {
    // console.log('Submitting order to API...');
    const newOrder = await createOrder(order);
    // console.log('Order created successfully:', newOrder);

    // Clear cart after successful order
    store.dispatch(clearCart());

    // Redirect to order confirmation page
    return redirect(`/order/${newOrder.id}`);
  } catch (error) {
    console.error('Order submission failed:', error);
    return {
      general: 'Failed to place order. Please try again.',
    };
  }
}

export default CreateOrder;
