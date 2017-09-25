import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { colors, fonts } from './styles';
import Pointer from './pointer';
import {connect} from 'react-redux';
import { popWord, likeTopic, dislikeTopic, haveNotTried } from '../store';

const Control = (props) => {
  const { name, direction, currentCard, processCard } = props;
  const ControlDiv = styled.div`
    width: 100px;
    height: 100px;
    text-align: center;
    cursor: pointer;
  `;

  const ControlText = styled.p`
    font-family: ${fonts.body};
    font-size: 1.8rem;
    color: ${colors.header};
  `;

  const handleClick = () => {
    processCard(currentCard);
  };

  return (
    <ControlDiv onClick={handleClick}>
      <ControlText>{name}</ControlText>
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
  let addToList;
  switch (ownProps.name) {
    case 'like':
      addToList = word => dispatch(likeTopic(word));
      break;
    case 'dislike':
      addToList = word => dispatch(dislikeTopic(word));
      break;
    case 'haven\'t tried':
      addToList = word => dispatch(haveNotTried(word));
      break;
    default:
      addToList = () => null;
  }
  return {
    processCard (word) {
      if (!word.length) return;
      dispatch(popWord());
      addToList(word);
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
