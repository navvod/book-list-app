import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './BookDetails.css';  


const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      // const API_KEY = 'AIzaSyAPCHnPP_ITuzH1o8OR42v1AoPtsij-MUI';
      const API_KEY = process.env.REACT_APP_API_KEY;
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes/${id}?key=${API_KEY}`   //id is passed from the URL
      );
      setBook(response.data);
    };

    fetchBookDetails();
  }, [id]);

  if (!book) return <div>Loading...</div>;   //show message while loading

  const { volumeInfo } = book;

  return (
    <div className="book-card-container">
      <div className="book-card">
        <div className="book-card-image">
          <img
            src={
              volumeInfo.imageLinks?.thumbnail ||
              'https://via.placeholder.com/128x192.png?text=No+Image'  //show placeholder image if no image is available
            }
            alt={volumeInfo.title}
          />
        </div>
        <div className="book-card-content">
          <h1 className="book-title">{volumeInfo.title}</h1>
          <p className="book-authors">
            <strong>Author(s):</strong> {volumeInfo.authors?.join(', ')}
          </p>
          <p className="book-description"> 
            <strong>Description:</strong> {volumeInfo.description || 'No description available.'}  
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
