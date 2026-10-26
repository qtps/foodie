import './FoodDisplay.css';
import { StoreContext } from '../../context/StoreContext.js';
import { assets } from '../../assets/assets';
import { useContext } from 'react';
import { toast } from 'react-toastify';

const FoodDisplay = ({ category }) => {
  const store = useContext(StoreContext);
  const {
    food_list: foodList,
    cartItems,
    searchTerm,
    addToCart,
    removeFromCart,
  } = store;
  const normalizedSearch = searchTerm.trim().toLowerCase();
  const displayedFoods = foodList.filter((food) => {
    const matchesCategory = category === 'All' || food.category === category;
    const matchesSearch = !normalizedSearch
      || `${food.name} ${food.description} ${food.category}`.toLowerCase().includes(normalizedSearch);
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (food) => {
    addToCart(food._id);
    toast.success(`${food.name} added to your cart`);
  };

  const handleRemoveFromCart = (food) => {
    removeFromCart(food._id);
    toast.info(`Removed one ${food.name} from your cart`);
  };

  return (
    <section className="food-display" id="food-display">
      <div className="food-display-heading">
        <span className="food-display-eyebrow">Fresh from our kitchen</span>
        <h2>{normalizedSearch ? `Search results for “${searchTerm.trim()}”` : 'Top dishes near you'}</h2>
        {normalizedSearch && (
          <p className="food-display-result-count" role="status" aria-live="polite">
            {displayedFoods.length
              ? `${displayedFoods.length} dish${displayedFoods.length === 1 ? "" : "es"} found`
              : "No dishes matched your search. Try another name or category."}
          </p>
        )}
      </div>
      {displayedFoods.length > 0 ? (
        <div className="food-display-list">
          {displayedFoods.map((food, index) => (
            <article
              className="food-card"
              key={food._id}
              style={{ animationDelay: `${Math.min(index, 8) * 60}ms` }}
            >
              <div className="food-card-media">
                <img className="food-card-image" src={food.image} alt={food.name} />
                {cartItems[food._id] ? (
                  <div className="food-quantity-control" aria-label={`${food.name} quantity`}>
                    <button
                      type="button"
                      className="food-quantity-button food-quantity-decrease"
                      aria-label={`Remove one ${food.name}`}
                      onClick={() => handleRemoveFromCart(food)}
                    >
                      −
                    </button>
                    <span className="food-quantity-value" aria-live="polite">
                      {cartItems[food._id]}
                    </span>
                    <button
                      type="button"
                      className="food-quantity-button food-quantity-increase"
                      aria-label={`Add one ${food.name}`}
                      onClick={() => handleAddToCart(food)}
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    className="food-add-button"
                    aria-label={`Add ${food.name} to cart`}
                    onClick={() => handleAddToCart(food)}
                  >
                    Add <span aria-hidden="true">+</span>
                  </button>
                )}
              </div>
              <div className="food-card-content">
                <div className="food-card-heading">
                  <h3>{food.name}</h3>
                  <img src={assets.rating_starts} alt="" />
                </div>
                <p className="food-card-description">{food.description}</p>
                <div className="food-card-footer">
                  <span className="food-card-price">${food.price.toFixed(2)}</span>
                  <span className="food-card-price-label">per serving</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <p className="food-display-empty">
          {normalizedSearch ? "Try another dish name, ingredient, or category." : "No dishes found in this category."}
        </p>
      )}
    </section>
  );
};

export default FoodDisplay;