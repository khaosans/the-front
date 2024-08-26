import React from 'react';

const Workcard: React.FC<{ workcard: { id: number, title: string, description: string } }> = ({ workcard }) => {
  return (
    <div style={{ backgroundColor: 'var(--btn-background)', padding: '10px', borderRadius: '5px', marginBottom: '10px' }}>
      <h4 style={{ color: 'var(--foreground)' }}>{workcard.title}</h4>
      <p style={{ color: 'var(--foreground)' }}>{workcard.description}</p>
    </div>
  );
};

export default Workcard;
