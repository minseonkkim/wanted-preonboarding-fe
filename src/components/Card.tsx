import React from 'react';
import { MockData } from '../types/mock';

interface CardProps {
  item: MockData;
}

const Card: React.FC<CardProps> = ({ item }) => {
  // Inline styles
  const cardStyle: React.CSSProperties = {
    background: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    marginBottom: '20px',
  };

  const cardHeaderStyle: React.CSSProperties = {
    backgroundColor: '#f9f9f9',
    padding: '10px 15px',
    borderBottom: '1px solid #e0e0e0',
  };

  const productNameStyle: React.CSSProperties = {
    margin: '0',
    fontSize: '1.2em',
    color: '#333',
  };

  const cardBodyStyle: React.CSSProperties = {
    padding: '15px',
  };

  const priceStyle: React.CSSProperties = {
    fontWeight: 'bold',
    fontSize: '27px',
    color: '#ff5722',
    margin: '10px 0',
  };

  const boughtDateStyle: React.CSSProperties = {
    color: '#666', // A lighter color for the date
    fontSize: '0.9em',
  };

  return (
    <div style={cardStyle} className="card">
      <div style={cardHeaderStyle} className="card-header">
        <h3 style={productNameStyle} className="product-name">{item.productName}</h3>
      </div>
      <div style={cardBodyStyle} className="card-body">
        <p style={priceStyle} className="price">${item.price.toFixed(2)}</p>
        <p style={boughtDateStyle} className="bought-date">Bought Date: {new Date(item.boughtDate).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default Card;
