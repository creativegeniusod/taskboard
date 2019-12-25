const Task = require('../models/Task');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

exports.createTask = asyncHandler(async (req, res, next) => {
  const task = await Task.create(req.body);
  const tasks = await Task.find({}).sort('taskDate');
  res.status(201).json({
    success: true,
    data: tasks
  });
});

exports.getTasks = asyncHandler(async (req, res, next) => {
  // const tasks = await Task.find({}).sort('-_id');
  const tasks = await Task.find({}).sort('taskDate');
  res.status(200).json({
    success: true,
    data: tasks,
    taskCount: await Task.countDocuments()
  });
});

exports.getTask = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    success: true,
    message: `Task with id ${req.params.id}`
  });
});

exports.updateTask = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    success: true,
    message: `Updated task with id ${req.params.id}`
  });
});

exports.deleteTask = asyncHandler(async (req, res, next) => {
  //console.log(req.params.id);
  const task = await Task.findByIdAndDelete(req.params.id);
  const tasks = await Task.find({}).sort('taskDate');
  res.status(200).json({
    success: true,
    data: tasks
  });
});

//For error
//return next(new ErrorResponse('Message', 500));
