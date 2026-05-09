import React from 'react';
import { Star, Plus, Minus } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart, updateQuantity, getProductQuantity } = useCart();
  const quantity = getProductQuantity(product.id);

  return (
    <div className="product-card glass">
      <div className="product-image-container">
        <img src={product.image} alt={product.name} className="product-image" />
        <span className="product-category-badge">{product.category}</span>
      </div>
      
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-desc">{product.description}</p>
        
        <div className="product-meta">
          <div className="product-rating">
            <Star size={16} className="star-icon" />
            <span>{product.rating}</span>
          </div>
          <span className="product-price">₹{product.price}/kg</span>
        </div>
        
        <div className="product-actions">
          {quantity === 0 ? (
            <button 
              className="btn btn-primary add-btn w-100"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          ) : (
            <div className="quantity-selector">
              <button 
                className="qty-btn"
                onClick={() => updateQuantity(product.id, -1)}
              >
                <Minus size={16} />
              </button>
              <span className="qty-display">{quantity}</span>
              <button 
                className="qty-btn"
                onClick={() => updateQuantity(product.id, 1)}
              >
                <Plus size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
