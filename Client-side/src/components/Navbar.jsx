import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="flex items-center">
    <Link to="/" className="flex-shrink-0">
      <span className="text-2xl font-bold text-soft-lilac hover:text-deep-teal transition-colors duration-300">
        AdeyBloom
      </span>
    </Link>
  </div>
  );
}

export default Navbar;