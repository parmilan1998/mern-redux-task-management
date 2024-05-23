import { createSlice } from '@reduxjs/toolkit'

const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
  },
  reducers: {
    getTasks: (state, action) => {
      state.tasks = action.payload
    },
    addTasks: (state, action) => {
      state.tasks.push(action.payload)
    },
    updateTasks: (state, action) => {
      const index = state.tasks.findIndex(
        (task) => task.id == action.payload.id
      )
      state.tasks[index] = [action.payload.formData]
    },
    deleteTasks: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload.id)
    },
  },
})

export const { getTasks, addTasks, updateTasks, deleteTasks } =
  taskSlice.actions
export default taskSlice.reducer
