
import { useContext } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext.js";
import { toast } from "react-toastify";
import "./Cart.css";

const DELIVERY_FEE = 2.99;
const money = (amount) => `$${amount.toFixed(2)}`;

const Cart = () => {
  const { food_list, cartItems, addToCart, removeFromCart, getCartSubtotal } = useContext(StoreContext);
  const items = food_list.filter((food) => cartItems[food._id] > 0);
  const subtotal = getCartSubtotal();
  const deliveryFee = items.length ? DELIVERY_FEE : 0;

  const handleAddToCart = (food) => {
    addToCart(food._id);
    toast.success(`${food.name} added to your cart`);
  };

  const handleRemoveFromCart = (food) => {
    removeFromCart(food._id);
    toast.info(`Removed one ${food.name} from your cart`);
  };

  return (
    <main className="cart-page">
      <div className="cart-heading">
        <span className="page-eyebrow">Your order</span>
        <h1>Shopping cart</h1>
        <p>Review your items before checking out.</p>
      </div>

      {items.length ? (
        <div className="cart-layout">
          <section className="cart-items" aria-label="Cart items">
            <div className="cart-table-head">
              <span>Item</span><span>Price</span><span>Quantity</span><span>Total</span>
            </div>
            {items.map((food) => (
              <article className="cart-row" key={food._id}>
                <div className="cart-item">
                  <img src={food.image} alt="" />
                  <div><h2>{food.name}</h2><span>{food.category}</span></div>
                </div>
                <span className="cart-price">{money(food.price)}</span>
                <div className="cart-quantity" aria-label={`${food.name} quantity`}>
                  <button type="button" onClick={() => handleRemoveFromCart(food)} aria-label={`Remove one ${food.name}`}>−</button>
                  <span aria-live="polite">{cartItems[food._id]}</span>
                  <button type="button" onClick={() => handleAddToCart(food)} aria-label={`Add one ${food.name}`}>+</button>
                </div>
                <strong className="cart-line-total">{money(food.price * cartItems[food._id])}</strong>
              </article>
            ))}
            <Link className="cart-continue" to="/">← Continue shopping</Link>
          </section>

          <aside className="cart-summary">
            <h2>Order summary</h2>
            <div><span>Subtotal</span><span>{money(subtotal)}</span></div>
            <div><span>Delivery</span><span>{money(deliveryFee)}</span></div>
            <div className="cart-grand-total"><strong>Total</strong><strong>{money(subtotal + deliveryFee)}</strong></div>
            <p className="cart-demo-note">Demo checkout · payment is collected on delivery</p>
            <Link to="/order" className="cart-checkout">Continue to checkout</Link>
          </aside>
        </div>
      ) : (
        <section className="cart-empty">
          <div aria-hidden="true">🛍️</div>
          <h2>Your cart is waiting for something delicious</h2>
          <p>Add a dish from our menu and it will appear here.</p>
          <Link to="/" className="cart-checkout">Explore the menu</Link>
        </section>
      )}
    </main>
  );
};

export default Cart;