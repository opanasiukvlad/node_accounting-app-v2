'use strict';

const userService = require('../services/user');

const create = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = userService.create(name);

  res.statusCode = 201;
  res.send(newUser);
};

const getAll = (req, res) => {
  const users = userService.getAll();

  res.send(users);
};

const getById = (req, res) => {
  const { userId } = req.params;
  const foundUser = userService.getById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(foundUser);
};

const remove = (req, res) => {
  const { userId } = req.params;
  const foundUser = userService.getById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  };

  userService.remove(userId);
  res.sendStatus(204);
};

const update = (req, res) => {
  const { userId } = req.params;
  const { name } = req.body;

  const foundUser = userService.getById(userId);

  if (!userId || !name) {
    res.sendStatus(400);

    return;
  };

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  userService.update(userId, name);

  res.send(foundUser);
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
