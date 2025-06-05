import { Outlet, useNavigation } from 'react-router-dom';
import Header from './Header';
import CartOverview from '../features/cart/CartOverview';
import Loader from './Loader';
import { useSelector } from 'react-redux';
import MiniCart from '../features/cart/MiniCart';
import { useDarkMode } from '../features/darkMode/hook/useDarkMode'; // Import the dark mode hook
import { DarkModeToggle } from '../features/darkMode/components/DarkModeToggle'; // Import the toggle component

// we nead to add global isLoading state so we put it here to be available for the whole app
function AppLayout() {
  const navigation = useNavigation();
  // console.log(navigation);
  //   {state: 'idle', location: undefined, formMethod: undefined, formAction: undefined, formEncType: undefined
  //   {state: 'loading', location: {…}, formMethod: undefined, formAction: un
  const isLoading = navigation.state === 'loading';
  const cart = useSelector((state) => state.cart?.cart || []); // Optional chaining
  const { isDarkMode } = useDarkMode(); // Get dark mode state

  return (
    <div className={`grid h-screen grid-rows-[auto_1fr_auto] ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-100'}`}>
      {/* Dark Mode Toggle
      <div className="fixed right-4 top-4 z-50">
        <DarkModeToggle />
      </div> */}

      {/* general loader for all the routes */}
      {isLoading && <Loader />}

      {/* header of the app */}
      <Header />

      <div className="overflow-scroll">
        <main className={`mx-auto max-w-7xl ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
          {/* // main has the outlet to render the children of the parent route
 components that are defined in the routes
         */}
          <Outlet />
          {/* <h1>Content</h1> */}
        </main>
        <MiniCart />
      </div>

      {/* cart overview shows card icon and number of items in the cart */}
      {cart.length > 0 && <CartOverview />}
    </div>
  );
}

export default AppLayout;
