import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTask, toggleComplete, deleteTask } from './redux/store';

function App() {
    const [taskInput, setTaskInput] = useState('');
    const tasks = useSelector((state) => state.tasks);
    const dispatch = useDispatch();

    const handleAddTask = () => {
        if (taskInput.trim() === '') {
            alert('Task cannot be empty!');
            return;
        }
        dispatch(addTask(taskInput));
        setTaskInput('');
    };

    return (
        <div className="container mt-5">
            <div className="card shadow-sm">
                <div className="card-header bg-primary text-white text-center">
                    <h1>Simple To-Do List</h1>
                </div>
                <div className="card-body">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter a task"
                            value={taskInput}
                            onChange={(e) => setTaskInput(e.target.value)}
                        />
                        <button className="btn btn-primary" onClick={handleAddTask}>
                            Add Task
                        </button>
                    </div>
                    {tasks.length === 0 ? (
                        <p className="text-center text-muted">No tasks available. Add one!</p>
                    ) : (
                        <ul className="list-group">
                            {tasks.map((task, index) => (
                                <li
                                    key={index}
                                    className={`list-group-item d-flex justify-content-between align-items-center ${
                                        task.isCompleted ? 'list-group-item-success' : ''
                                    }`}
                                >
                                    <span
                                        style={{
                                            textDecoration: task.isCompleted ? 'line-through' : 'none',
                                        }}
                                    >
                                        {task.text}
                                    </span>
                                    <div>
                                        <button
                                            className={`btn btn-sm ${
                                                task.isCompleted ? 'btn-warning' : 'btn-success'
                                            } me-2`}
                                            onClick={() => dispatch(toggleComplete(index))}
                                        >
                                            {task.isCompleted ? 'Undo' : 'Complete'}
                                        </button>
                                        <button
                                            className="btn btn-sm btn-danger"
                                            onClick={() => dispatch(deleteTask(index))}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
