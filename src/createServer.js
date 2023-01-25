'use strict';

const express = require('express');
const cors = require('cors');
const userService = require('./services/user');
const userController = require('./controllers/user');

function createServer() {
  // Use express to create a server
  // Add a routes to the server
  // Return the server (express app)
  const app = express();

  app.use(cors());

  // eslint-disable-next-line prefer-const
  let expenses = [];

  app.post('/users', express.json(), userController.create);

  app.get('/users', userController.getAll);

  app.get('/users/:userId', userController.getById);

  app.delete('/users/:userId', userController.remove);

  app.patch('/users/:userId', express.json(), userController.update);

  app.post('/expenses', express.json(), (req, res) => {
    const {
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    } = req.body;

    const requestIsValid = userId && spentAt && title && amount
    && category && note;

    if (!requestIsValid) {
      res.sendStatus(400);

      return;
    }

    const userIsValid = userService.getById(userId);

    if (!userIsValid) {
      res.sendStatus(400);

      return;
    }

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

    res.statusCode = 201;
    res.send(newExpense);
  });

  app.get('/expenses', express.json(), (req, res) => {
    const {
      userId,
      category,
      from,
      to,
    } = req.query;

    if (userId) {
      const expensesByUser = expenses.filter(expense =>
        expense.userId === +userId
      );

      if (category) {
        const expensesByCategory = expensesByUser.filter(expense =>
          expense.category === category
        );

        res.send(expensesByCategory);

        return;
      }

      res.send(expensesByUser);

      return;
    }

    if (from && to) {
      const expensesByDateTo = expenses.filter(item =>
        item.spentAt >= from && item.spentAt <= to
      );

      res.send(expensesByDateTo);

      return;
    }

    res.send(expenses);
  });

  app.get('/expenses/:expenseId', (req, res) => {
    const { expenseId } = req.params;
    const foundExpense = expenses.find(expense => expense.id === +expenseId);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    res.statusCode = 200;
    res.send(foundExpense);
  });

  app.delete('/expenses/:expenseId', (req, res) => {
    const { expenseId } = req.params;
    const filteredExpenses = expenses.filter(expense =>
      expense.id === expenseId
    );

    if (expenses.length === filteredExpenses.length) {
      res.sendStatus(404);

      return;
    };

    expenses = filteredExpenses;
    res.sendStatus(204);
  });

  app.patch('/expenses/:expenseId', express.json(), (req, res) => {
    const { expenseId } = req.params;
    const { title } = req.body;

    const foundExpense = expenses.find(expense => expense.id === +expenseId);

    if (!expenseId || !foundExpense) {
      res.sendStatus(404);

      return;
    }

    const modifiedExpense = Object.assign(foundExpense, { title });

    res.send(modifiedExpense);
  });

  return app;
}

module.exports = {
  createServer,
};
