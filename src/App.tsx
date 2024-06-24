import React from 'react';
import Navbar from './components/Navbar';
import './index.css';  // Ensure this file includes the @import for the Lexend font
import HeroBanner from './components/HeroBanner';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header>
        <Navbar />
      </header>
      <main>
      <HeroBanner />
        
      </main>
    </div>
  );
};

export default App;
