import './ExploreMenu.css';
import { menu_list } from '../../assets/assets';

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className="explore-menu" id="explore-menu">
      <h2>Explore Our Menu</h2>
      <p>Choose from a diverse menu featuring a variety of delicious dishes. Our mission is to provide the best dining experience for our customers.</p>
      <div className="explore-menu-list">
        {menu_list.map((item) => (
          <button
            type="button"
            key={item.menu_name}
            className={`explore-menu-item${category === item.menu_name ? ' active' : ''}`}
            aria-pressed={category === item.menu_name}
            onClick={() => setCategory((current) => (
              current === item.menu_name ? 'All' : item.menu_name
            ))}
          >
            <img src={item.menu_image} alt="" />
            <p>{item.menu_name}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ExploreMenu;