import TaskModel from '../models/taskModel.js'

// POST -> api/v1/tasks
export const createTasks = async (req, res) => {
  try {
    const { title, description, priority, tags, status, startDate, dueDate } =
      req.body

    // Check fields are filled or not
    if (
      !title ||
      !description ||
      !priority ||
      !tags ||
      !status ||
      !startDate ||
      !dueDate
    ) {
      return res.status(404).json('Please filled all required fields!')
    }

    // create new tasks
    const newTasks = {
      title,
      description,
      priority,
      tags,
      status,
      startDate,
      dueDate,
    }
    const tasks = await TaskModel.create(newTasks)
    res.status(201).json(tasks)
  } catch (error) {
    console.log(error.message)
    res.status(500).send({ error: error.message })
  }
}

// GET -> api/v1/tasks
export const getTasks = async (req, res) => {
  try {
    const tasks = await TaskModel.find()
    res.status(200).json(tasks)
  } catch (error) {
    console.log(error.message)
    res.status(500).send({ error: error.message })
  }
}

// GET -> api/v1/tasks/664c600154ddcdab9cdc7ba2
export const getTaskById = async (req, res) => {
  try {
    const { id } = req.params
    const task = await TaskModel.findById(id)

    if (!task) {
      return res.status(404).json({ error: 'Task not found' })
    }

    res.status(200).json(task)
  } catch (error) {
    console.log(error.message)
    res.status(500).send({ error: error.message })
  }
}

// PUT -> api/v1/tasks/664c600154ddcdab9cdc7ba2
export const updateTasks = async (req, res) => {
  try {
    const { id } = req.params
    const { title, description, priority, tags, status, startDate, dueDate } =
      req.body

    // Update task
    const result = await TaskModel.findByIdAndUpdate(id, req.body, {
      new: true,
    })

    // Check Task exists or not
    if (!result) {
      return res.status(404).send({ message: 'Task not found' })
    }

    res.status(200).send({ message: 'Tasks updated successfully' })
  } catch (error) {
    console.log(error.message)
    res.status(500).send({ error: error.message })
  }
}

// DELETE -> api/v1/tasks/664c600154ddcdab9cdc7ba2
export const deleteTasks = async (req, res) => {
  try {
    const { id } = req.params
    const result = await TaskModel.findByIdAndDelete(id)

    // Check Task exists or not
    if (!result) {
      return res.status(404).send({ message: 'Task not found' })
    }
    res.status(200).send({ message: 'Task Deleted Successfully' })
  } catch (error) {
    console.log(error.message)
    res.status(500).send({ error: error.message })
  }
}
