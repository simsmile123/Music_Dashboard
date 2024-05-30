import React from 'react';
import '../styles/inbox.css';

const InboxSearch = ({ searchTerm, onSearch }) => {
  return (
    <input
      type="text"
      className="search-bar"
      placeholder="Search..."
      value={searchTerm}
      onChange={(e) => onSearch(e.target.value)}
    />
  );
};

export default InboxSearch;

