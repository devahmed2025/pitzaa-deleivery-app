import { useSelector } from 'react-redux';
import { useDarkMode } from '../features/darkMode/hook/useDarkMode'; // Import the hook
import { DarkModeToggle } from '../features/darkMode/components/DarkModeToggle'; // Import the toggle component
import CreateUser from '../features/user/CreateUser';
import Button from './Button';
import { NavLink, useNavigate } from 'react-router-dom';
import LinkButton from './LinkButton';

function Home() {
  const { username } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { isDarkMode } = useDarkMode(); // Get dark mode state

  return (
    <div className={`relative min-h-screen overflow-hidden ${isDarkMode ? 'dark' : ''}`}>
      {/* Animated Background */}
      <div
        className={`absolute inset-0 ${
          isDarkMode
            ? 'bg-gradient-to-br from-gray-800 via-gray-900 to-black'
            : 'bg-gradient-to-br from-amber-400 via-orange-500 to-red-600'
        }`}
      >
        {/* Floating pizza elements */}
        <div className="absolute left-10 top-10 animate-bounce text-6xl opacity-20 delay-0">🍕</div>
        <div className="absolute right-20 top-32 animate-bounce text-4xl opacity-30 delay-1000">🍕</div>
        <div className="absolute bottom-20 left-20 animate-bounce text-5xl opacity-25 delay-500">🍕</div>
        <div className="delay-1500 absolute bottom-40 right-10 animate-bounce text-3xl opacity-20">🍕</div>

        {/* Fixed Overlay pattern */}
        <div
          className={`bg-[url('data:image/svg+xml,%3Csvg width=\\'60\\' height=\\'60\\' viewBox=\\'0 0 60 60\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cg fill=\\'none\\' fill-rule=\\'evenodd\\'%3E%3Cg fill=\\'${
            isDarkMode ? '%23ffffff' : '%23ffffff'
          }\\' fill-opacity=\\'${isDarkMode ? '0.2' : '0.1'}\\'%3E%3Ccircle cx=\\'30\\' cy=\\'30\\' r=\\'4\\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] absolute inset-0`}
        ></div>
      </div>

      {/* Dark Mode Toggle
      <div className="fixed right-4 top-4 z-50">
        <DarkModeToggle />
      </div> */}

      {/* Main Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-4xl text-center">
          {/* Welcome Badge */}
          <div
            className={`mx-auto mb-8 inline-flex items-center rounded-full border ${
              isDarkMode ? 'border-white/50 bg-gray-800/50' : 'border-white/30 bg-white/20'
            } px-6 py-2 text-sm font-medium ${isDarkMode ? 'text-white' : 'text-white'} backdrop-blur-sm`}
          >
            <span className="mr-2">🇪🇬</span>
            Serving Masnoura, Egypt
          </div>

          {/* Main Heading */}
          <div className="space-y-6">
            <h1
              className={`font-serif text-4xl font-bold leading-tight ${
                isDarkMode ? 'text-white' : 'text-white'
              } drop-shadow-lg sm:text-5xl lg:text-7xl`}
            >
              The Best Pizza
              <span
                className={`mt-2 block bg-gradient-to-r ${
                  isDarkMode
                    ? 'from-blue-300 to-blue-500'
                    : 'from-yellow-200 to-yellow-400'
                } bg-clip-text text-3xl font-extrabold text-transparent sm:text-4xl lg:text-5xl`}
              >
                in Masnoura
              </span>
            </h1>

            <p
              className={`mx-auto max-w-2xl text-lg font-semibold leading-relaxed ${
                isDarkMode ? 'text-gray-200' : 'text-white/95'
              } drop-shadow-md sm:text-xl lg:text-2xl`}
            >
              🔥 Straight out of the oven, straight to you
              <span className={`mt-2 block text-base font-medium ${isDarkMode ? 'text-gray-300' : 'text-white/80'}`}>
                Fresh • Fast • Delicious
              </span>
            </p>
          </div>

          {/* Stats */}
          <div className="mb-12 mt-12 grid grid-cols-3 gap-4 sm:gap-8">
            <div
              className={`rounded-xl border ${
                isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-white/20 bg-white/10'
              } p-4 backdrop-blur-sm sm:p-6`}
            >
              <div className="text-2xl font-bold text-yellow-300 sm:text-3xl">30min</div>
              <div className={`text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-white/80'} sm:text-sm`}>
                Fast Delivery
              </div>
            </div>
            <div
              className={`rounded-xl border ${
                isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-white/20 bg-white/10'
              } p-4 backdrop-blur-sm sm:p-6`}
            >
              <div className="text-2xl font-bold text-yellow-300 sm:text-3xl">500+</div>
              <div className={`text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-white/80'} sm:text-sm`}>
                Happy Customers
              </div>
            </div>
            <div
              className={`rounded-xl border ${
                isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-white/20 bg-white/10'
              } p-4 backdrop-blur-sm sm:p-6`}
            >
              <div className="text-2xl font-bold text-yellow-300 sm:text-3xl">4.9★</div>
              <div className={`text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-white/80'} sm:text-sm`}>
                Rating
              </div>
            </div>
          </div>

          {/* Action Section */}
          <div className="mt-12">
            {!username.length > 0 ? (
              <div className="mx-auto max-w-md">
                <CreateUser />
              </div>
            ) : (
              <div className="space-y-4">
                <p
                  className={`text-xl font-medium ${isDarkMode ? 'text-gray-200' : 'text-white/90'}`}
                >
                  Welcome back, <span className="font-bold text-yellow-300">{username}</span>! 👋
                </p>
                <LinkButton to={'/menu'} type="secondary" size="lg">
                  🍕 Browse Our Menu
                </LinkButton>
              </div>
            )}
          </div>

          {/* Features */}
          <div className="mt-16 grid grid-cols-1 gap-6 text-center sm:grid-cols-3">
            <div
              className={`rounded-xl border ${
                isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-white/10 bg-white/5'
              } p-6 backdrop-blur-sm transition-all duration-300 hover:bg-white/10`}
            >
              <div className="mb-3 text-3xl">🚚</div>
              <h3 className={`mb-2 font-bold ${isDarkMode ? 'text-white' : 'text-white'}`}>Free Delivery</h3>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-white/70'}`}>Orders over 100 EGP</p>
            </div>
            <div
              className={`rounded-xl border ${
                isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-white/10 bg-white/5'
              } p-6 backdrop-blur-sm transition-all duration-300 hover:bg-white/10`}
            >
              <div className="mb-3 text-3xl">🔥</div>
              <h3 className={`mb-2 font-bold ${isDarkMode ? 'text-white' : 'text-white'}`}>Always Fresh</h3>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-white/70'}`}>Made to order</p>
            </div>
            <div
              className={`rounded-xl border ${
                isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-white/10 bg-white/5'
              } p-6 backdrop-blur-sm transition-all duration-300 hover:bg-white/10`}
            >
              <div className="mb-3 text-3xl">⭐</div>
              <h3 className={`mb-2 font-bold ${isDarkMode ? 'text-white' : 'text-white'}`}>Top Quality</h3>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-white/70'}`}>Premium ingredients</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;