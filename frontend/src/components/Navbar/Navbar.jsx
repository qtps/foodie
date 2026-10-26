import "./Navbar.css";
import { assets } from "../../assets/assets";
import { useContext, useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext.js";

const Navbar = () => {
  const { food_list: foodList, getCartItemCount, searchTerm, setSearchTerm } = useContext(StoreContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchInputRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const cartItemCount = getCartItemCount();
  const normalizedSearch = searchTerm.trim().toLowerCase();
  const searchResults = normalizedSearch
    ? foodList.filter((food) => (
      `${food.name} ${food.description} ${food.category}`.toLowerCase().includes(normalizedSearch)
    )).slice(0, 5)
    : [];

  const closeMenu = () => setIsMenuOpen(false);

  const navigateToSection = (sectionId) => {
    closeMenu();
    setIsSearchOpen(false);
    navigate(`/#${sectionId}`);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.getElementById(sectionId)?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    });
  };

  useEffect(() => {
    if (isSearchOpen) searchInputRef.current?.focus();
  }, [isSearchOpen]);

  const handleSearch = (event) => {
    event.preventDefault();
    if (!normalizedSearch) {
      searchInputRef.current?.focus();
      return;
    }
    navigateToSection("food-display");
  };

  const selectSearchResult = (foodName) => {
    setSearchTerm(foodName);
    navigateToSection("food-display");
  };

  return (
    <header className={`navbar${isMenuOpen ? " navbar-menu-open" : ""}${isSearchOpen ? " navbar-search-open" : ""}`}>
      <Link to="/" aria-label="Foodie home">
        <img src={assets?.logo} alt="Foodie" className="logo" />
      </Link>

      <div className="navbar-right">
        <form
          className={`navbar-search-form${isSearchOpen ? " is-open" : ""}`}
          id="navbar-search"
          role="search"
          onSubmit={handleSearch}
        >
          <input
            ref={searchInputRef}
            type="search"
            aria-label="Search dishes"
            placeholder="Search dishes or categories..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
          {searchTerm && (
            <button type="button" className="navbar-search-clear" aria-label="Clear search" onClick={() => setSearchTerm("")}>
              ×
            </button>
          )}
          {normalizedSearch && (
            <div className="navbar-search-results" role="status" aria-live="polite">
              <p className="navbar-search-results-heading">
                {searchResults.length
                  ? `${searchResults.length === 5 ? "Top " : ""}${searchResults.length} result${searchResults.length === 1 ? "" : "s"}`
                  : "No dishes found"}
              </p>
              {searchResults.map((food) => (
                <button
                  className="navbar-search-result"
                  key={food._id}
                  type="button"
                  onClick={() => selectSearchResult(food.name)}
                >
                  <img src={food.image} alt="" />
                  <span><strong>{food.name}</strong><small>{food.category}</small></span>
                  <span className="navbar-search-result-price">${food.price.toFixed(2)}</span>
                </button>
              ))}
              {searchResults.length > 0 && (
                <button type="submit" className="navbar-search-all">
                  Show all matching dishes
                </button>
              )}
            </div>
          )}
        </form>
        <button
          type="submit"
          form="navbar-search"
          className="navbar-search-submit"
          aria-label="Search menu"
        >
          <img src={assets.search_icon} alt="" />
        </button>
        <button
          type="button"
          className="navbar-search-button"
          aria-label={isSearchOpen ? "Close search" : "Search menu"}
          aria-expanded={isSearchOpen}
          onClick={() => {
            setIsSearchOpen((open) => !open);
            closeMenu();
          }}
        >
          {isSearchOpen ? <span aria-hidden="true">×</span> : <img src={assets.search_icon} alt="" />}
        </button>
        <Link to="/cart" className="navbar-search-icon" aria-label={`Cart with ${cartItemCount} items`}>
          <img src={assets?.basket_icon} alt="" />
          {cartItemCount > 0 && <span className="dot">{cartItemCount}</span>}
        </Link>
        <Link to="/signup" className="navbar-signup" onClick={closeMenu}>sign up</Link>
        <button
          type="button"
          className={`navbar-hamburger${isMenuOpen ? " is-open" : ""}`}
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMenuOpen}
          aria-controls="primary-navigation"
          onClick={() => {
            setIsMenuOpen((open) => !open);
            setIsSearchOpen(false);
          }}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <nav className={`navbar-menu${isMenuOpen ? " is-open" : ""}`} id="primary-navigation" aria-label="Main navigation">
        <ul>
          <li><NavLink to="/" end className={({ isActive }) => isActive && !location.hash ? "active" : ""} onClick={closeMenu}>home</NavLink></li>
          <li><Link className={location.hash === "#explore-menu" ? "active" : ""} to="/#explore-menu" onClick={(event) => { event.preventDefault(); navigateToSection("explore-menu"); }}>menu</Link></li>
          <li><Link className={location.hash === "#app-download" ? "active" : ""} to="/#app-download" onClick={(event) => { event.preventDefault(); navigateToSection("app-download"); }}>mobile-app</Link></li>
          <li><Link className={location.hash === "#contact-us" ? "active" : ""} to="/#contact-us" onClick={(event) => { event.preventDefault(); navigateToSection("contact-us"); }}>contact us</Link></li>
        </ul>
      </nav>

    </header>
  );
};

export default Navbar;
