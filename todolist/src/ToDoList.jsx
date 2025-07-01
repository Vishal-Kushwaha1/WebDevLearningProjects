import React, { useEffect, useState } from 'react'
import edit from "./assets/edit.png"
import { title } from 'framer-motion/client';

const ToDoList = () => {
    const [toDoList, setToDoList] = useState(() => {
        const savedTasks = localStorage.getItem("toDoList");
        return savedTasks ? JSON.parse(savedTasks) : [];
    });
    const [inputTask, setInputTask] = useState('')
    const [editId, setEditId] = useState(null)
    const [count, setCount] = useState(0)

    const addTask = () => {
        const task = inputTask.trim()

        if (!task) {
            console.log("Please write something to add")
            return
        }

        if (editId) {
            const updatedList = toDoList.map((item) => {
                item.id === editId ? setToDoList[ { ...item, item: task } ]: item
            }
            );
            setToDoList(updatedList);
            setEditId(null);
        }

        if (task) {
            const id = Date.now()
            setToDoList([...toDoList, { id: id, title: task, state: false }])
        }

        setInputTask('')
    }

    useEffect(() => {
        localStorage.setItem("toDoList", JSON.stringify(toDoList));
    }, [toDoList]);


    const handleCheckbox = (id) => {
        const updatedTask = toDoList.map(task => {
            if (task.id === id) {
                return { ...task, state: !task.state };
            }
            return task;
        });
        setToDoList(updatedTask);
    }

    const deleteTask = (id) => {
        const updatedTask = toDoList.filter(task => task.id !== id)
        setToDoList(updatedTask)
    }

    const editTask = (tasks) => {
        setInputTask(tasks.title)
        setEditId(tasks.id)
    }

    return (
        <div className='min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-8 flex items-center justify-center'>
            <div className='bg-white p-6 rounded-2xl shadow-2xl w-full max-w-md'>
                <h1 className='text-4xl font-bold text-center text-purple-800 mb-6'>🌟 To Do List 🌟</h1>
                <div className='flex mb-4'>
                    <input
                        type="text"
                        className='flex-1 bg-gray-100 text-black rounded-l-xl p-3 focus:outline-none'
                        placeholder='Add new task...'
                        value={inputTask}
                        onChange={(e) => setInputTask(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                addTask()
                            }
                        }
                        }
                    />
                    < button
                        className='bg-purple-700 hover:bg-purple-900 text-white font-semibold p-3 rounded-r-xl'
                        onClick={addTask}
                    > {editId ? "Update" : "Add"}</button>
                </div>
                <div className='space-y-3'>
                    {toDoList.map((tasks) => (
                        <div key={tasks.id} className='flex items-center bg-gradient-to-r from-pink-300 via-purple-300 to-purple-200 p-3 rounded-xl'>
                            <input
                                type="checkbox"
                                checked={tasks.state}
                                onChange={() => handleCheckbox(tasks.id)}
                                className='accent-purple-700 w-5 h-5'
                            />
                            <p
                                onClick={() => handleCheckbox(tasks.id)}
                                className={`ml-3 flex-1 text-lg font-medium cursor-pointer ${tasks.state ? "line-through text-gray-500" : "text-gray-800"}`}
                            >
                                {tasks.title}
                            </p>
                            <img
                                src={edit}
                                alt="edit_icon"
                                className='h-4.5 w-4.5 m-1 hover:h-5 hover:w-5 cursor-pointer'
                                onClick={(e) => editTask(tasks)}
                            />
                            <button
                                onClick={() => deleteTask(tasks.id)}
                                className='bg-red-400 hover:bg-red-600 text-white px-3 py-1 rounded-xl text-sm'
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div >
    )
}

export default ToDoList
