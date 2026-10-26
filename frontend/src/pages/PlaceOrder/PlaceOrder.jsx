
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext.js";
import { isApiConfigured, placeOrder } from "../../services/api.js";
import "./PlaceOrder.css";

const DELIVERY_FEE = 2.99;
const money = (amount) => `$${amount.toFixed(2)}`;

const PlaceOrder = () => {
  const { food_list, cartItems, getCartSubtotal, clearCart } = useContext(StoreContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const subtotal = getCartSubtotal();
  const items = food_list.filter((food) => cartItems[food._id] > 0);
  const total = subtotal + (items.length ? DELIVERY_FEE : 0);

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSuccess("");
    const formData = new FormData(event.currentTarget);
    const customer = Object.fromEntries(formData.entries());

    try {
      const result = await placeOrder({
        customer,
        items: items.map(({ _id, name, price }) => ({
          productId: _id,
          name,
          quantity: cartItems[_id],
          unitPrice: price,
        })),
        subtotal,
        deliveryFee: items.length ? DELIVERY_FEE : 0,
        total,
        paymentMethod: "cash_on_delivery",
      });
      clearCart();
      setSuccess(result?.demo
        ? "Demo order placed. No order was sent to a server."
        : `Order received${result?.orderId ? ` (${result.orderId})` : ""}.`);
    } catch (requestError) {
      setError(requestError.message || "We could not place your order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!items.length && !success) {
    return (
      <main className="checkout-page checkout-empty">
        <h1>Your cart is empty</h1>
        <p>Add something delicious before placing an order.</p>
        <Link to="/" className="checkout-submit">Browse the menu</Link>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      {success ? (
        <section className="checkout-success" role="status">
          <span aria-hidden="true">✓</span>
          <h1>Thank you!</h1>
          <p>{success}</p>
          <Link to="/" className="checkout-submit">Back to menu</Link>
        </section>
      ) : (
        <>
      <header className="checkout-heading">
        <span className="page-eyebrow">Almost there</span>
        <h1>Delivery details</h1>
        <p>Tell us where to bring your order.</p>
      </header>
      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <h2>Contact and address</h2>
          <div className="checkout-fields">
            <label>First name<input name="firstName" autoComplete="given-name" required /></label>
            <label>Last name<input name="lastName" autoComplete="family-name" required /></label>
            <label className="checkout-field-wide">Email address<input name="email" type="email" autoComplete="email" required /></label>
            <label className="checkout-field-wide">Street address<input name="address" autoComplete="street-address" required /></label>
            <label>City<input name="city" autoComplete="address-level2" required /></label>
            <label>Postal code<input name="postalCode" autoComplete="postal-code" required /></label>
            <label className="checkout-field-wide">Phone number<input name="phone" type="tel" autoComplete="tel" required /></label>
            <label className="checkout-field-wide">Delivery notes <span className="checkout-optional">(optional)</span><textarea name="notes" rows="3" placeholder="Apartment, access instructions, or other details" /></label>
          </div>
          <div className="checkout-payment">
            <h3>Payment method</h3>
            <p>Cash on delivery <span>Demo option</span></p>
          </div>
          {error && <p className="checkout-error" role="alert">{error}</p>}
          {!isApiConfigured && <p className="checkout-demo-notice">Demo mode: submit to preview the flow. This order will not be sent to a server.</p>}
          <button className="checkout-submit" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Placing order…" : `Place order · ${money(total)}`}
          </button>
        </form>

        <aside className="checkout-summary">
          <h2>Your order</h2>
          {items.map((food) => (
            <div className="checkout-summary-item" key={food._id}>
              <span>{food.name} <small>× {cartItems[food._id]}</small></span>
              <span>{money(food.price * cartItems[food._id])}</span>
            </div>
          ))}
          <div><span>Subtotal</span><span>{money(subtotal)}</span></div>
          <div><span>Delivery</span><span>{money(DELIVERY_FEE)}</span></div>
          <div className="checkout-total"><strong>Total</strong><strong>{money(total)}</strong></div>
          <Link to="/cart" className="checkout-edit">Edit cart</Link>
        </aside>
      </div>
        </>
      )}
    </main>
  );
};

export default PlaceOrder;