import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { initialProducts } from '../data/products';
import ProductCard from '../components/product/ProductCard';
import './Market.css';

const categories = ['All', 'Fruit', 'Vegetable', 'Grains', 'Spices'];

const Market = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = initialProducts.filter(product => {
    const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="market-container">
      {/* Quick Commerce Layout: Sidebar + Grid */}
      <div className="qc-layout">
        
        {/* Left Sidebar Categories */}
        <aside className="qc-sidebar animate-fade-in delay-100">
          <div className="qc-sidebar-header">
            <h3>Categories</h3>
          </div>
          <ul className="category-list">
            {categories.map(category => (
              <li key={category}>
                <button 
                  className={`category-btn ${activeCategory === category ? 'active' : ''}`}
                  onClick={() => setActiveCategory(category)}
                >
                  <div className="category-img-placeholder">
                    {category === 'Fruit' ? '🍎' : category === 'Vegetable' ? '🥬' : category === 'Grains' ? '🌾' : category === 'Spices' ? '🌶️' : '🛒'}
                  </div>
                  <span>{category}</span>
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Content Area */}
        <main className="qc-main-content">
          <div className="qc-top-bar glass animate-fade-in">
            <div className="search-box">
              <Search size={20} className="search-icon" />
              <input 
                type="text" 
                placeholder="Search fresh groceries..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="qc-products-header animate-fade-in">
            <h2>{activeCategory === 'All' ? 'Fresh Market' : activeCategory}</h2>
            <p className="text-muted">{filteredProducts.length} items</p>
          </div>

          <div className="products-grid">
            {filteredProducts.map((product, index) => (
              <div 
                key={product.id} 
                className="animate-fade-in"
                style={{ animationDelay: `${0.05 * index}s` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
            
            {filteredProducts.length === 0 && (
              <div className="no-products">
                <p>No products found matching your search criteria.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Market;
