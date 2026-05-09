import React, { useState, useRef } from 'react';
import { UploadCloud, Image as ImageIcon, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { getPlaceholderImage } from '../data/products';
import './FarmerDashboard.css';

const FarmerDashboard = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }
    
    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => setSelectedImage(e.target.result);
    reader.readAsDataURL(file);

    // Simulate AI Processing
    simulateAIAnalysis(file);
  };

  const simulateAIAnalysis = (file) => {
    setIsAnalyzing(true);
    setAnalysisResult(null);

    setTimeout(() => {
      // Mock logic based on some random factor or name
      const categories = ['Fruit', 'Vegetable', 'Grains'];
      const randomCat = categories[Math.floor(Math.random() * categories.length)];
      
      setAnalysisResult({
        category: randomCat,
        confidence: (Math.random() * 15 + 85).toFixed(1), // 85-100%
        suggestedName: `Farm Fresh ${randomCat}`
      });
      setIsAnalyzing(false);
    }, 2500);
  };

  const handleSkipUpload = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      const categories = ['Fruit', 'Vegetable', 'Grains'];
      const randomCat = categories[Math.floor(Math.random() * categories.length)];
      
      // Use realistic stock photo fallback
      setSelectedImage(getPlaceholderImage(randomCat));
      
      setAnalysisResult({
        category: randomCat,
        confidence: 100,
        suggestedName: `Premium ${randomCat}`
      });
      setIsAnalyzing(false);
    }, 1500);
  };

  return (
    <div className="farmer-dashboard container">
      <div className="dashboard-header animate-fade-in">
        <h1>Farmer Upload Portal</h1>
        <p className="text-muted">Upload a photo of your product, and our AI will automatically classify it.</p>
      </div>

      <div className="upload-container">
        <div className="upload-section animate-fade-in delay-100">
          <div 
            className={`dropzone glass ${isDragging ? 'dragging' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current.click()}
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileInput} 
              accept="image/*" 
              style={{ display: 'none' }} 
            />
            
            {selectedImage ? (
              <div className="preview-container">
                <img src={selectedImage} alt="Product preview" className="preview-image" />
                <div className="preview-overlay">
                  <span className="btn btn-primary btn-sm">Change Image</span>
                </div>
              </div>
            ) : (
              <div className="dropzone-content">
                <UploadCloud size={64} className="upload-icon" />
                <h3>Drag & Drop your image here</h3>
                <p>or click to browse from your device</p>
                <div className="upload-divider"><span>OR</span></div>
                <button 
                  className="btn btn-outline"
                  onClick={(e) => { e.stopPropagation(); handleSkipUpload(); }}
                >
                  I don't have a photo
                </button>
                <p className="skip-hint">(We'll assign a realistic stock photo)</p>
              </div>
            )}
          </div>
        </div>

        <div className="analysis-section animate-fade-in delay-200">
          <div className="analysis-card glass">
            <h2>AI Classification</h2>
            
            {!selectedImage && !isAnalyzing ? (
              <div className="analysis-empty">
                <ImageIcon size={48} className="empty-icon" />
                <p>Upload an image to see AI classification results</p>
              </div>
            ) : isAnalyzing ? (
              <div className="analysis-loading">
                <Loader2 size={48} className="loading-icon spin" />
                <p>Analyzing product features...</p>
              </div>
            ) : analysisResult ? (
              <div className="analysis-result animate-fade-in">
                <div className="result-header success">
                  <CheckCircle2 size={24} />
                  <h3>Analysis Complete</h3>
                </div>
                
                <div className="result-details">
                  <div className="detail-row">
                    <span className="label">Detected Category:</span>
                    <span className="value highlight">{analysisResult.category}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Confidence Score:</span>
                    <span className="value">{analysisResult.confidence}%</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Suggested Title:</span>
                    <span className="value">{analysisResult.suggestedName}</span>
                  </div>
                </div>
                
                <div className="product-form mt-4">
                  <div className="input-group">
                    <label>Price per Kg (₹)</label>
                    <input type="number" placeholder="Enter price" defaultValue={50} />
                  </div>
                  <button className="btn btn-primary w-100 mt-4">
                    List Product on Market
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;
