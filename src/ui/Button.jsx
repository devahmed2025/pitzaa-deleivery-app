// function Button({ children, disabled, className }) {
//   return (
//     <button
//       disabled={disabled}
//       className={`${className} inline-block rounded-xl border-t-2 border-yellow-500 bg-yellow-400 p-2 text-xs font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-200 hover:bg-yellow-500 focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed`}
//     >
//       {children}
//     </button>
//   );
// }

// export default Button;

function Button({
  children,
  disabled = false,
  className = '',
  type = 'primary', // primary | secondary | order | card
  size = 'md', // sm | md | lg
  ...props
}) {
  const base =
    'inline-block rounded-xl p-2 font-semibold uppercase tracking-wide transition-colors duration-200 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';

  const typeStyles = {
    primary: 'bg-yellow-400 text-stone-800 border-t-2 border-yellow-500 hover:bg-yellow-500 focus:ring-yellow-300',
    secondary: 'bg-stone-800 text-white hover:bg-stone-700 focus:ring-stone-400',
    order: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-300',
    card: 'bg-white text-stone-800 border border-stone-300 hover:bg-stone-100 focus:ring-stone-200',
  };

  const sizeStyles = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-2',
    lg: 'text-base px-5 py-3',
  };

  return (
    <button
      disabled={disabled}
      className={`${base} ${typeStyles[type] || ''} ${sizeStyles[size] || ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;

// // Example Usages
// <Button>Default</Button>

// <Button type="secondary" size="lg">
//   Cancel
// </Button>

// <Button type="order" size="sm" disabled>
//   Place Order
// </Button>

// <Button type="card" className="w-full">
//   View Details
// </Button>
