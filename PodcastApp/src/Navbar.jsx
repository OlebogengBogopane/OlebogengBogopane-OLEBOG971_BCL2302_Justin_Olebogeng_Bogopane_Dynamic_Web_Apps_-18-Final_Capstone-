import React from 'react';
import './Navbar.css'; // Create this CSS file for styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src="https://cdn-icons-png.flaticon.com/128/1186/1186562.png" alt="Logo" />
        <span>The Podcast Corner</span>

        <div>
                    <a href="/blogs" className="blogs">Pods</a>
                    
                    
                    <a href="/about" className="about">About</a>


        </div>
      </div>
    </nav>
  );
};

export default Navbar;



// import React from 'react';

// import Sort from './components/Sort';

// const Navbar = ({ searchQuery, handleSearchChange, sortBy, handleSortChange }) => {
//   return (
//     <header>
//       <div className="logo"></div>
//       <nav>
//         <SearchSort
//           searchQuery={searchQuery}
//           handleSearchChange={handleSearchChange}
//           sortBy={sortBy}
//           handleSortChange={handleSortChange}
//         />
//         <button className="btnLogin-popup">Login 👤</button>
//       </nav>
//     </header>
//   );
// };

// export default Navbar;
