import axios from 'axios';

/**
 * ACTION TYPES
 */
const LOAD_RESULTS = 'LOAD_RESULTS';
const CLEAR_RESULTS = 'CLEAR_RESULTS';

/**
 * INITIAL STATE
 */
const emptyResults = {};

/**
 * ACTION CREATORS
 */
const loadResults = (results) => ({ type: LOAD_RESULTS, results });
export const clearResults = () => ({ type: CLEAR_RESULTS });

/**
 * THUNK CREATORS
 */

export const fetchResults = (selections) => (dispatch) =>
  axios
    .post('/api/recommendations', selections)
    .then((res) => dispatch(loadResults(res.data)))
    .catch((err) => console.error(err));

/**
 * REDUCER
 */
export default function(state = emptyResults, action) {
  switch (action.type) {
    case LOAD_RESULTS:
      return action.results;
    case CLEAR_RESULTS:
      return emptyResults;
    default:
      return state;
  }
}
