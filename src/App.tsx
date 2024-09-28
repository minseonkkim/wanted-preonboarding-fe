import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import { MOCK_DATA } from './data/mockData';
import { MockData } from './types/mock';
import Card from './components/Card';

const ITEMS_PER_PAGE = 10;

function App() {
  const [items, setItems] = useState<MockData[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const observer = useRef<IntersectionObserver | null>(null);

  const totalSum = items.reduce((acc, item) => acc + item.price, 0);

  useEffect(() => {
    loadMoreItems();
  }, []);

  useEffect(() => {
    const lastItem = document.querySelector('.item:last-child') as HTMLElement;
    if (loading || !lastItem) return;

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && hasMore) {
        loadMoreItems();
      }
    };

    observer.current = new IntersectionObserver(observerCallback);
    if (lastItem) {
      observer.current.observe(lastItem);
    }

    return () => {
      if (observer.current && lastItem) {
        observer.current.unobserve(lastItem);
      }
    };
  }, [loading, hasMore]);

  const loadMoreItems = () => {
    setLoading(true);
    setTimeout(() => {
      const newItems = MOCK_DATA.slice(currentIndex, currentIndex + ITEMS_PER_PAGE);
      setItems((prev) => [...prev, ...newItems]);
      setCurrentIndex((prev) => prev + ITEMS_PER_PAGE);
      setLoading(false);
      if (newItems.length < ITEMS_PER_PAGE) {
        setHasMore(false);
      }
    }, 1000);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Total Price: ${totalSum.toFixed(2)}</h2>
      <div style={{ marginBottom: '20px' }}>
        {items.map((item) => (
          <Card key={item.productId} item={item} /> 
        ))}
      </div>
      {loading && <div>Loading...</div>}
    </div>
  );
}

export default App;
