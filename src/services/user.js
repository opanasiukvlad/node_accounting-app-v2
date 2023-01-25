'use strict';

let users = [];

function create(name) {
  const newUser = {
    id: users.length + 1,
    name,
  };

  users.push(newUser);

  return newUser;
}

function getAll() {
  return users;
}

function getById(userId) {
  const foundUser = users.find(user => user.id === +userId);

  return foundUser || null;
}

function remove(userId) {
  users = users.filter(user => user.id === userId);
};

function update(userId, name) {
  const foundUser = getById(userId);

  Object.assign(foundUser, { name });

  return foundUser;
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
