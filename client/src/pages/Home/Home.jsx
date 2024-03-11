import React from 'react';
import Header from '../../components/Header';
import './Home.css'; // Import CSS file for styling

function Home() {
  return (
    <div>
      <Header />
      <div className="home-container">
        <div className="welcome-section">
          <h1>Welcome to Our Website!</h1>
          <p>We're glad you're here. Feel free to explore and discover all the amazing content we have to offer.</p>
          <p>Whether you're looking for information, entertainment, or inspiration, we've got you covered. Happy browsing!</p>
        </div>
        <div className="featured-section">
          <h2>Featured Content</h2>
          <div className="featured-items">
            {/* Dummy featured content */}
            <div className="featured-item">
              <h3>Featured Item 1</h3>
              <p>Description of Featured Item 1</p>
            </div>
            <div className="featured-item">
              <h3>Featured Item 2</h3>
              <p>Description of Featured Item 2</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
