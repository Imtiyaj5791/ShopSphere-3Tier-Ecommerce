const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || "shopzone",
  user: process.env.DB_USER || "shopzone_user",
  password: process.env.DB_PASSWORD || "shopzone123",
});

const products = [
  {
    name: "Wireless Headphones",
    category: "Electronics",
    price: 2499,
    old_price: 3499,
    rating: 4.5,
    emoji: "🎧",
    description: "Premium wireless headphones with clear sound and deep bass."
  },
  {
    name: "Smart Watch Pro",
    category: "Electronics",
    price: 3999,
    old_price: 5499,
    rating: 4.6,
    emoji: "⌚",
    description: "Smart fitness watch with health tracking and notifications."
  },
  {
    name: "Mechanical Keyboard",
    category: "Electronics",
    price: 2999,
    old_price: 3999,
    rating: 4.7,
    emoji: "⌨️",
    description: "RGB mechanical keyboard designed for work and gaming."
  },
  {
    name: "Wireless Mouse",
    category: "Electronics",
    price: 1299,
    old_price: 1799,
    rating: 4.4,
    emoji: "🖱️",
    description: "Ergonomic wireless mouse with precise tracking."
  },
  {
    name: "Running Shoes",
    category: "Fashion",
    price: 2199,
    old_price: 2999,
    rating: 4.5,
    emoji: "👟",
    description: "Lightweight running shoes for everyday comfort."
  },
  {
    name: "Premium Backpack",
    category: "Fashion",
    price: 1799,
    old_price: 2499,
    rating: 4.6,
    emoji: "🎒",
    description: "Durable backpack with laptop compartment."
  },
  {
    name: "Classic Sunglasses",
    category: "Fashion",
    price: 999,
    old_price: 1499,
    rating: 4.3,
    emoji: "🕶️",
    description: "Classic sunglasses with stylish UV protection."
  },
  {
    name: "Cotton Hoodie",
    category: "Fashion",
    price: 1499,
    old_price: 1999,
    rating: 4.4,
    emoji: "👕",
    description: "Comfortable premium cotton hoodie."
  },
  {
    name: "Coffee Maker",
    category: "Home",
    price: 3299,
    old_price: 4499,
    rating: 4.5,
    emoji: "☕",
    description: "Automatic coffee maker for fresh coffee at home."
  },
  {
    name: "Table Lamp",
    category: "Home",
    price: 899,
    old_price: 1299,
    rating: 4.2,
    emoji: "💡",
    description: "Modern table lamp suitable for home and office."
  },
  {
    name: "Air Fryer",
    category: "Home",
    price: 4499,
    old_price: 5999,
    rating: 4.7,
    emoji: "🍳",
    description: "Healthy cooking with less oil and easy controls."
  },
  {
    name: "Smart LED TV",
    category: "Electronics",
    price: 24999,
    old_price: 32999,
    rating: 4.8,
    emoji: "📺",
    description: "4K smart LED TV with streaming applications."
  }
];

async function initializeDatabase() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      name VARCHAR(150) NOT NULL,
      category VARCHAR(100) NOT NULL,
      price DECIMAL(10,2) NOT NULL,
      old_price DECIMAL(10,2),
      rating DECIMAL(2,1),
      emoji VARCHAR(20),
      description TEXT
    );

    CREATE TABLE IF NOT EXISTS orders (
      id SERIAL PRIMARY KEY,
      customer_name VARCHAR(150) NOT NULL,
      customer_email VARCHAR(150) NOT NULL,
      items JSONB NOT NULL,
      total DECIMAL(10,2) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  const result = await pool.query("SELECT COUNT(*) FROM products");

  if (Number(result.rows[0].count) === 0) {
    for (const product of products) {
      await pool.query(
        `INSERT INTO products
        (name, category, price, old_price, rating, emoji, description)
        VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [
          product.name,
          product.category,
          product.price,
          product.old_price,
          product.rating,
          product.emoji,
          product.description
        ]
      );
    }

    console.log("12 products inserted into PostgreSQL");
  }
}

app.get("/", (req, res) => {
  res.json({
    message: "ShopZone Backend API is running",
    status: "success",
    database: "PostgreSQL"
  });
});

app.get("/api/products", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM products ORDER BY id"
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch products"
    });
  }
});

app.get("/api/products/:id", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM products WHERE id = $1",
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch product"
    });
  }
});

app.post("/api/orders", async (req, res) => {
  try {
    const { customer, items } = req.body;

    if (!customer?.name || !customer?.email || !items?.length) {
      return res.status(400).json({
        message: "Customer and items are required"
      });
    }

    const total = items.reduce(
      (sum, item) => sum + Number(item.price),
      0
    );

    const result = await pool.query(
      `INSERT INTO orders
       (customer_name, customer_email, items, total)
       VALUES ($1, $2, $3, $4)
       RETURNING id, total, created_at`,
      [
        customer.name,
        customer.email,
        JSON.stringify(items),
        total
      ]
    );

    res.status(201).json({
      message: "Order created successfully",
      orderId: result.rows[0].id,
      total: result.rows[0].total,
      status: "confirmed",
      createdAt: result.rows[0].created_at
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to create order"
    });
  }
});

app.get("/api/health", async (req, res) => {
  try {
    await pool.query("SELECT 1");

    res.json({
      status: "healthy",
      database: "PostgreSQL",
      message: "Backend and database are connected"
    });
  } catch (error) {
    res.status(500).json({
      status: "unhealthy",
      database: "PostgreSQL",
      message: "Database connection failed"
    });
  }
});

initializeDatabase()
  .then(() => {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`ShopZone backend running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database initialization failed:", error);
    process.exit(1);
  });
