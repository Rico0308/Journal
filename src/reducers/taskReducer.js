import { types } from '../types/types';

const initialState = {
    tasks: [],
    active: null
}


export const taskReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.taskAddNew:
            return {
                ...state,
                tasks: [action.payload, ...state.tasks]
            }

        case types.taskLoad:
            return {
                ...state,
                tasks: [
                    ...action.payload
                ]
            }

        case types.taskDelete:
            return {
                ...state,
                tasks: state.tasks.filter(tasks => tasks.id !== action.payload)
            }

        case types.taskActive:
            return {
                ...state,
                active: {
                    ...action.payload
                }
            }

        case types.taskUpdate:
            return {
                ...state,
                tasks: state.tasks.map(
                    tasks => tasks.id === action.payload.id
                        ? action.payload.tasks
                        :
                        tasks
                )
            }

        default:
            return state
    }


}