import { MockData } from '../types/mock';

interface CardProps {
  item: MockData;
}

const Card = ({ item }:CardProps) => {
  return (
    <div className="item" style={{ padding: '10px', border: '1px solid #ccc', marginBottom: '10px' }}>
      <h3>{item.productName}</h3>
      <p>Price: ${item.price.toFixed(2)}</p>
      <p>Bought Date: {new Date(item.boughtDate).toLocaleString()}</p>
    </div>
  );
};

export default Card;
