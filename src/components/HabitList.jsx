import React from 'react';
import GridEngine from './GridEngine';

const HabitList = ({ habits, onAddBit, onDelete }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {habits.map(habit => (
        <div key={habit.id} className="card">
          <div className="habit-header">
            <div>
              <h3>{habit.title}</h3>
              <p>{habit.type === 'health' ? '🏃‍♂️ Health' : '📚 Study'}</p>
            </div>
            <div>
              <button 
                className="secondary" 
                style={{ marginRight: '8px' }}
                onClick={() => {
                  const today = new Date().toISOString().split('T')[0];
                  onAddBit(habit.id, today);
                }}
              >
                + Add Bit
              </button>
              <button className="danger" onClick={() => onDelete(habit.id)}>Delete</button>
            </div>
          </div>
          <GridEngine 
            gridData={habit.grid} 
            onCellClick={(date) => onAddBit(habit.id, date)}
          />
        </div>
      ))}
    </div>
  );
};

export default HabitList;
