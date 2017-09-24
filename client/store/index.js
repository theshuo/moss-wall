import {createStore, combineReducers, applyMiddleware} from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import wordQueue from './word_queue';
import likedTopics from './liked_topics';
import dislikedTopics from './disliked_topics';
import untriedTopics from './untried_topics';
import results from './results';

const reducer = combineReducers({ wordQueue, likedTopics, dislikedTopics, untriedTopics, results });
const middleware = applyMiddleware(thunkMiddleware, createLogger({collapsed: true}));
const store = createStore(reducer, middleware);

export default store;
export * from './word_queue';
export * from './liked_topics';
export * from './disliked_topics';
export * from './untried_topics';
export * from './results';
