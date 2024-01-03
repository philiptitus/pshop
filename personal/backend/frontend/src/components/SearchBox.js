import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';

function SearchBox() {
  const location = useLocation();
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    const searchQuery = searchText.trim() !== '' ? `?search=${searchText}` : '';
    const newLocation = { pathname: '/search', search: searchQuery };
    navigate(newLocation);
  };
  
  return (
    <div  

    >
    <i onClick={handleSearch} style={{
        color:'white'
      }} className="fas fa-search"></i>
    </div>
  );
}

export default SearchBox;
