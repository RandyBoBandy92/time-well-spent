import React, { useState } from 'react';
import { Clock, ChevronDown, Search, Plus, Upload, Undo, Redo } from 'lucide-react';
import { TimeTransaction } from '../types';

interface TransactionListProps {
  transactions: TimeTransaction[];
  onAddTransaction: () => void;
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions, onAddTransaction }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTransactions = transactions.filter(transaction =>
    transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">All Time Transactions</h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={onAddTransaction}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded flex items-center"
          >
            <Plus size={16} className="mr-2" /> Add Transaction
          </button>
          <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded flex items-center">
            <Upload size={16} className="mr-2" /> Import
          </button>
          <button className="text-gray-600 hover:text-gray-800">
            <Undo size={20} />
          </button>
          <button className="text-gray-600 hover:text-gray-800">
            <Redo size={20} />
          </button>
        </div>
      </div>

      <div className="mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
          />
          <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
        </div>
      </div>

      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Date</th>
            <th className="py-3 px-6 text-left">Description</th>
            <th className="py-3 px-6 text-left">Category</th>
            <th className="py-3 px-6 text-right">Duration</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {filteredTransactions.map((transaction) => (
            <tr key={transaction.id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-left whitespace-nowrap">
                {new Date(transaction.date).toLocaleDateString()}
              </td>
              <td className="py-3 px-6 text-left">{transaction.description}</td>
              <td className="py-3 px-6 text-left">{transaction.category}</td>
              <td className="py-3 px-6 text-right">{transaction.duration} min</td>
            </tr>
          ))}
        </tbody>
      </table>

      {filteredTransactions.length === 0 && (
        <p className="text-center text-gray-500 mt-4">No transactions found.</p>
      )}
    </div>
  );
};

export default TransactionList;