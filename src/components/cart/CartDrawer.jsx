import React from 'react';
import { X, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import './CartDrawer.css';

const CartDrawer = () => {
  const { cartItems, isCartOpen, setIsCartOpen, updateQuantity, getCartTotal, clearCart } = useCart();

  if (!isCartOpen) return null;

  return (
    <>
      <div className="cart-overlay animate-fade-in" onClick={() => setIsCartOpen(false)}></div>
      <div className="cart-drawer open">
        <div className="cart-header">
          <div className="cart-title">
            <ShoppingBag size={24} className="text-primary" />
            <h2>Your Cart</h2>
          </div>
          <button className="close-cart-btn" onClick={() => setIsCartOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <div className="cart-items">
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <ShoppingBag size={48} className="empty-cart-icon" />
              <h3>Your cart is empty</h3>
              <p>Looks like you haven't added any fresh produce yet.</p>
              <button className="btn btn-primary mt-4" onClick={() => setIsCartOpen(false)}>
                Start Shopping
              </button>
            </div>
          ) : (
            cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-img-container">
                  <img src={item.image} alt={item.name} className="cart-item-img" />
                </div>
                <div className="cart-item-details">
                  <h4 className="cart-item-name">{item.name}</h4>
                  <p className="cart-item-price">₹{item.price}/kg</p>
                  
                  <div className="cart-item-actions">
                    <div className="cart-quantity-selector">
                      <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                    </div>
                    <span className="cart-item-total">₹{item.price * item.quantity}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="cart-summary">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{getCartTotal()}</span>
              </div>
              <div className="summary-row">
                <span>Delivery Fee</span>
                <span>₹40</span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span>₹{getCartTotal() + 40}</span>
              </div>
            </div>
            
            <button className="btn btn-primary w-100 checkout-btn">
              <span>Checkout</span>
              <ArrowRight size={20} />
            </button>
            
            <button className="btn btn-outline w-100 clear-btn" onClick={clearCart}>
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
