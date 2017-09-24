/**
 * ACTION TYPES
 */
const ADD_DISLIKED_TOPIC = 'ADD_DISLIKED_TOPIC';
const CLEAR_DISLIKED_TOPICS = 'CLEAR_DISLIKED_TOPICS';

/**
 * INITIAL STATE
 */
const startingList = [];

/**
 * ACTION CREATORS
 */
export const dislikeTopic = topic => ({type: ADD_DISLIKED_TOPIC, topic});
export const clearDislikedTopics = () => ({type: CLEAR_DISLIKED_TOPICS});

/**
 * REDUCER
 */
export default function (state = startingList, action) {
  switch (action.type) {
    case ADD_DISLIKED_TOPIC:
      return [...state, action.topic];
    case CLEAR_DISLIKED_TOPICS:
      return startingList;
    default:
      return state;
  }
}
