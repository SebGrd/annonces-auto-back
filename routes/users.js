const express = require('express');
const user = express.Router();
const utils = require('../utils/utils');
const { getUsers, getSingleUser, postUsers, deleteUsers, updateUsers } = require('../middlewares/users');

user.get('/', utils.apiRights, getUsers, (req, res, next) => {
   res.status(200);
   res.json(req.users);
});

user.get('/:id', utils.apiRights, getSingleUser, (req, res) => {
   res.status(200).json(req.user)
});

user.post('/', postUsers, (req, res, next) => {
   res.status(201);
   res.json(req.user);
});

user.put('/:id', utils.apiRights, updateUsers, (req, res, next) => {
   res.status(200);
   res.json({"message": "user updated", "modifs": req.modifs});
});

user.delete('/:id', utils.apiRights, deleteUsers, (req, res, next) => {
   res.status(200);
   res.json({"message": "user deleted"});
});

module.exports = user;