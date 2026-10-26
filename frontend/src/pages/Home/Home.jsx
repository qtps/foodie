
import { useState } from 'react';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';
import Header from '../../components/Header/Header';
import { assets } from '../../assets/assets';
import './Home.css'
const Home = () => {
  const [category, setCategory] = useState('All');
  return (
    <div>
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
      <section className="home-app-section" id="app-download" aria-labelledby="home-app-title">
        <div className="home-app-copy">
          <span className="home-section-eyebrow">Foodie on the go</span>
          <h2 id="home-app-title">Your next favorite meal is a tap away</h2>
          <p>
            Browse the menu, customize your basket, and follow your order from
            wherever you are. The Foodie app is coming soon.
          </p>
          <div className="home-app-badges" aria-label="App availability">
            <span className="home-app-badge">
              <img src={assets.play_store} alt="" />
              <span><small>Coming soon to</small><strong>Google Play</strong></span>
            </span>
            <span className="home-app-badge">
              <img src={assets.app_store} alt="" />
              <span><small>Coming soon to</small><strong>App Store</strong></span>
            </span>
          </div>
          <p className="home-app-demo-note">Demo preview — these app store badges are not download links.</p>
        </div>
        <div className="home-app-preview" aria-hidden="true">
          <div className="home-app-phone">
            <span className="home-app-phone-camera" />
            <span className="home-app-phone-mark">Foodie</span>
            <span className="home-app-phone-dish">🍽️</span>
            <strong>Good food.<br />Good mood.</strong>
            <span className="home-app-phone-caption">A little joy, delivered.</span>
            <span className="home-app-phone-button">Explore the menu</span>
          </div>
        </div>
      </section>

      <section className="home-contact-section" id="contact-us" aria-labelledby="home-contact-title">
        <div className="home-contact-heading">
          <span className="home-section-eyebrow">We’re happy to help</span>
          <h2 id="home-contact-title">Get in touch</h2>
          <p>Questions about the menu or your order? Reach our demo team using the details below.</p>
        </div>
        <div className="home-contact-cards">
          <a className="home-contact-card" href="tel:+15550142024">
            <span className="home-contact-icon" aria-hidden="true">☎</span>
            <span className="home-contact-label">Call us</span>
            <strong>+1 (555) 014-2024</strong>
            <small>Sample demo number</small>
          </a>
          <a className="home-contact-card" href="mailto:hello@foodie.example">
            <span className="home-contact-icon" aria-hidden="true">✉</span>
            <span className="home-contact-label">Email us</span>
            <strong>hello@foodie.example</strong>
            <small>Sample demo email</small>
          </a>
          <div className="home-contact-card">
            <span className="home-contact-icon" aria-hidden="true">⌖</span>
            <span className="home-contact-label">Visit us</span>
            <strong>123 Market Street</strong>
            <small>Sample City · demo address</small>
          </div>
        </div>
        <p className="home-contact-demo-note">Demo storefront — contact details are examples and do not represent a real restaurant.</p>
      </section>
    </div>
  );
};

export default Home;