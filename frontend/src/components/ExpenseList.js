import React, { useState } from 'react';
import ExpenseForm from './ExpenseForm';
import '../styles/ExpenseList.css';
import { Edit, Trash2, Receipt, ChevronDown, ChevronUp } from 'lucide-react';

const ExpenseList = ({ expenses, onDelete, onUpdate, categories }) => {
  const [editingId, setEditingId] = useState(null);
  const [expandedId, setExpandedId] = useState(null);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const handleEdit = (id) => {
    setEditingId(id);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  const handleUpdate = (expenseData) => {
    onUpdate(editingId, expenseData);
    setEditingId(null);
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  if (expenses.length === 0) {
    return (
      <div className="no-expenses">
        <h3>No expenses found</h3>
        <p>Add your first expense to start tracking your spending.</p>
      </div>
    );
  }

  return (
    <div className="expense-list">
      <h2>Your Expenses</h2>
      <div className="expense-table-container">
        <table className="expense-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Title</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <React.Fragment key={expense._id}>
                <tr className={expandedId === expense._id ? 'expanded' : ''}>
                  <td>{formatDate(expense.date)}</td>
                  <td>{expense.title}</td>
                  <td>
                    <span className="category-badge">{expense.category}</span>
                  </td>
                  <td className="amount">{formatCurrency(expense.amount)}</td>
                  <td className="actions">
                    <button 
                      className="action-btn edit-btn" 
                      onClick={() => handleEdit(expense._id)}
                      title="Edit expense"
                    >
                      <Edit size={16} />
                    </button>
                    <button 
                      className="action-btn delete-btn" 
                      onClick={() => onDelete(expense._id)}
                      title="Delete expense"
                    >
                      <Trash2 size={16} />
                    </button>
                    {expense.receipt && (
                      <a 
                        href={`http://localhost:5000/${expense.receipt}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="action-btn receipt-btn"
                        title="View receipt"
                      >
                        <Receipt size={16} />
                      </a>
                    )}
                    <button 
                      className="action-btn expand-btn" 
                      onClick={() => toggleExpand(expense._id)}
                      title={expandedId === expense._id ? "Hide details" : "Show details"}
                    >
                      {expandedId === expense._id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                  </td>
                </tr>
                {expandedId === expense._id && (
                  <tr className="expense-details">
                    <td colSpan="5">
                      <div className="expense-description">
                        <h4>Description:</h4>
                        <p>{expense.description || 'No description provided'}</p>
                      </div>
                    </td>
                  </tr>
                )}
                {editingId === expense._id && (
                  <tr className="edit-form-row">
                    <td colSpan="5">
                      <ExpenseForm 
                        expense={expense}
                        onSubmit={handleUpdate}
                        onCancel={handleCancelEdit}
                        categories={categories}
                        isEditing={true}
                      />
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpenseList;
