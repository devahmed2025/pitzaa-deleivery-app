import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './ui/Home';
// 2- connecting loader function to the route as is used to rename named exported functions
import Menu, { loader as menuLoader } from './features/menu/Menu';
import Order, { loader as orderLoader } from './features/order/Order';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PizzaDetail, { loader as pizzaDetailLoader } from './features/menu/PizzaDetail';

import Cart from './features/cart/Cart';
import CreateOrder, {
  // setp 3 conncect actions to the route
  action as CreatOrderAction,
} from './features/order/CreateOrder';
import { action as UpdateOrderAction } from './features/order/UpdateOrder';
import AppLayout from './ui/AppLayout';
import Error from './ui/Error';
import { useDarkMode } from './features/darkMode/hook/useDarkMode';
import { DarkModeToggle } from './features/darkMode/components/DarkModeToggle';

// we pass here array [] of routes

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        // where we will need the data fetching in the menu  1- creat loadder 2- connecting loader function to the route 3- provide data to the page
        path: '/menu',
        element: <Menu />,
        // 3- provide loader function to the route
        loader: menuLoader,
        errorElement: <Error />,
      },
      {
        path: '/menu/:pizzaId',
        element: <PizzaDetail />,
        loader: pizzaDetailLoader,
        errorElement: <Error />,
      },
      {
        path: '/order/new',
        element: <CreateOrder />,
        //  setep 2 conncect actions to the route
        action: CreatOrderAction,
        // actions setup is like the loader
      },
      {
        path: '/order/:orderId',
        element: <Order />,
        loader: orderLoader,
        errorElement: <Error />,
        action: UpdateOrderAction,
        // note that UpdateOrder we want to wire the form in is a child compoentn of order but it will work
      },
      {
        path: '/cart',
        element: <Cart />,
      },
    ],
  },
]);

function App() {
  const { isDarkMode } = useDarkMode();

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      {/* Dark Mode Toggle (positioned fixed in top-right corner) */}
      {/* <div className="fixed right-4 top-4 z-50">
        <DarkModeToggle />
      </div> */}

      <RouterProvider router={router} />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={isDarkMode ? 'dark' : 'light'} // Dynamic theme based on dark mode
        toastClassName={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}
        bodyClassName={isDarkMode ? 'text-gray-100' : 'text-gray-800'}
      />
    </div>
  );
}

export default App;
