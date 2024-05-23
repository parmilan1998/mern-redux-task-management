import React, { useEffect } from 'react'
import { FaRegEye } from 'react-icons/fa'
import { MdOutlineDeleteOutline } from 'react-icons/md'
import { FaRegEdit } from 'react-icons/fa'
import { IoArrowBackCircleOutline } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { deleteTasks, getTasks } from '../features/taskSlice'
import Swal from 'sweetalert2'

const TaskTableFormat = () => {
  const dispatch = useDispatch()
  const tasks = useSelector((state) => state.tasks.tasks)
  // console.log(tasks)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:8080/api/v1/tasks')
        dispatch(getTasks(res.data))
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

  const handleDelete = (id) => {
    // Show confirmation dialog using SweetAlert
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this task!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete it!',
      cancelButtonText: 'No, Cancel!',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:8080/api/v1/tasks/${id}`)
          .then((res) => {
            dispatch(deleteTasks({ id }))
            toast.success('Task deleted Successfully!', {
              autoClose: 5000,
            })
          })
          .catch((error) => {
            console.error('Error deleting task:', error)
          })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your task is safe :)', 'error')
      }
    })
  }

  return (
    <div className='mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-10 font-poppins'>
      <div className='overflow-x-auto'>
        <div className='py-5 flex justify-between'>
          <Link to='/'>
            <button className='rounded flex justify-center items-center text-cyan-600 px-4 py-2 text-md font-medium  hover:text-cyan-700'>
              <IoArrowBackCircleOutline size={30} />
            </button>
          </Link>
          <Link to='/create'>
            <button className='rounded flex justify-center items-center bg-cyan-600 px-5 py-1.5 text-md font-medium text-white hover:bg-cyan-700'>
              Add Task
            </button>
          </Link>
        </div>
        <table className='min-w-full divide-y-2 divide-gray-200 text-sm'>
          <thead>
            <tr className=' font-acme text-lg'>
              <th className='whitespace-nowrap text-start px-4 py-2 font-medium text-gray-900'>
                No
              </th>
              <th className='whitespace-nowrap text-start px-4 py-2 font-medium text-gray-900'>
                Title
              </th>
              <th className='whitespace-nowrap text-start px-4 py-2 font-medium text-gray-900'>
                Description
              </th>
              <th className='whitespace-nowrap text-start px-4 py-2 font-medium text-gray-900'>
                Priority
              </th>
              <th className='whitespace-nowrap text-start px-4 py-2 font-medium text-gray-900'>
                Status
              </th>
              <th className='whitespace-nowrap text-start px-4 py-2 font-medium text-gray-900'>
                Start Date
              </th>
              <th className='whitespace-nowrap text-start px-4 py-2 font-medium text-gray-900'>
                Due Date
              </th>
              <th className='whitespace-nowrap text-start px-4 py-2 font-medium text-gray-900'>
                Action
              </th>
            </tr>
          </thead>

          <tbody className='divide-y divide-gray-200'>
            {tasks.map((task, index) => (
              <tr className='text-md' key={index}>
                <td className='whitespace-nowrap px-4 py-6 font-medium text-gray-900'>
                  {index + 1}
                </td>
                <td className='whitespace-nowrap px-4 py-6 font-medium text-gray-900'>
                  {task.title}
                </td>
                <td className='whitespace-nowrap px-4 py-6 text-gray-700'>
                  {task.description.slice(0, 25)}
                </td>
                <td className='whitespace-nowrap px-4 py-6 text-gray-700'>
                  {task.priority}
                </td>
                <td className='whitespace-nowrap px-4 py-6 text-gray-700'>
                  {task.status}
                </td>
                <td className='whitespace-nowrap px-4 py-6 text-gray-700'>
                  {task.startDate.slice(0, 10)}
                </td>
                <td className='whitespace-nowrap px-4 py-6 text-gray-700'>
                  {task.dueDate.slice(0, 10)}
                </td>
                <td className='whitespace-nowrap px-4 py-6 space-x-2 flex items-center'>
                  <Link
                    to={`/task/${task._id}`}
                    className='inline-block rounded bg-indigo-600 px-5 py-1.5 text-xs font-medium text-white hover:bg-indigo-700'
                  >
                    <FaRegEye size={18} />
                  </Link>
                  <Link
                    to={`/edit/${task._id}`}
                    className='inline-block rounded bg-green-600 px-5 py-1.5 text-xs font-medium text-white hover:bg-green-700'
                  >
                    <FaRegEdit size={18} />
                  </Link>
                  <Link
                    onClick={() => handleDelete(task._id)}
                    className='inline-block rounded bg-red-600 px-5 py-1.5 text-xs font-medium text-white hover:bg-red-700'
                  >
                    <MdOutlineDeleteOutline size={18} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TaskTableFormat
