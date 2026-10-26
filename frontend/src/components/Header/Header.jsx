import "./Header.css";

const Header = () => {
  const scrollToMenu = () => {
    document.getElementById("explore-menu")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="header">
      <div className="header-contents">
        <h2>Order your favourite food here</h2>
        <p>
          Choose from a diverse menu featuring a delectable array of dishes
          crafted with the finest ingredients and culinary expertise, one
          delicious meal at a time.
        </p>
        <a href="#explore-menu" onClick={scrollToMenu}>View Menu</a>
      </div>
    </div>
  );
};

export default Header;
