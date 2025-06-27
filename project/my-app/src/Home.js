import React from 'react';
import './App.css';

function Home() {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1>📝 Welcome to <span className="brand-name">Beige Notes</span>!</h1>
        <p>✨ Start organizing your thoughts with style and clarity.</p>
        <p>📒 Click <strong>“Notes”</strong> in the sidebar to begin!</p>
        {/* Using a reliable image hosting service */}
        <img 
          src="capybara.jpeg"
          alt="Aesthetic desk with notes"
          className="home-image"
        />
      </div>
    </div>
  );
}

export default Home;