import React from 'react';
// import PropTypes from 'prop-types';
import {connect} from 'react-redux';
// import {logout} from '../store';

const Main = () => {
  let colors = {
    background: '#95DBCC',
    header: '#472E0E',
  };
  let styles = {
    main: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
      height: '100%',
      background: colors.background,
      textAlign: 'center',
    },
    header: {
      margin: '4rem 0',
    },
    headerText: {
      fontSize: '4.6rem',
      fontFamily: '"Galano Grotesque DEMO", "Futura", sans-serif',
      color: colors.header,
    },
    headerHr: {
      width: '100%',
      height: '2px',
      maxWidth: '200px',
      margin: '1rem auto',
      border: 'none',
      borderRadius: '1px',
      background: colors.header,
    },
    content: {
      flex: 1,
      fontSize: '1.8rem',
      fontFamily: '"Nunito", sans-serif',
    },
  };
  return (
    <div id="main" style={styles.main}>
      <header style={styles.header}>
        <h1 style={styles.headerText}>MAKE UP YER MIND</h1>
        <hr style={styles.headerHr} />
      </header>
      <div id="content" style={styles.content}>
        <p>what ya gonna do?</p>
      </div>
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
