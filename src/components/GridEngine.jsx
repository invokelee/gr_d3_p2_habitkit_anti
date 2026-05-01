import React from 'react';

const GridEngine = ({ gridData, onCellClick }) => {
  // We want to show the last 15 weeks (105 days) to fit larger circle tiles on mobile
  const daysToShow = 105; 
  const today = new Date();
  
  // Generate dates in order from oldest to newest
  const dates = [];
  for (let i = daysToShow - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    dates.push(d.toISOString().split('T')[0]);
  }

  const getEmoji = (level) => {
    switch (level) {
      case 1: return '🫘'; // Seed
      case 2: return '🌱'; // Sprout
      case 3: return '🌿'; // Herb
      case 4: return '🌳'; // Tree
      default: return '';
    }
  };

  return (
    <div className="grid-container">
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', paddingBottom: '4px' }}>
        {dates.map(date => {
          const level = gridData[date] || 0;
          return (
            <div 
              key={date}
              className="grid-cell"
              data-level={level}
              onClick={() => onCellClick(date)}
              title={`${date}: Level ${level}`}
            >
              <span className="grid-emoji">{getEmoji(level)}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GridEngine;
