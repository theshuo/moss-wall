/**
 * ACTION TYPES
 */
const ADD_UNTRIED_TOPIC = 'ADD_UNTRIED_TOPIC';
const CLEAR_UNTRIED_TOPICS = 'CLEAR_UNTRIED_TOPICS';

/**
 * INITIAL STATE
 */
const startingList = [];

/**
 * ACTION CREATORS
 */
export const haveNotTried = topic => ({type: ADD_UNTRIED_TOPIC, topic});
export const clearUntriedTopics = () => ({type: CLEAR_UNTRIED_TOPICS});

/**
 * REDUCER
 */
export default function (state = startingList, action) {
  switch (action.type) {
    case ADD_UNTRIED_TOPIC:
      return [...state, action.topic];
    case CLEAR_UNTRIED_TOPICS:
      return startingList;
    default:
      return state;
  }
}
