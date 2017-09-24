/**
 * ACTION TYPES
 */
const ADD_DISLIKED_TOPIC = 'ADD_DISLIKED_TOPIC';

/**
 * INITIAL STATE
 */
const startingList = [];

/**
 * ACTION CREATORS
 */
export const dislikeTopic = topic => ({type: ADD_DISLIKED_TOPIC, topic});

/**
 * REDUCER
 */
export default function (state = startingList, action) {
  switch (action.type) {
    case ADD_DISLIKED_TOPIC:
      return [...state, action.topic];
    default:
      return state;
  }
}
