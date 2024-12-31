import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Middle from '../components/Middle/Middle';
import './HomePage.css';


const HomePage = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [searchType, setSearchType] = useState('title');  // Default search by title
  const [searchPerformed, setSearchPerformed] = useState(false); // Track if a search has been made

  const fetchBooks = async () => {
    // const API_KEY = 'AIzaSyAPCHnPP_ITuzH1o8OR42v1AoPtsij-MUI';
    const API_KEY = process.env.REACT_APP_API_KEY;
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${query}+in${searchType}&maxResults=36&key=${API_KEY}`
    );
    setBooks(response.data.items || []);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchPerformed(true); // Mark search as performed
    fetchBooks();
  };

  return (
    <div className="container">

       {/* IMPORT components */}
      <Navbar />  
      <Middle /> 
      
      <div className="search-container">
        <form onSubmit={handleSearch}>
          <div className="search-input-container">
            <input
              type="text"
              placeholder="Search for books..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit">
              <i className="fas fa-search"></i> 
            </button>
          </div>
        </form>

              {/*  Render search options */}

        <div className="search-options">
          <label>
            <input
              type="radio"
              value="title"
              checked={searchType === 'title'}
              onChange={() => setSearchType('title')}
            />
            Title
          </label>
          <label>
            <input
              type="radio"
              value="isbn"
              checked={searchType === 'isbn'}
              onChange={() => setSearchType('isbn')}
            />
            ISBN
          </label>
          <label>
            <input
              type="radio"
              value="author"
              checked={searchType === 'author'}
              onChange={() => setSearchType('author')}
            />
            Author
          </label>
        </div>
      </div>

      <div className="book-list">
        {books.length > 0 ? (
          books.map((book) => (
            <div key={book.id} className="book-item">
              <img
                src={
                  book.volumeInfo.imageLinks?.thumbnail ||
                  'https://via.placeholder.com/128x192.png?text=No+Image'
                }
                alt={book.volumeInfo.title}
              />
              <h2>{book.volumeInfo.title}</h2>
              <p>{book.volumeInfo.authors?.join(', ')}</p>
              <Link to={`/book/${book.id}`}>View Details</Link>
            </div>
          ))
        ) : (
          searchPerformed && <p>No books found. Please try another search.</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
