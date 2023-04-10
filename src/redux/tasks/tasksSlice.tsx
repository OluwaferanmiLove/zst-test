import {createSlice} from '@reduxjs/toolkit';
// import {User} from '../../types';
import {revertAll} from '../sharedAction';

export interface toDoList {
  title: string;
  key: string;
}

export interface task {
  id: string;
  selectedDate: Date;
  stared: boolean;
  taskDescription: string;
  taskTitle: string;
  completed: boolean;
}

export interface taskList {
  [key: string]: {ongoingTasks: task[]; completedTasks?: task[]};
}

interface initialStateType {
  toDoList: toDoList[];
  taskList: taskList;
}

const initialToDoList = [
  {
    key: 'Stared',
    title: 'Stared',
  },
  {
    key: 'MyTasks',
    title: 'My Tasks',
  },
];

const initialTaskList = {
  Stared: {ongoingTasks: [], completedTasks: []},
  ['My Tasks']: {ongoingTasks: [], completedTasks: []},
};

const initialState: initialStateType = {
  toDoList: initialToDoList,
  taskList: initialTaskList,
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  extraReducers: builder => builder.addCase(revertAll, () => initialState),
  reducers: {
    setTodoList: (state, action) => {
      state.toDoList = [...state.toDoList, action.payload];
    },

    setTaskList: (state, action) => {
      state.taskList = {...state.taskList, ...action.payload};
    },
  },
});

export const {setTodoList, setTaskList} = tasksSlice.actions;

export default tasksSlice.reducer;
