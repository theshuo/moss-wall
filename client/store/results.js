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
const loadResults = results => ({type: LOAD_RESULTS, results});
export const clearResults = () => ({type: CLEAR_RESULTS});

/**
 * THUNK CREATORS
 */

export const fetchResults = (selections) =>
  (dispatch) =>
    dispatch(loadResults({
      path: [{name: 'wine',  simToPrev: 0}, { name: 'social', simToPrev: 0.238123}, {name: 'Fun Times', simToPrev: 0.8575}],
      event: {name: 'some event', venue: {
        country: 'us',
        localized_country_name: 'USA',
        city: 'Chicago ',
        address_1: '127 W Huron Street',
        name: 'IO Godfrey Rooftop Lounge ',
        lon: -87.632156,
        id: 24740306,
        state: 'IL',
        lat: 41.894588,
        repinned: false
        }},
    }));
// axios POST to api/results/

/**
 * REDUCER
 */
export default function (state = emptyResults, action) {
  switch (action.type) {
    case LOAD_RESULTS:
      return action.results;
    case CLEAR_RESULTS:
      return emptyResults;
    default:
      return state;
  }
}
