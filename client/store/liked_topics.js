/**
 * ACTION TYPES
 */
const ADD_LIKED_TOPIC = 'ADD_LIKED_TOPIC';
const CLEAR_LIKED_TOPICS = 'CLEAR_LIKED_TOPICS';

/**
 * INITIAL STATE
 */
const startingList = [];

/**
 * ACTION CREATORS
 */
export const likeTopic = topic => ({type: ADD_LIKED_TOPIC, topic});
export const clearLikedTopics = () => ({type: CLEAR_LIKED_TOPICS});

/**
 * REDUCER
 */
export default function (state = startingList, action) {
  switch (action.type) {
    case ADD_LIKED_TOPIC:
      return [...state, action.topic];
    case CLEAR_LIKED_TOPICS:
      return startingList;
    default:
      return state;
  }
}
