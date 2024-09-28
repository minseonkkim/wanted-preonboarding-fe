const Skeleton: React.FC = () => {
  return (
    <div className="skeleton" style={{ padding: '10px', border: '1px solid #ccc', marginBottom: '10px' }}>
      <div style={{ height: '20px', width: '60%', backgroundColor: '#e0e0e0', marginBottom: '10px' }} />
      <div style={{ height: '16px', width: '40%', backgroundColor: '#e0e0e0', marginBottom: '5px' }} />
      <div style={{ height: '16px', width: '30%', backgroundColor: '#e0e0e0' }} />
    </div>
  );
};

export default Skeleton;
