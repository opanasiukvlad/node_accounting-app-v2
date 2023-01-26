'use strict';

const express = require('express');

const expensesController = require('../controllers/expenses');

const expensesRouter = express.Router();

expensesRouter.post('/', expensesController.create);

expensesRouter.get('/', expensesController.getAll);

expensesRouter.get('/:expenseId', expensesController.getById);

expensesRouter.delete('/:expenseId', expensesController.remove);

expensesRouter.patch('/:expenseId', expensesController.update);

module.exports = {
  expensesRouter,
};
