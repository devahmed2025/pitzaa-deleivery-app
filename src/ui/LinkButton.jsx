// // import { Link, useNavigate } from 'react-router-dom';

// // function LinkButton({ children, to }) {
// //   const navigare = useNavigate();
// //   const className = 'text-black-500 p-3 text-sm hover:bg-yellow-400 hover:font-semibold rounded-md';
// //   if (to === '-1') {
// //     return (
// //       <button className={className} onClick={() => navigare(-1)}>
// //         {children}
// //       </button>
// //     );
// //   }
// //   return (
// //     <Link to={to} className={className}>
// //       {children}
// //     </Link>
// //   );
// // }

// // export default LinkButton;

// import { Link, useNavigate } from 'react-router-dom';

// function LinkButton({
//   children,
//   to,
//   type = 'primary', // primary | secondary | order | card
//   size = 'md', // sm | md | lg
//   className = '',
//   ...props
// }) {
//   const navigate = useNavigate();

//   const base =
//     'inline-block rounded-xl p-2 font-semibold uppercase tracking-wide transition-colors duration-200 focus:ring-offset-2 disabled:cursor-not-allowed';

//   const typeStyles = {
//     primary: ' text-stone-800 border-t-2 border-yellow-500 hover:bg-yellow-500 focus:ring-yellow-300 hover:bg-red-500',
//     secondary: 'bg-stone-800 text-white hover:bg-stone-700 focus:ring-stone-400',
//     order: 'bg-green-500 text-white hover:bg-green-600 focus:ring-green-300',
//     card: 'bg-white text-stone-800 border border-stone-300 hover:bg-stone-100 focus:ring-stone-200',
//   };

//   const sizeStyles = {
//     sm: 'text-xs px-2 py-1',
//     md: 'text-sm px-3 py-2',
//     lg: 'text-base px-5 py-3',
//   };

//   const combinedClass = `${base} ${typeStyles[type] || ''} ${sizeStyles[size] || ''} ${className}`;

//   // Back button
//   if (to === '-1') {
//     return (
//       <button onClick={() => navigate(-1)} className={combinedClass} {...props}>
//         {children}
//       </button>
//     );
//   }

//   // Regular link
//   return (
//     <Link to={to} className={combinedClass} {...props}>
//       {children}
//     </Link>
//   );
// }

// export default LinkButton;


import { Link, useNavigate } from 'react-router-dom';
import { useDarkMode } from '../features/darkMode/hook/useDarkMode';

function LinkButton({
  children,
  to,
  type = 'primary', // primary | secondary | order | card | nav | logo | cart | mobile-nav | mobile-cart
  size = 'md', // sm | md | lg
  className = '',
  ...props
}) {
  const navigate = useNavigate();
  const { isDarkMode } = useDarkMode();

  const base =
    'inline-block rounded-xl font-semibold uppercase tracking-wide transition-colors duration-200 focus:ring-offset-2 focus:outline-none focus:ring-2 disabled:cursor-not-allowed';

  const getTypeStyles = () => {
    const styles = {
      primary: isDarkMode
        ? 'bg-blue-600 text-white border-2 border-blue-400 hover:bg-blue-700 hover:border-blue-300 focus:ring-blue-500'
        : 'bg-yellow-500 text-stone-800 border-2 border-yellow-400 hover:bg-yellow-600 hover:border-yellow-300 focus:ring-yellow-300',
      
      secondary: isDarkMode
        ? 'bg-gray-700 text-gray-100 hover:bg-gray-600 focus:ring-gray-500'
        : 'bg-stone-800 text-white hover:bg-stone-700 focus:ring-stone-400',
      
      order: isDarkMode
        ? 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500'
        : 'bg-green-500 text-white hover:bg-green-600 focus:ring-green-300',
      
      card: isDarkMode
        ? 'bg-gray-800 text-gray-100 border border-gray-600 hover:bg-gray-700 focus:ring-gray-500'
        : 'bg-white text-stone-800 border border-stone-300 hover:bg-stone-100 focus:ring-stone-200',
      
      // New header-specific types
      logo: isDarkMode
        ? 'text-blue-400 hover:text-blue-300 focus:ring-blue-500 normal-case'
        : 'text-yellow-600 hover:text-yellow-700 focus:ring-yellow-500 normal-case',
      
      nav: isDarkMode
        ? 'text-gray-300 hover:bg-gray-700 hover:text-blue-300 focus:ring-blue-500 normal-case'
        : 'text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 focus:ring-yellow-500 normal-case',
      
      cart: isDarkMode
        ? 'bg-blue-500 hover:bg-blue-600 focus:ring-blue-500 normal-case'
        : 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500 normal-case',
      
      'mobile-nav': isDarkMode
        ? 'text-gray-300 hover:bg-gray-700 hover:text-blue-300 focus:ring-blue-500 normal-case'
        : 'text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 focus:ring-yellow-500 normal-case',
      
      'mobile-cart': isDarkMode
        ? 'bg-blue-500 hover:bg-blue-600 focus:ring-blue-500 normal-case'
        : 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500 normal-case',
    };
    
    return styles[type] || styles.primary;
  };

  const sizeStyles = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-2',
    lg: 'text-base px-5 py-3',
  };

  // For nav and logo types, don't apply the default padding
  const shouldUseSizeStyles = !['nav', 'logo', 'mobile-nav'].includes(type);
  
  const combinedClass = `${base} ${getTypeStyles()} ${shouldUseSizeStyles ? sizeStyles[size] : ''} ${className}`;

  // Back button
  if (to === '-1') {
    return (
      <button onClick={() => navigate(-1)} className={combinedClass} {...props}>
        {children}
      </button>
    );
  }

  // Regular link
  return (
    <Link to={to} className={combinedClass} {...props}>
      {children}
    </Link>
  );
}

export default LinkButton;