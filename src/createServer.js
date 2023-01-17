'use strict';

const express = require('express');
const cors = require('cors');

function createServer() {
  // Use express to create a server
  // Add a routes to the server
  // Return the server (express app)
  const app = express();

  app.use(cors());

  let users = [];
  // eslint-disable-next-line prefer-const
  let expenses = [];

  app.post('/users', express.json(), (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const newUser = {
      id: users.length + 1,
      name,
    };

    users.push(newUser);

    res.statusCode = 201;
    res.send(newUser);
  });

  app.get('/users', (req, res) => {
    if (!users) {
      res.sendStatus(400);

      return;
    }

    res.send(users);
  });

  app.get('/users/:userId', (req, res) => {
    const { userId } = req.params;
    const foundUser = users.find(user => user.id === +userId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    res.statusCode = 200;
    res.send(foundUser);
  });

  app.delete('/users/:userId', (req, res) => {
    const { userId } = req.params;
    const filteredUsers = users.filter(user => user.id === userId);

    if (users.length === filteredUsers.length) {
      res.sendStatus(404);

      return;
    };

    users = filteredUsers;
    res.sendStatus(204);
  });

  app.patch('/users/:userId', express.json(), (req, res) => {
    const { userId } = req.params;
    const { name } = req.body;

    const foundUser = users.find(user => user.id === +userId);

    if (!userId || !name) {
      res.sendStatus(400);

      return;
    };

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    const modifiedUser = Object.assign(foundUser, { name });

    res.send(modifiedUser);
  });

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

    const userIsValid = users.some(user => user.id === userId);

    if (!requestIsValid) {
      res.sendStatus(400);

      return;
    }

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
      const expensesByUser = expenses.filter(item => item.userId === +userId);

      if (category) {
        const expensesByCategory = expensesByUser.filter(item =>
          item.category === category
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

  return app;
}

module.exports = {
  createServer,
};
