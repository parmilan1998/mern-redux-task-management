import express from 'express'
import {
  createTasks,
  getTasks,
  getTaskById,
  updateTasks,
  deleteTasks,
} from '../controllers/taskController.js'

const router = express.Router()

router.post('/', createTasks)
router.get('/', getTasks)
router.get('/:id', getTaskById)
router.put('/:id', updateTasks)
router.delete('/:id', deleteTasks)

export default router
