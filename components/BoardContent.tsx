import React from 'react';

interface BoardContentProps {
  boardData: any; // Replace 'any' with a more specific type if available
}

const BoardContent: React.FC<BoardContentProps> = ({ boardData }) => {
  return (
    <div>
      <h3>Board Title: {boardData.title}</h3>
      {/* Add more board content here */}
    </div>
  );
};

export default BoardContent;
