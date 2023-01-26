'use strict';

const usersService = require('../services/users');

const create = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = usersService.create(name);

  res.statusCode = 201;
  res.send(newUser);
};

const getAll = (req, res) => {
  const users = usersService.getAll();

  res.send(users);
};

const getById = (req, res) => {
  const { userId } = req.params;
  const foundUser = usersService.getById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(foundUser);
};

const remove = (req, res) => {
  const { userId } = req.params;
  const foundUser = usersService.getById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  };

  usersService.remove(userId);
  res.sendStatus(204);
};

const update = (req, res) => {
  const { userId } = req.params;
  const { name } = req.body;

  const foundUser = usersService.getById(userId);

  if (!userId || !name) {
    res.sendStatus(400);

    return;
  };

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  usersService.update(userId, name);

  res.send(foundUser);
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
