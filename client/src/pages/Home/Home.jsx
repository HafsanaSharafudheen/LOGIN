import React from 'react';
import Header from '../../components/Header';
import './Home.css'; // Import CSS file for styling
import instance from '../../axios/axios'
function Home() {
  return (
    <div>
      <Header />
      <div className="home-container">
        <div className="welcome-section">
          <h1>Welcome to Our Laptop Website!</h1>
          <p>Explore our collection of high-quality laptops and find the perfect one for your needs.</p>
          <p>Whether you're a student, a professional, or a gamer, we have a laptop that fits your lifestyle and budget.</p>
        </div>
        <div className="featured-section">
          <h2>Featured Laptops</h2>
          <div className="featured-items">
            {/* Featured Dell laptop */}
            <div className="featured-item">
              <img src={instance.defaults.serverURL+ 'dell.webp'} style={{height:"200px"}} alt="Dell Laptop" />
              <h3>Dell XPS 13</h3>
              <p>Processor: Intel Core i7</p>
              <p>RAM: 16GB</p>
              <p>Storage: 512GB SSD</p>
              <p>Price: $1,299</p>
              <button>View Details</button>
            </div>
            {/* Featured Apple laptop */}
            <div className="featured-item">
              <img src={instance.defaults.serverURL+ 'apple.jpeg'} style={{height:"200px"}} alt="Apple MacBook" />
              <h3>Apple MacBook Pro 13-inch</h3>
              <p>Processor: Apple M1 Chip</p>
              <p>RAM: 8GB</p>
              <p>Storage: 256GB SSD</p>
              <p>Price: $1,299</p>
              <button>View Details</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
