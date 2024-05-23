import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { IoArrowBackCircleOutline } from 'react-icons/io5'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { updateTasks } from '../features/taskSlice'
import toast from 'react-hot-toast'

const EditTaskScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: '',
    status: '',
    tags: '',
    startDate: '',
    dueDate: '',
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }))
  }

  // Fetch the task details
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/v1/tasks/${id}`)
      .then((res) => {
        const task = res.data
        setFormData({
          ...task,
          startDate: task.startDate.slice(0, 10),
          dueDate: task.dueDate.slice(0, 10),
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }, [id])

  // Update the tasks
  const handleUpdate = (event) => {
    event.preventDefault()
    axios
      .put(`http://localhost:8080/api/v1/tasks/${id}`, formData)
      .then((res) => {
        dispatch(updateTasks({ id, formData }))
        navigate('/dashboard')
        toast.success('Task updated Successfully!', {
          autoClose: 5000,
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div className='mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-10 pb-20 font-poppins'>
      <div className='py-5 w-5 flex justify-center items-center'>
        <Link to='/dashboard'>
          <button className='rounded flex justify-center items-center text-cyan-600 px-4 py-2 text-md font-medium  hover:text-cyan-700'>
            <IoArrowBackCircleOutline size={30} />
          </button>
        </Link>
      </div>
      <div className='bg-white py-12 px-10 rounded max-w-screen-md mx-auto'>
        <h1 className='text-2xl text-cyan-500 font-semibold text-center pb-4'>
          Update<span className='text-sky-500'>Task</span>
        </h1>
        <form
          action='#'
          onSubmit={handleUpdate}
          className=' grid grid-cols-6 gap-6'
        >
          <div className='col-span-6'>
            <label
              htmlFor='title'
              className='block text-base font-medium text-gray-700'
            >
              Title
            </label>
            <input
              type='text'
              value={formData.title}
              onChange={handleChange}
              placeholder='Enter the title'
              id='title'
              name='title'
              className='mt-1 w-full rounded-md p-2 border border-gray-200 focus:outline-cyan-300 bg-white text-md text-gray-700'
            />
          </div>

          <div className='col-span-6'>
            <label
              htmlFor='description'
              className='block text-base font-medium text-gray-700'
            >
              Description
            </label>

            <textarea
              type='text'
              value={formData.description}
              onChange={handleChange}
              placeholder='Enter the description'
              id='description'
              name='description'
              rows={3}
              className='mt-1 w-full rounded-md p-2 border border-gray-200 focus:outline-cyan-300 bg-white text-md text-gray-700'
            />
          </div>

          <div className='col-span-6 sm:col-span-3'>
            <label
              htmlFor='priority'
              className='block text-md font-medium text-gray-700'
            >
              Priority
            </label>

            <select
              name='priority'
              value={formData.priority}
              onChange={handleChange}
              id='priority'
              className='mt-1 w-full rounded-md px-2 py-1.5 border border-gray-200 focus:outline-cyan-300 bg-white text-md text-gray-700'
            >
              <option value=''>- Select the Priority -</option>
              <option value='Low'>Low</option>
              <option value='Medium'>Medium</option>
              <option value='High'>High</option>
            </select>
          </div>

          <div className='col-span-6 sm:col-span-3'>
            <label
              htmlFor='status'
              className='block text-md font-medium text-gray-700'
            >
              Status
            </label>
            <select
              name='status'
              value={formData.status}
              onChange={handleChange}
              id='status'
              className='mt-1 w-full rounded-md px-2 py-1.5 border border-gray-200 focus:outline-cyan-300 bg-white text-md text-gray-700'
            >
              <option value=''>- Select the Status -</option>
              <option value='Start'>Start</option>
              <option value='In Progress'>In Progress</option>
              <option value='In Review'>In Review</option>
              <option value='Completed'>Completed</option>
            </select>
          </div>
          <div className='col-span-6'>
            <label
              htmlFor='tags'
              className='block text-md font-medium text-gray-700'
            >
              Tags
            </label>
            <input
              type='text'
              value={formData.tags}
              onChange={handleChange}
              id='tags'
              name='tags'
              className='mt-1 w-full rounded-md px-2 py-1.5 border border-gray-200 focus:outline-cyan-300 bg-white text-md text-gray-700'
            />
          </div>

          <div className='col-span-6 sm:col-span-3'>
            <label
              htmlFor='startDate'
              className='block text-md font-medium text-gray-700'
            >
              Start Date
            </label>

            <input
              type='date'
              value={formData.startDate}
              onChange={handleChange}
              id='startDate'
              name='startDate'
              className='mt-1 w-full rounded-md px-2 py-1.5 border border-gray-200 focus:outline-cyan-300 bg-white text-md text-gray-700'
            />
          </div>

          <div className='col-span-6 sm:col-span-3'>
            <label
              htmlFor='dueDate'
              className='block text-md font-medium text-gray-700'
            >
              Due Date
            </label>

            <input
              type='date'
              value={formData.dueDate}
              onChange={handleChange}
              id='dueDate'
              name='dueDate'
              className='mt-1 w-full rounded-md px-2 py-1.5 border border-gray-200 focus:outline-cyan-300 bg-white text-md text-gray-700'
            />
          </div>

          <div className='col-span-6 sm:flex sm:items-center sm:gap-4 w-full py-3'>
            <button
              type='submit'
              className='inline-block shrink-0 rounded-md w-full border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500'
            >
              Update the Task
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditTaskScreen
