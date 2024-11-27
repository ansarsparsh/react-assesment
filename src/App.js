import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTask, toggleComplete, deleteTask, editTask } from './redux/store';

function App() {
    const [taskInput, setTaskInput] = useState('');
    const [editingIndex, setEditingIndex] = useState(null);
    const [editingText, setEditingText] = useState('');
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

    const handleEditTask = (index, text) => {
        setEditingIndex(index);
        setEditingText(text);
    };

    const handleSaveEdit = () => {
        if (editingText.trim() === '') {
            alert('Task cannot be empty!');
            return;
        }
        dispatch(editTask({ index: editingIndex, text: editingText }));
        setEditingIndex(null);
        setEditingText('');
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
                                    {editingIndex === index ? (
                                        <div className="d-flex flex-grow-1">
                                            <input
                                                type="text"
                                                className="form-control me-2"
                                                value={editingText}
                                                onChange={(e) => setEditingText(e.target.value)}
                                            />
                                            <button
                                                className="btn btn-success btn-sm me-2"
                                                onClick={handleSaveEdit}
                                            >
                                                Save
                                            </button>
                                            <button
                                                className="btn btn-secondary btn-sm"
                                                onClick={() => setEditingIndex(null)}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <span
                                                style={{
                                                    textDecoration: task.isCompleted
                                                        ? 'line-through'
                                                        : 'none',
                                                }}
                                            >
                                                {task.text}
                                            </span>
                                            <div>
                                                <button
                                                    className={`btn btn-sm ${
                                                        task.isCompleted
                                                            ? 'btn-warning'
                                                            : 'btn-success'
                                                    } me-2`}
                                                    onClick={() => dispatch(toggleComplete(index))}
                                                >
                                                    {task.isCompleted ? 'Undo' : 'Complete'}
                                                </button>
                                                <button
                                                    className="btn btn-sm btn-info me-2"
                                                    onClick={() => handleEditTask(index, task.text)}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="btn btn-sm btn-danger"
                                                    onClick={() => dispatch(deleteTask(index))}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </>
                                    )}
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
