import { configureStore, createSlice } from '@reduxjs/toolkit';

// Create a slice for tasks
const tasksSlice = createSlice({
    name: 'tasks',
    initialState: [],
    reducers: {
        addTask: (state, action) => {
            state.push({ text: action.payload, isCompleted: false });
        },
        toggleComplete: (state, action) => {
            const task = state[action.payload];
            task.isCompleted = !task.isCompleted;
        },
        deleteTask: (state, action) => {
            return state.filter((_, index) => index !== action.payload);
        },
    },
});

export const { addTask, toggleComplete, deleteTask } = tasksSlice.actions;

// Configure the Redux store
const store = configureStore({
    reducer: {
        tasks: tasksSlice.reducer,
    },
});

export default store;
