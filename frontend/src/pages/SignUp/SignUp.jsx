import { useState } from "react";
import { Link } from "react-router-dom";
import { isApiConfigured, signUp } from "../../services/api.js";
import "./SignUp.css";

const SignUp = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");
    setError("");
    setIsSubmitting(true);
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const result = await signUp({ name, email, password });
      setMessage(result?.demo
        ? "Demo mode: the form is ready, but no account was created on a server."
        : "Your account has been created. You can now sign in.");
      form.reset();
    } catch (requestError) {
      setError(requestError.message || "We could not create your account. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="signup-page">
      <section className="signup-card">
        <span className="page-eyebrow">Join Foodie</span>
        <h1>Create your account</h1>
        <p className="signup-intro">Save your details and make your next meal even easier.</p>
        <form onSubmit={handleSubmit}>
          <label>Full name<input name="name" autoComplete="name" minLength="2" required /></label>
          <label>Email address<input name="email" type="email" autoComplete="email" required /></label>
          <div className="signup-password-field">
            <label>Password<input name="password" type="password" autoComplete="new-password" minLength="8" required /></label>
            <Link to="/forgot-password">Forgot password?</Link>
          </div>
          <p className="signup-password-hint">Use at least 8 characters.</p>
          {error && <p className="signup-error" role="alert">{error}</p>}
          {message && <p className="signup-success" role="status">{message}</p>}
          {!isApiConfigured && <p className="signup-demo-note">Demo mode is on. Account details are not stored or sent anywhere.</p>}
          <button type="submit" disabled={isSubmitting}>{isSubmitting ? "Creating account…" : "Create account"}</button>
        </form>
        <p className="signup-login-prompt">Already have an account? <span>Sign-in will be connected with the backend.</span></p>
        <Link to="/" className="signup-back">← Back to menu</Link>
      </section>
    </main>
  );
};

export default SignUp;
