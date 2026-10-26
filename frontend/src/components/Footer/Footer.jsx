import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";
import "./Footer.css";

const Footer = () => (
  <footer className="site-footer" id="contact-us">
    <div className="footer-content">
      <div className="footer-brand">
        <Link to="/" aria-label="Foodie home"><img src={assets.logo} alt="Foodie" /></Link>
        <p>Good food, made simple. Browse the menu, build your basket, and let us bring dinner to you.</p>
        <div className="footer-socials" aria-label="Social links">
          <a href="https://www.facebook.com/" aria-label="Facebook"><img src={assets.facebook_icon} alt="" /></a>
          <a href="https://www.twitter.com/" aria-label="Twitter"><img src={assets.twitter_icon} alt="" /></a>
          <a href="https://www.linkedin.com/" aria-label="LinkedIn"><img src={assets.linkedin_icon} alt="" /></a>
        </div>
      </div>
      <div className="footer-links">
        <h2>Explore</h2>
        <Link to="/">Home</Link>
        <a href="/#explore-menu">Our menu</a>
        <Link to="/cart">Your cart</Link>
        <Link to="/signup">Create account</Link>
      </div>
      <div className="footer-contact">
        <h2>Contact & demo info</h2>
        <a href="tel:+15550142024">+1 (555) 014-2024 · demo number</a>
        <a href="mailto:hello@foodie.example">hello@foodie.example</a>
        <p>123 Market Street, Sample City</p>
        <p>Daily · 10:00 AM – 10:00 PM</p>
      </div>
    </div>
    <div className="footer-bottom">
      <p>Demo storefront · Sample contact details only, not a real restaurant.</p>
      <p>© {new Date().getFullYear()} Foodie. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
