import { useState } from "react";
import { Link } from "react-router-dom";
import { isApiConfigured, requestPasswordReset } from "../../services/api.js";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");
    setError("");
    setIsSubmitting(true);

    try {
      const result = await requestPasswordReset({ email });
      setMessage(result?.demo
        ? "Demo mode: no reset email was sent. Connect a backend to enable password recovery."
        : "If an account exists for this email, password reset instructions will be sent.");
    } catch (requestError) {
      setError(requestError.message || "We could not process your request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="forgot-password-page">
      <section className="forgot-password-card">
        <span className="page-eyebrow">Account recovery</span>
        <h1>Forgot your password?</h1>
        <p className="forgot-password-intro">
          Enter the email address associated with your account. If it exists,
          we’ll send instructions to reset your password.
        </p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="reset-email">Email address</label>
          <input
            id="reset-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
          />
          {error && <p className="forgot-password-error" role="alert">{error}</p>}
          {message && <p className="forgot-password-message" role="status">{message}</p>}
          {!isApiConfigured && (
            <p className="forgot-password-demo">
              Demo mode is on. No email will be sent and no account information is stored.
            </p>
          )}
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Sending request…" : "Send reset instructions"}
          </button>
        </form>
        <Link to="/signup" className="forgot-password-back">← Back to sign up</Link>
      </section>
    </main>
  );
};

export default ForgotPassword;
