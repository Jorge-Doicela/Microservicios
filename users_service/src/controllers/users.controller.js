const UserService = require('../services/users.service');
const catchAsync = require('../utils/catchAsync');

exports.getUsers = catchAsync(async (req, res) => res.json(await UserService.getAll()));

exports.getUserById = catchAsync(async (req, res) => {
    const user = await UserService.getById(req.params.id);
    if (!user) throw new Error("Usuario no encontrado");
    res.json(user);
});

exports.createUser = catchAsync(async (req, res) => res.status(201).json(await UserService.create(req.body)));

exports.updateUser = catchAsync(async (req, res) => res.json(await UserService.update(req.params.id, req.body)));

exports.deleteUser = catchAsync(async (req, res) => res.json(await UserService.delete(req.params.id)));