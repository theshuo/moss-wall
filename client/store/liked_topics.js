/**
 * ACTION TYPES
 */
const ADD_LIKED_TOPIC = 'ADD_LIKED_TOPIC';

/**
 * INITIAL STATE
 */
const startingList = [];

/**
 * ACTION CREATORS
 */
export const likeTopic = topic => ({type: ADD_LIKED_TOPIC, topic});

/**
 * REDUCER
 */
export default function (state = startingList, action) {
  switch (action.type) {
    case ADD_LIKED_TOPIC:
      return [...state, action.topic];
    default:
      return state;
  }
}
