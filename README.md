# AgroFarm E-Commerce Webapp

AgroFarm is a modern, elegant, and high-performance agricultural e-commerce platform built with React and Vite. It is designed to provide a "Quick Commerce" experience (similar to Zepto, Blinkit, and Instamart) for purchasing fresh farm produce directly from farmers.

## 🚀 Features

- **Quick Commerce Interface**: A seamless, highly responsive grid layout with a fixed category sidebar for easy browsing.
- **Massive Product Catalog**: Features an extensive database of 1,300+ unique agricultural products, including:
  - Local and Imported Fruits
  - Fresh Vegetables
  - Grains and Lentils
  - Spices and Indian Spices
- **Interactive Cart Drawer**: A modern, sliding side-cart that dynamically calculates subtotals in real-time.
- **Smart Quantity Selectors**: Inline `[ - 1 + ]` buttons on every product card for rapid cart updates.
- **Farmer Upload Dashboard**: A dedicated portal for farmers to list their products. Includes an innovative mock-AI feature that auto-assigns realistic stock photos and categorizes products even if the farmer doesn't have a photo.
- **Premium Aesthetics**: Built with custom CSS utilizing glassmorphism, modern typography, and smooth micro-animations.

## 🛠️ Tech Stack

- **Frontend**: React (Context API for State Management)
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Styling**: Vanilla CSS (CSS Modules & Global Styles)

## 📦 Project Structure

```text
src/
├── components/
│   ├── cart/         # Cart Drawer logic and UI
│   ├── layout/       # Navbar and structural elements
│   └── product/      # Product cards and grids
├── context/          # Global State (CartContext)
├── data/             # Massive local JSON database (products.js)
├── pages/            # Main views (Market, FarmerDashboard)
└── App.jsx           # App routing and Provider wrapping
```

## 🏃‍♂️ How to Run Locally

1. Clone the repository.
2. Install the required dependencies:
   ```bash
   npm install
   ```
3. Start the local development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to `http://localhost:5173`.

## 📸 Screenshots

*(Add your screenshots here)*

## 📄 Legacy Code

The original PHP/SQL files have been safely backed up in the `old_legacy_code` directory for reference.

---
Built with ❤️ for a fresher, faster agricultural market.
