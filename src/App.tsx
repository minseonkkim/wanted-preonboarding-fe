import React, { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';
import { MOCK_DATA } from './data/mockData';
import { MockData } from './types/mock';
import Skeleton from './components/Skeleton';
import Card from './components/Card';

const ITEMS_PER_PAGE = 10;

function App() {
  const [items, setItems] = useState<MockData[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const observer = useRef<IntersectionObserver | null>(null);

  const totalSum = items.reduce((acc, item) => acc + item.price, 0);

  const loadMoreItems = useCallback(() => {
    if (!hasMore) return; 
    setLoading(true);
    setTimeout(() => {
      const newItems = MOCK_DATA.slice(currentIndex, currentIndex + ITEMS_PER_PAGE);
      setItems((prev) => [...prev, ...newItems]);
      setCurrentIndex((prev) => prev + ITEMS_PER_PAGE);
      setLoading(false);
      if (newItems.length < ITEMS_PER_PAGE) {
        setHasMore(false); // Stop loading when no more items are left.
      }
    }, 1000);
  }, [currentIndex, hasMore]);

  useEffect(() => {
    const lastItem = document.querySelector('.item:last-child') as HTMLElement;
    if (loading || !lastItem || !hasMore) return;

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && !loading && hasMore) {
        loadMoreItems();
      }
    };

    if (observer.current) observer.current.disconnect(); 

    observer.current = new IntersectionObserver(observerCallback);
    if (lastItem) observer.current.observe(lastItem);

    return () => {
      if (observer.current) observer.current.disconnect(); 
    }
  }, [loading, hasMore, loadMoreItems]);

  useEffect(() => {
    loadMoreItems();
  }, [loadMoreItems]);

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ padding: '10px', background: 'white', position: 'fixed', top: '0', left: '0', width: '100vw', height: '100px'}}>
        <h2>Total Price: ${totalSum.toFixed(2)}</h2>
      </div>

      <div style={{ marginBottom: '20px' }}>
        {items.map((item) => <Card key={item.productId} item={item} />)}
        {loading && Array.from({ length: ITEMS_PER_PAGE }, (_, index) => <Skeleton key={index} />)}
      </div>
    </div>
  );
}

export default App;
