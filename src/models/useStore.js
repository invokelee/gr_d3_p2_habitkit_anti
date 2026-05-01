import { useState, useEffect } from 'react';

// Generate last 365 days of data structure
const generateEmptyGrid = () => {
  const grid = {};
  const today = new Date();
  for (let i = 0; i < 365; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateString = d.toISOString().split('T')[0];
    grid[dateString] = 0; // 0 means no activity
  }
  return grid;
};

export const useHabitStore = () => {
  const [habits, setHabits] = useState(() => {
    const saved = localStorage.getItem('growbit-habits');
    if (saved) {
      return JSON.parse(saved);
    }
    return [
      { id: '1', title: 'Daily Walk', type: 'health', grid: generateEmptyGrid() },
      { id: '2', title: 'Deep Work', type: 'study', grid: generateEmptyGrid() }
    ];
  });

  useEffect(() => {
    localStorage.setItem('growbit-habits', JSON.stringify(habits));
  }, [habits]);

  const addHabit = (title, type) => {
    const newHabit = {
      id: Date.now().toString(),
      title,
      type,
      grid: generateEmptyGrid()
    };
    setHabits([newHabit, ...habits]);
  };

  const deleteHabit = (id) => {
    setHabits(habits.filter(h => h.id !== id));
  };

  const addBit = (habitId, dateString) => {
    setHabits(currentHabits => {
      return currentHabits.map(habit => {
        if (habit.id === habitId) {
          const currentLevel = habit.grid[dateString] || 0;
          // Max level is 4
          const newLevel = Math.min(currentLevel + 1, 4);
          return {
            ...habit,
            grid: {
              ...habit.grid,
              [dateString]: newLevel
            }
          };
        }
        return habit;
      });
    });
  };

  return { habits, addHabit, deleteHabit, addBit };
};
