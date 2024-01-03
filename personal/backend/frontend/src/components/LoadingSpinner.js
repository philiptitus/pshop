// Create a new file, e.g., LoadingSpinner.js

import React from 'react';
import "../css/LoadingSpinner.css"

const LoadingSpinner = () => {
  return (
    <div className="loading">
      <div className="loading">Loading&hellip;</div>
    </div>
  );
};

export default LoadingSpinner;
