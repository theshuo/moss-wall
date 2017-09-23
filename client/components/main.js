import React from 'react';
// import PropTypes from 'prop-types';
import {connect} from 'react-redux';
// import {logout} from '../store';

const Main = () => {

  return (
    <div id="main">
      <h1>MAKE UP YER MIND</h1>
      <hr />
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = () => ({});
// const mapState = (state) => {
//   return {
//   };
// };

const mapDispatch = () => ({});
// const mapDispatch = (dispatch) => {
//   return {
//   };
// };

export default connect(mapState, mapDispatch)(Main);

/**
 * PROP TYPES
 */
// Main.propTypes = {
// };
