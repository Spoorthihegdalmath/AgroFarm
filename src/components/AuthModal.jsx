import React, { useState } from 'react';
import { X, Mail, Lock, User, Phone, MapPin } from 'lucide-react';
import './AuthModal.css';

const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  
  if (!isOpen) return null;

  return (
    <div className="modal-overlay animate-fade-in">
      <div className="modal-content glass">
        <button className="close-btn" onClick={onClose}>
          <X size={24} />
        </button>
        
        <div className="modal-header">
          <h2>{isLogin ? 'Welcome Back' : 'Join AgroCulture'}</h2>
          <p className="text-muted">
            {isLogin 
              ? 'Login to access your market dashboard' 
              : 'Create an account to start trading'}
          </p>
        </div>

        <form className="auth-form" onSubmit={(e) => { e.preventDefault(); onClose(); }}>
          {!isLogin && (
            <div className="input-group animate-fade-in">
              <User size={20} className="input-icon" />
              <input type="text" placeholder="Full Name" required />
            </div>
          )}

          <div className="input-group">
            <Mail size={20} className="input-icon" />
            <input type="email" placeholder="Email Address" required />
          </div>

          {!isLogin && (
            <>
              <div className="input-group animate-fade-in delay-100">
                <Phone size={20} className="input-icon" />
                <input type="tel" placeholder="Mobile Number" required />
              </div>
              <div className="input-group animate-fade-in delay-200">
                <MapPin size={20} className="input-icon" />
                <input type="text" placeholder="Delivery Address" required />
              </div>
              
              <div className="role-selector animate-fade-in delay-300">
                <p>I am a:</p>
                <div className="radio-group">
                  <label className="radio-label">
                    <input type="radio" name="role" value="buyer" defaultChecked />
                    <span>Buyer</span>
                  </label>
                  <label className="radio-label">
                    <input type="radio" name="role" value="farmer" />
                    <span>Farmer</span>
                  </label>
                </div>
              </div>
            </>
          )}

          <div className="input-group">
            <Lock size={20} className="input-icon" />
            <input type="password" placeholder="Password" required />
          </div>

          <button type="submit" className="btn btn-primary w-100 auth-submit">
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <div className="modal-footer">
          <p>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button 
              className="toggle-auth-btn"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? 'Sign Up' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
