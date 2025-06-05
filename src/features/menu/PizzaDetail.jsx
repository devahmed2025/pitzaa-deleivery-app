import { useLoaderData, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { formatCurrency } from '../../utils/helpers';
import { getMenu } from '../../services/apiRestaurant';
import {
  addItem,
  deleteItem,
  increaseItem,
  decreaseItem,
  clearCart,
  getTotalCartItem,
  getTotalCartPrice,
  isInCart,
} from '../cart/cartSlice';
import Button from '../../ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import IsInCardButtons from './IsInCardButtons';
import { useDarkMode } from '../darkMode/hook/useDarkMode';

// Mock comments data - in real app this would come from API
const mockComments = [
  {
    id: 1,
    user: 'Ahmed Mohamed ',
    rating: 5,
    comment: 'Absolutely delicious! The perfect combination of crispy crust and fresh toppings.',
    date: '2024-05-15',
    avatar: 'https://i.pravatar.cc/40?img=1',
  },
  // {
  //   id: 2,
  //   user: 'Mike Chen',
  //   rating: 4,
  //   comment: 'Great pizza, loved the sauce. Could use a bit more cheese though.',
  //   date: '2024-05-12',
  //   avatar: 'https://i.pravatar.cc/40?img=2',
  // },
  // {
  //   id: 3,
  //   user: 'Emma Wilson',
  //   rating: 5,
  //   comment: "Best pizza I've had in years! Will definitely order again.",
  //   date: '2024-05-10',
  //   avatar: 'https://i.pravatar.cc/40?img=3',
  // },
];

function PizzaDetail() {
  const pizza = useLoaderData();
  const [comments, setComments] = useState(mockComments);
  const [newComment, setNewComment] = useState('');
  const [userRating, setUserRating] = useState(0);
  const [userName, setUserName] = useState('');
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);
  const { isDarkMode } = useDarkMode();

  const { name, imageUrl, ingredients, unitPrice, id } = pizza;
  // console.log(pizza);
  const [isLoading, setIsLoading] = useState(false);
  // getting the number of items and quantitiy from the cart slice

  const ItemsOnCartQuantity = useSelector(getTotalCartPrice) || [];
  const ItemsOnCartPrice = useSelector(getTotalCartItem) || [];

  const dispatch = useDispatch();
  const isInCartItem = useSelector(isInCart(id));
  // console.log(isInCartItem);

  // Calculate average rating
  const averageRating =
    comments.length > 0 ? (comments.reduce((sum, comment) => sum + comment.rating, 0) / comments.length).toFixed(1) : 0;

  // Rating emojis like Facebook
  const ratingEmojis = {
    1: { emoji: '😢', label: 'Terrible', color: isDarkMode ? 'text-red-400' : 'text-red-500' },
    2: { emoji: '😞', label: 'Bad', color: isDarkMode ? 'text-orange-400' : 'text-orange-500' },
    3: { emoji: '😐', label: 'Okay', color: isDarkMode ? 'text-yellow-400' : 'text-yellow-500' },
    4: { emoji: '😊', label: 'Good', color: isDarkMode ? 'text-blue-400' : 'text-blue-500' },
    5: { emoji: '😍', label: 'Amazing', color: isDarkMode ? 'text-green-400' : 'text-green-500' },
  };

  async function handleAddToCart() {
    setIsLoading(true);
    try {
      const payload = {
        pizzaId: id,
        name,
        unitPrice,
        quantity: 1,
        totalPrice: unitPrice,
      };
      dispatch(addItem(payload));
    } catch (error) {
      console.error('Error adding item to cart:', error);
    } finally {
      setIsLoading(false);
    }
  }
  function handleSubmitComment() {
    if (!newComment.trim() || !userName.trim() || userRating === 0) return;

    const comment = {
      id: Date.now(),
      user: userName,
      rating: userRating,
      comment: newComment,
      date: new Date().toISOString().split('T')[0],
      avatar: `https://i.pravatar.cc/40?img=${Math.floor(Math.random() * 20) + 1}`,
    };

    setComments((prev) => [comment, ...prev]);
    setNewComment('');
    setUserName('');
    setUserRating(0);
    setShowCommentForm(false);
  }

  function renderStars(rating, interactive = false) {
    return Array.from({ length: 5 }, (_, i) => (
      <button
        key={i}
        type="button"
        className={`text-2xl transition-all duration-200 ${
          interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'
        } ${i < (interactive ? hoverRating || userRating : rating) ? 'text-yellow-400' : isDarkMode ? 'text-gray-600' : 'text-gray-300'}`}
        onClick={interactive ? () => setUserRating(i + 1) : undefined}
        onMouseEnter={interactive ? () => setHoverRating(i + 1) : undefined}
        onMouseLeave={interactive ? () => setHoverRating(0) : undefined}
        disabled={!interactive}
      >
        ⭐
      </button>
    ));
  }

  return (
    <div
      className={`min-h-screen py-8 transition-colors duration-300 ${
        isDarkMode
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
          : 'bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50'
      }`}
    >
      <div className="mx-auto max-w-6xl px-4">
        {/* Pizza Details Section */}
        <div className="mb-12 flex flex-col items-center justify-center gap-8 lg:flex-row lg:gap-16">
          <div className="group relative">
            <div
              className={`absolute -inset-4 rounded-full opacity-75 blur transition duration-1000 group-hover:opacity-100 ${
                isDarkMode
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600'
                  : 'bg-gradient-to-r from-yellow-400 to-orange-500'
              }`}
            ></div>
            <div className={`relative rounded-3xl p-8 shadow-2xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <img
                src={imageUrl}
                alt={`Pizza ${name}`}
                loading="lazy"
                className="h-80 w-80 rounded-full object-cover shadow-lg transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>

          <div className="flex max-w-lg flex-col items-center text-center lg:items-start lg:text-left">
            <h1
              className={`mb-4 text-5xl font-extrabold tracking-tight ${
                isDarkMode ? 'text-gray-100' : 'text-gray-800'
              }`}
            >
              {name}
            </h1>

            {/* Rating Display */}
            <div className="mb-4 flex items-center gap-4">
              <div className="flex items-center gap-1">
                {renderStars(Math.round(averageRating))}
                <span className={`ml-2 text-lg font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {averageRating}
                </span>
              </div>
              <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>({comments.length} reviews)</span>
            </div>

            <div className="mb-6 flex flex-wrap justify-center gap-2 lg:justify-start">
              {ingredients.map((ing, i) => (
                <span
                  key={i}
                  className={`rounded-full px-4 py-2 text-sm font-medium shadow-sm ${
                    isDarkMode ? 'bg-blue-900 text-blue-200' : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {ing}
                </span>
              ))}
            </div>

            <p className={`mb-6 text-3xl font-bold ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
              {formatCurrency(unitPrice)}
            </p>

            <div className="flex gap-4">
              {!isInCartItem ? (
                <Button
                  onClick={handleAddToCart}
                  className={`px-8 py-3 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 ${
                    isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-yellow-500 hover:bg-yellow-600'
                  }`}
                >
                  ADD TO CART
                </Button>
              ) : (
                <IsInCardButtons currentItem={pizza} />
              )}

              <Button
                onClick={() => setShowCommentForm(!showCommentForm)}
                className={`px-6 py-3 text-lg font-semibold text-white shadow-lg transition-all duration-300 ${
                  isDarkMode ? 'bg-purple-600 hover:bg-purple-700' : 'bg-blue-500 hover:bg-blue-600'
                }`}
              >
                Write Review
              </Button>
            </div>
          </div>
        </div>

        {/* Comment Form */}
        {showCommentForm && (
          <div className={`mb-8 rounded-2xl p-6 shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h3 className={`mb-4 text-2xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
              Share Your Experience
            </h3>
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <input
                  type="text"
                  placeholder="Your name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className={`rounded-lg border px-4 py-3 transition-colors focus:outline-none focus:ring-2 ${
                    isDarkMode
                      ? 'border-gray-600 bg-gray-700 text-gray-100 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500/20'
                      : 'border-gray-300 bg-white text-gray-900 focus:border-yellow-500 focus:ring-yellow-200'
                  }`}
                />
              </div>

              {/* Rating Selection with Emojis */}
              <div>
                <p className={`mb-3 font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  How would you rate this pizza?
                </p>
                <div className="mb-4 flex gap-2">
                  {Object.entries(ratingEmojis).map(([rating, data]) => (
                    <button
                      key={rating}
                      type="button"
                      onClick={() => setUserRating(Number(rating))}
                      className={`flex flex-col items-center rounded-lg border-2 p-3 transition-all duration-200 hover:scale-105 ${
                        userRating === Number(rating)
                          ? isDarkMode
                            ? 'border-blue-500 bg-blue-900/30 shadow-md'
                            : 'border-yellow-500 bg-yellow-50 shadow-md'
                          : isDarkMode
                            ? 'border-gray-600 hover:border-gray-500'
                            : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <span className="text-2xl">{data.emoji}</span>
                      <span className={`text-xs font-medium ${data.color}`}>{data.label}</span>
                    </button>
                  ))}
                </div>

                {/* Star Rating */}
                <div className="flex items-center gap-2">
                  <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Or rate with stars:
                  </span>
                  <div className="flex">{renderStars(userRating, true)}</div>
                  {userRating > 0 && (
                    <span className={`ml-2 text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {userRating}/5 stars
                    </span>
                  )}
                </div>
              </div>

              <textarea
                placeholder="Tell us about your experience with this pizza..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                rows={4}
                className={`w-full rounded-lg border px-4 py-3 transition-colors focus:outline-none focus:ring-2 ${
                  isDarkMode
                    ? 'border-gray-600 bg-gray-700 text-gray-100 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500/20'
                    : 'border-gray-300 bg-white text-gray-900 focus:border-yellow-500 focus:ring-yellow-200'
                }`}
              />

              <div className="flex gap-3">
                <Button
                  onClick={handleSubmitComment}
                  className={`px-6 py-2 text-white transition-colors ${
                    isDarkMode ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600'
                  }`}
                >
                  Submit Review
                </Button>
                <Button
                  onClick={() => setShowCommentForm(false)}
                  className={`px-6 py-2 text-white transition-colors ${
                    isDarkMode ? 'bg-gray-600 hover:bg-gray-700' : 'bg-gray-500 hover:bg-gray-600'
                  }`}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Comments Section */}
        <div className={`rounded-2xl p-6 shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h3 className={`mb-6 text-2xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
            Customer Reviews ({comments.length})
          </h3>

          <div className="space-y-4">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className={`rounded-lg border p-4 transition-colors ${
                  isDarkMode ? 'border-gray-700 hover:bg-gray-700/50' : 'border-gray-100 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-start gap-4">
                  <img src={comment.avatar} alt={comment.user} className="h-10 w-10 rounded-full object-cover" />

                  <div className="flex-1">
                    <div className="mb-2 flex items-center justify-between">
                      <div>
                        <h4 className={`font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                          {comment.user}
                        </h4>
                        <div className="flex items-center gap-2">
                          <div className="flex">{renderStars(comment.rating)}</div>
                          <span className="flex items-center gap-1">
                            <span className="text-xl">{ratingEmojis[comment.rating].emoji}</span>
                            <span className={`text-sm font-medium ${ratingEmojis[comment.rating].color}`}>
                              {ratingEmojis[comment.rating].label}
                            </span>
                          </span>
                        </div>
                      </div>
                      <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {comment.date}
                      </span>
                    </div>

                    <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>{comment.comment}</p>

                    {/* Like/Reply buttons */}
                    <div className="mt-3 flex items-center gap-4 text-sm">
                      <button
                        className={`flex items-center gap-1 transition-colors ${
                          isDarkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-500 hover:text-blue-600'
                        }`}
                      >
                        <span>👍</span>
                        <span>Helpful</span>
                      </button>
                      <button
                        className={`transition-colors ${
                          isDarkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-500 hover:text-blue-600'
                        }`}
                      >
                        Reply
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Comments */}
          <div className="mt-6 text-center">
            <Button
              className={`transition-colors ${
                isDarkMode
                  ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Load More Reviews
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function loader({ params }) {
  const pizzas = await getMenu();
  const pizza = pizzas.find((pizza) => pizza.id === Number(params.pizzaId));
  if (!pizza) throw Error('Pizza not found!');
  return pizza;
}

export default PizzaDetail;
