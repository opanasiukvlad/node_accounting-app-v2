'use strict';

const express = require('express');
const userController = require('../controllers/user');

const userRouter = express.Router();

userRouter.post('/', express.json(), userController.create);

userRouter.get('/', userController.getAll);

userRouter.get('/:userId', userController.getById);

userRouter.delete('/:userId', userController.remove);

userRouter.patch('/:userId', express.json(), userController.update);

module.exports = {
  userRouter,
};
