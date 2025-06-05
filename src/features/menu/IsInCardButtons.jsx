import { useDispatch, useSelector } from 'react-redux';
import { addItem, deleteItem, increaseItem, decreaseItem, getCard } from '../cart/cartSlice';
import Button from '../../ui/Button';
import { Minus, Plus, X } from 'lucide-react';
import { formatCurrency } from '../../utils/helpers';

function IsInCardButtons({ currentItem }) {
  const dispatch = useDispatch();
  function handleIncreaseQuantity() {
    dispatch(increaseItem(currentItem.id));
  }
  // for selecting the card and selecting the item to get its state
  const cartItems = useSelector(getCard);
  const currentItemsFind = cartItems.find((item) => item.pizzaId === currentItem.id);

  function handleDecreaseQuantity() {
    if (currentItem?.quantity === 1) {
      dispatch(deleteItem(currentItem.id));
    } else {
      dispatch(decreaseItem(currentItem.id));
    }
  }

  return (
    <div className="flex w-full items-center justify-between gap-2">
      {/* Quantity controls */}
      <div className="flex items-center gap-1">
        <Button
          onClick={handleDecreaseQuantity}
          size="icon"
          className="h-8 w-8 rounded-full bg-yellow-400 text-gray-800 hover:bg-yellow-300"
        >
          <Minus size={16} />
        </Button>
        {/* {console.log(currentItemsFind)} */}
        <span className="w-6 text-center font-semibold text-gray-800">{currentItemsFind?.quantity || 0}</span>
        <Button
          onClick={handleIncreaseQuantity}
          size="icon"
          className="h-8 w-8 rounded-full bg-yellow-500 text-white hover:bg-yellow-600"
        >
          <Plus size={16} />
        </Button>
        <Button
          onClick={() => dispatch(deleteItem(currentItem.id))}
          size="small"
          variant="destructive"
          type="order"
          className="h-8 w-8 rounded-full"
        >
          <X size={16} className="bg-red-500" />
        </Button>
      </div>

      {/* Price */}
      <span className="text-lg font-semibold text-green-600">{formatCurrency(currentItemsFind?.totalPrice || 0)}</span>
    </div>
  );
}

export default IsInCardButtons;
