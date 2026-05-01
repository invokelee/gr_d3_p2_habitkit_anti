import React, { useState } from 'react';
import { useHabitStore } from './models/useStore';
import HabitList from './components/HabitList';
import Timer from './components/Timer';

function App() {
  const { habits, addHabit, deleteHabit, addBit } = useHabitStore();
  const [newTitle, setNewTitle] = useState('');

  const handleAddHabit = (e) => {
    e.preventDefault();
    if (newTitle.trim()) {
      addHabit(newTitle, 'health');
      setNewTitle('');
    }
  };

  const handleTimerComplete = () => {
    const today = new Date().toISOString().split('T')[0];
    const studyHabits = habits.filter(h => h.type === 'study');
    
    // Automatically add a bit to all study habits
    studyHabits.forEach(habit => {
      addBit(habit.id, today);
    });
    
    // Attempt to trigger haptic feedback if supported (mostly mobile browsers)
    if (window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate([200, 100, 200]);
    }
  };

  return (
    <div className="app-container">
      <header>
        <h1>🌱 GrowBit Web MVP</h1>
        <p>Local-first Habit & Study Tracker</p>
      </header>

      <Timer onComplete={handleTimerComplete} />

      <form onSubmit={handleAddHabit} className="card" style={{ marginBottom: '24px' }}>
        <h2>Create New Habit</h2>
        <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
          <input 
            type="text" 
            placeholder="E.g., Read 10 pages" 
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            style={{ marginBottom: 0 }}
          />
          <button type="submit" className="primary">Add</button>
        </div>
      </form>

      <HabitList 
        habits={habits} 
        onAddBit={addBit} 
        onDelete={deleteHabit} 
      />
    </div>
  );
}

export default App;
