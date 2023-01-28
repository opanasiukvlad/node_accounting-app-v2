'use strict';

const expensesService = require('../services/expenses');
const usersService = require('../services/users');

const create = (req, res) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  const userIsValid = usersService.getById(userId);

  if (!userIsValid) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expensesService.create(
    userId,
    spentAt,
    title,
    amount,
    category,
    note
  );

  res.statusCode = 201;
  res.send(newExpense);
};

const getAll = (req, res) => {
  const {
    userId,
    category,
    from,
    to,
  } = req.query;

  const expensesByUser = expensesService.getAll(userId);

  if (category) {
    const expensesByCategory = expensesByUser.filter(expense =>
      expense.category === category
    );

    res.send(expensesByCategory);

    return;
  };

  if (from) {
    const expensesByDateFrom = expensesByUser.filter(expense =>
      expense.spentAt >= from
    );

    if (to) {
      const expensesByDateTo = expensesByDateFrom.filter(expense =>
        expense.spentAt <= to
      );

      res.send(expensesByDateTo);

      return;
    }

    res.send(expensesByDateFrom);

    return;
  };

  if (to) {
    const expensesByDateTo = expensesByUser.filter(expense =>
      expense.spentAt <= to
    );

    res.send(expensesByDateTo);

    return;
  }

  res.send(expensesByUser);
};

const getById = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expensesService.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(foundExpense);
};

const remove = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expensesService.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  };

  expensesService.remove(expenseId);
  res.sendStatus(204);
};

const update = (req, res) => {
  const { expenseId } = req.params;
  const { title } = req.body;

  const foundExpense = expensesService.getById(expenseId);

  if (!expenseId || !title) {
    res.sendStatus(404);

    return;
  }

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  const modifiedExpense = expensesService.update(expenseId, title);

  res.send(modifiedExpense);
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
