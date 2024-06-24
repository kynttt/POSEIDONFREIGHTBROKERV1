import React from 'react';
import Navbar from './components/Navbar';
import './index.css';  // Ensure this file includes the @import for the Lexend font

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header>
        <Navbar />
      </header>
      <main>
        {/* Other components and content */}
      </main>
    </div>
  );
};

export default App;
