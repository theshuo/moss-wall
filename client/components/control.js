import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {colors} from './styles';
import Pointer from './pointer';
import {connect} from 'react-redux';
import {popWord} from '../store';

const Control = (props) => {
  const { name, direction, currentCard, processCard } = props;
  const ControlDiv = styled.div`
    width: 100px;
    height: 100px;
    font-size: 1.8rem;
    color: ${colors.header};
    text-align: center;
    cursor: pointer;
  `;

  const handleClick = () => {
    processCard(currentCard);
  };

  return (
    <ControlDiv onClick={handleClick}>
      <p>{name}</p>
      <Pointer direction={direction} />
    </ControlDiv>
  );
};

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    currentCard: state.wordQueue[0] || '',
  };
};

const mapDispatch = (dispatch, ownProps) => {
  return {
    processCard (word) {
      if (!word.length) return;
      dispatch(popWord());
      console.log(`add ${word} to list: ${ownProps.name}`);
    },
  };
};

export default connect(mapState, mapDispatch)(Control);

/**
 * PROP TYPES
 */
Control.propTypes = {
  name: PropTypes.string.isRequired,
  direction: PropTypes.string.isRequired,
  currentCard: PropTypes.string.isRequired,
  processCard: PropTypes.func.isRequired,
};
