import { useEffect, useMemo, useState } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        return response.json();
      })
      .then((data) => {
        const formattedProducts = data.map((product) => ({
          ...product,
          price: Number(product.price),
          oldPrice: Number(product.old_price),
          rating: Number(product.rating),
        }));

        setProducts(formattedProducts);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Unable to load products from backend.");
        setLoading(false);
      });
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const categoryMatch =
        category === "All" || product.category === category;

      const searchMatch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      return categoryMatch && searchMatch;
    });
  }, [products, category, search]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const cartTotal = cart.reduce((total, item) => total + item.price, 0);

  return (
    <div className="app">
      <header className="header">
        <div className="logo">Shop<span>Zone</span></div>

        <div className="search">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button>🔍</button>
        </div>

        <div className="cart">
          🛒 Cart <strong>{cart.length}</strong>
        </div>
      </header>

      <nav className="nav">
        {["All", "Electronics", "Fashion", "Home"].map((item) => (
          <button
            key={item}
            className={category === item ? "active" : ""}
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </nav>

      <section className="hero">
        <div>
          <p className="offer">MEGA SALE • UP TO 50% OFF</p>
          <h1>Everything You Need.<br />All in One Place.</h1>
          <p>
            Discover trending electronics, fashion and home essentials
            at amazing prices.
          </p>
          <button
            className="shop-button"
            onClick={() => document.getElementById("products").scrollIntoView()}
          >
            Shop Now →
          </button>
        </div>

        <div className="hero-icon">🛍️</div>
      </section>

      <section className="features">
        <div>🚚 <strong>Free Delivery</strong><small>On orders above ₹999</small></div>
        <div>🔒 <strong>Secure Payment</strong><small>100% secure checkout</small></div>
        <div>↩️ <strong>Easy Returns</strong><small>7-day return policy</small></div>
        <div>⭐ <strong>Top Rated</strong><small>Trusted by customers</small></div>
      </section>

      <main id="products" className="products-section">
        <div className="section-title">
          <div>
            <p>OUR COLLECTION</p>
            <h2>Trending Products</h2>
          </div>
          <span>{filteredProducts.length} products</span>
        </div>

        {loading && (
          <div className="empty">Loading products...</div>
        )}

        {error && (
          <div className="empty">{error}</div>
        )}

        {!loading && !error && (
          <>
            <div className="product-grid">
              {filteredProducts.map((product) => (
                <article className="product-card" key={product.id}>
                  <div className="product-image">
                    <span className="discount">SALE</span>
                    <span className="product-emoji">{product.emoji}</span>
                  </div>

                  <div className="product-info">
                    <small>{product.category}</small>
                    <h3>{product.name}</h3>
                    <div className="rating">★ {product.rating}</div>

                    <div className="price">
                      <strong>
                        ₹{product.price.toLocaleString("en-IN")}
                      </strong>
                      <del>
                        ₹{product.oldPrice.toLocaleString("en-IN")}
                      </del>
                    </div>

                    <button
                      className="add-button"
                      onClick={() => addToCart(product)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </article>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="empty">No products found.</div>
            )}
          </>
        )}
      </main>

      {cart.length > 0 && (
        <div className="cart-bar">
          <span>🛒 {cart.length} item(s) in cart</span>
          <strong>Total: ₹{cartTotal.toLocaleString("en-IN")}</strong>
          <button>Checkout →</button>
        </div>
      )}

      <footer className="footer">
        <div>
          <div className="logo">Shop<span>Zone</span></div>
          <p>Your one-stop online store for everyday essentials.</p>
        </div>

        <div>
          <h4>Shop</h4>
          <p>Electronics</p>
          <p>Fashion</p>
          <p>Home</p>
        </div>

        <div>
          <h4>Customer Service</h4>
          <p>Contact Us</p>
          <p>Shipping</p>
          <p>Returns</p>
        </div>

        <div>
          <h4>Follow Us</h4>
          <p>Facebook • Instagram • Twitter</p>
        </div>
      </footer>

      <div className="copyright">
        © 2026 ShopZone. All rights reserved.
      </div>
    </div>
  );
}

export default App;
