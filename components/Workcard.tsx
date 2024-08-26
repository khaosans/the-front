import React from 'react';
import './Workcard.css'; // Import the CSS file

const Workcard: React.FC<{ workcard: { id: number, title: string, description: string } }> = ({ workcard }) => {
  return (
    <div className="workcard">
      <h4 className="workcard-title">{workcard.title}</h4>
      <p className="workcard-description">{workcard.description}</p>
    </div>
  );
};

export default Workcard;
