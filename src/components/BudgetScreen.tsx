import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Category, TimeTransaction } from '../types';

interface BudgetScreenProps {
  categories: Category[];
  transactions: TimeTransaction[];
  onUpdateCategory: (category: Category) => void;
}

const BudgetScreen: React.FC<BudgetScreenProps> = ({ categories, transactions, onUpdateCategory }) => {
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryBudget, setNewCategoryBudget] = useState('');

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCategoryName && newCategoryBudget) {
      const newCategory: Category = {
        id: uuidv4(),
        name: newCategoryName,
        budgetedTime: parseInt(newCategoryBudget)
      };
      onUpdateCategory(newCategory);
      setNewCategoryName('');
      setNewCategoryBudget('');
    }
  };

  const handleUpdateBudget = (id: string, newBudget: string) => {
    const updatedCategory = categories.find(c => c.id === id);
    if (updatedCategory) {
      onUpdateCategory({
        ...updatedCategory,
        budgetedTime: parseInt(newBudget)
      });
    }
  };

  const calculateActivityTime = (categoryName: string) => {
    return transactions
      .filter(t => t.category === categoryName)
      .reduce((total, t) => total + t.duration, 0);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4">Time Budget</h2>
      
      <form onSubmit={handleAddCategory} className="mb-6">
        <div className="flex space-x-4">
          <input
            type="text"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            placeholder="New category name"
            className="flex-grow rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
          <input
            type="number"
            value={newCategoryBudget}
            onChange={(e) => setNewCategoryBudget(e.target.value)}
            placeholder="Budget (minutes)"
            className="w-32 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
            min="1"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add
          </button>
        </div>
      </form>

      <ul className="space-y-4">
        {categories.map(category => {
          const activityTime = calculateActivityTime(category.name);
          const remainingTime = category.budgetedTime - activityTime;
          return (
            <li key={category.id} className="bg-gray-50 p-4 rounded-md">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold">{category.name}</span>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    value={category.budgetedTime}
                    onChange={(e) => handleUpdateBudget(category.id, e.target.value)}
                    className="w-20 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    min="1"
                  />
                  <span className="text-gray-600">min</span>
                </div>
              </div>
              <div className="flex justify-between text-sm">
                <span>Activity: {activityTime} min</span>
                <span className={remainingTime >= 0 ? 'text-green-600' : 'text-red-600'}>
                  Remaining: {remainingTime} min
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default BudgetScreen;