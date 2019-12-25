const express = require('express');
const {
  getTask,
  getTasks,
  createTask,
  deleteTask,
  updateTask
} = require('../controllers/task');
const router = express.Router();


router
  .route('')
  .get(getTasks)
  .post(createTask);

router
  .route('/:id')
  .get(getTask)
  .put(updateTask)
  .delete(deleteTask);

module.exports = router;
