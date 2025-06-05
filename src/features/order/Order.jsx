import React from 'react';
import { useFetcher, useLoaderData, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getOrder } from '../../services/apiRestaurant';
import { calcMinutesLeft, formatCurrency, formatDate } from '../../utils/helpers';
import CartItem from '../cart/CartItem';
import OrderItem from './OrderItem';
import { useDarkMode } from '../darkMode/hook/useDarkMode';
import UpdateOrder from './UpdateOrder';

// Order component displays details of a specific order
function Order() {
  // 4 assign the loader data to the function
  const order = useLoaderData();
  // console.log(order);
  const { isDarkMode } = useDarkMode(); // Get dark mode state

  // Everyone can search for all orders, so for privacy reasons we're gonna exclude names or address, these are only for the restaurant staff
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
    address,
    customer,
    phone,
    createdAt,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  // Helper function to safely format dates
  const safeFormatDate = (dateStr) => {
    try {
      if (!dateStr) return 'N/A';
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return 'Invalid Date';
      return formatDate(dateStr);
    } catch (error) {
      console.error('Date formatting error:', error);
      return 'Invalid Date';
    }
  };

  //seps of fetching data without loading will be so useful for the qr code button to fetch the qr code
  // we will useFetcher Hook to fetch the already fetched data on menu route without going there aslan
  const fetcher = useFetcher();

  // we want to get the data as the compoenent mounts so we use useFetcher()
  useEffect(() => {
    //call the route that has the data we want
    if (!fetcher.data && fetcher.state === 'idle') fetcher.load('/menu');
  }, [fetcher]);
  //get the user selector
  // const { username, position, error } = useSelector((state) => state.user);
  console.log(fetcher.data);

  return (
    <div className={`min-h-screen transition-colors duration-200 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div
          className={`mb-8 rounded-xl p-6 shadow-lg ${
            isDarkMode ? 'border border-gray-700 bg-gray-800' : 'border border-gray-200 bg-white'
          }`}
        >
          <div className="mb-6 text-center">
            <h1 className={`mb-2 text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              🍕 Fast React Pizza Co.
            </h1>
            <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Order #{id}</p>
          </div>

          {/* Order Status Bar */}
          <div
            className={`flex flex-wrap items-center justify-between rounded-lg p-4 ${
              isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
            }`}
          >
            <div className="flex items-center gap-4">
              <span
                className={`rounded-full px-4 py-2 text-sm font-semibold uppercase tracking-wide ${
                  status === 'preparing'
                    ? isDarkMode
                      ? 'bg-yellow-900 text-yellow-200'
                      : 'bg-yellow-100 text-yellow-800'
                    : status === 'delivering'
                      ? isDarkMode
                        ? 'bg-blue-900 text-blue-200'
                        : 'bg-blue-100 text-blue-800'
                      : isDarkMode
                        ? 'bg-green-900 text-green-200'
                        : 'bg-green-100 text-green-800'
                }`}
              >
                {status}
              </span>

              {priority && (
                <span
                  className={`rounded-full px-4 py-2 text-sm font-semibold ${
                    isDarkMode ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-800'
                  }`}
                >
                  🚨 Priority Order
                </span>
              )}
            </div>

            {!priority && <UpdateOrder />}
          </div>

          {/* Delivery Info */}
          <div
            className={`mt-6 rounded-lg border-l-4 p-4 ${
              deliveryIn >= 0
                ? isDarkMode
                  ? 'border-green-500 bg-green-900/20'
                  : 'border-green-500 bg-green-50'
                : isDarkMode
                  ? 'border-red-500 bg-red-900/20'
                  : 'border-red-500 bg-red-50'
            }`}
          >
            <p
              className={`mb-2 text-lg font-semibold ${
                deliveryIn >= 0
                  ? isDarkMode
                    ? 'text-green-300'
                    : 'text-green-700'
                  : isDarkMode
                    ? 'text-red-300'
                    : 'text-red-700'
              }`}
            >
              {deliveryIn >= 0 ? `🚀 Arriving in ${deliveryIn} minutes` : '⏰ Order should have arrived'}
            </p>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Estimated delivery: {safeFormatDate(estimatedDelivery)}
            </p>
          </div>
        </div>

        {/* Customer & Delivery Info */}
        <div
          className={`mb-8 rounded-xl p-6 shadow-lg ${
            isDarkMode ? 'border border-gray-700 bg-gray-800' : 'border border-gray-200 bg-white'
          }`}
        >
          <h2 className={`mb-4 text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            📍 Delivery Information
          </h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className={`rounded-lg p-4 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <h3 className={`mb-2 font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Customer Details</h3>
              <p className={`mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                <span className="font-medium">Name:</span> {customer}
              </p>
              <p className={isDarkMode ? 'text-gray-300' : 'text-gray-900'}>
                <span className="font-medium">Phone:</span> {phone}
              </p>
            </div>

            <div className={`rounded-lg p-4 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <h3 className={`mb-2 font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Delivery Address</h3>
              <p className={`mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}>{address}</p>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Ordered: {safeFormatDate(createdAt)}
              </p>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div
          className={`mb-8 rounded-xl p-6 shadow-lg ${
            isDarkMode ? 'border border-gray-700 bg-gray-800' : 'border border-gray-200 bg-white'
          }`}
        >
          <h2 className={`mb-6 text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>🍕 Your Order</h2>

          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.pizzaId}
                className={`rounded-lg border transition-colors duration-200 ${
                  isDarkMode ? 'border-gray-600' : 'border-gray-200'
                }`}
              >
                <OrderItem
                  isLoadingIngredients={fetcher.state === 'loading'}
                  item={item}
                  ingredients={fetcher.data?.find((ele) => ele.id === item.pizzaId)?.ingredients || []}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div
          className={`rounded-xl p-6 shadow-lg ${
            isDarkMode ? 'border border-gray-700 bg-gray-800' : 'border border-gray-200 bg-white'
          }`}
        >
          <h2 className={`mb-6 text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            💰 Order Summary
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Subtotal (Pizzas)</span>
              <span className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {formatCurrency(orderPrice)}
              </span>
            </div>

            {priority && (
              <div className="flex items-center justify-between">
                <span className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Priority Fee</span>
                <span className={`text-lg font-semibold ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
                  {formatCurrency(priorityPrice)}
                </span>
              </div>
            )}

            <div className={`border-t pt-4 ${isDarkMode ? 'border-gray-600' : 'border-gray-200'}`}>
              <div className="flex items-center justify-between">
                <span className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Total to Pay on Delivery
                </span>
                <span className={`text-xl font-bold ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
                  {formatCurrency(orderPrice + priorityPrice)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 1- create loader function which gets the data
export async function loader({ params }) {
  // const { id } = useParams();
  // hooks only work inside components not function, no useParams

  // we use the params method
  // and path: "/order/:orderId", so that's why we used orderId
  const order = await getOrder(params.orderId);
  return order;
}

export default Order;
