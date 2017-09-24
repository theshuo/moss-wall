// import axios from 'axios';

/**
 * ACTION TYPES
 */
const CREATE_QUEUE = 'CREATE_QUEUE';
const ADD_WORD_TO_QUEUE = 'ADD_WORD_TO_QUEUE';
const POP_WORD_OFF_QUEUE = 'POP_WORD_OFF_QUEUE';

/**
 * INITIAL STATE
 */
const startingQueue = [];

/**
 * ACTION CREATORS
 */
export const createQueue = queue => ({type: CREATE_QUEUE, queue});
export const addWord = word => ({type: ADD_WORD_TO_QUEUE, word});
export const popWord = () => ({type: POP_WORD_OFF_QUEUE});

/**
 * THUNK CREATORS
 */

/**
 * REDUCER
 */
export default function (state = startingQueue, action) {
  switch (action.type) {
    case CREATE_QUEUE:
      return action.queue;
    case ADD_WORD_TO_QUEUE:
      return [...state, action.word];
    case POP_WORD_OFF_QUEUE:
      return state.slice(1);
    default:
      return state;
  }
}
