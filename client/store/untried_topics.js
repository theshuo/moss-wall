/**
 * ACTION TYPES
 */
const ADD_UNTRIED_TOPIC = 'ADD_UNTRIED_TOPIC';

/**
 * INITIAL STATE
 */
const startingList = [];

/**
 * ACTION CREATORS
 */
export const haveNotTried = topic => ({type: ADD_UNTRIED_TOPIC, topic});

/**
 * REDUCER
 */
export default function (state = startingList, action) {
  switch (action.type) {
    case ADD_UNTRIED_TOPIC:
      return [...state, action.topic];
    default:
      return state;
  }
}
