import React from 'react';
import { formatCurrency } from '../../utils/helpers';
import { useDarkMode } from '../darkMode/hook/useDarkMode';

/**
 * OrderItem Component
 * 
 * Displays a single item in an order with quantity, name, and price.
 * Supports dark mode theming and ingredient display.
 * 
 * @param {Object} props - Component props
 * @param {Object} props.item - Order item object containing quantity, name, totalPrice, unitPrice
 * @param {boolean} props.isLoadingIngredients - Loading state for ingredients
 * @param {string[]} props.ingredients - Array of ingredient names
 */
function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice, unitPrice } = item;
  const { isDarkMode } = useDarkMode();

  return (
    <li className={`flex items-center justify-between py-3 px-4 border-b transition-colors duration-200 ${
      isDarkMode 
        ? 'border-gray-700 bg-gray-800 text-white' 
        : 'border-gray-200 bg-white text-gray-900'
    }`}>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-medium text-lg">{name}</h3>
          <span className="text-sm font-medium">
            {quantity} × {formatCurrency(unitPrice)}
          </span>
        </div>
        
        <div className="mt-2">
          {isLoadingIngredients ? (
            <p className={`text-sm italic ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              Loading ingredients...
            </p>
          ) : (
            <div className="flex flex-wrap gap-1">
              {ingredients.map((ingredient, index) => (
                <span
                  key={index}
                  className={`inline-block px-2 py-1 text-xs rounded-full ${
                    isDarkMode
                      ? 'bg-gray-700 text-gray-300'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {ingredient}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <div className="ml-4">
        <span className="text-lg font-semibold">
          {formatCurrency(totalPrice)}
        </span>
      </div>
    </li>
  );
}

export default OrderItem;