'use strict';

let expenses = [];

function create(
  userId,
  spentAt,
  title,
  amount,
  category,
  note
) {
  const newExpense = {
    id: expenses.length + 1,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(newExpense);

  return newExpense;
}

function getAll(userId) {
  if (userId) {
    const expensesByUser = expenses.filter(expense =>
      expense.userId === +userId
    );

    return expensesByUser;
  }

  return expenses;
}

function getById(expenseId) {
  const expenseById = expenses.find(expense =>
    expense.id === +expenseId
  );

  return expenseById || null;
}

function remove(expenseId) {
  expenses = expenses.filter(expense =>
    expense.id !== +expenseId
  );
};

function update(expenseId, title) {
  const foundExpense = getById(expenseId);

  Object.assign(foundExpense, { title });

  return foundExpense;
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
