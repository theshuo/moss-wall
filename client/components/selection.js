import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SelectionList from './selection-list.js';
import Card from './card';
import Control from './control';
import {connect} from 'react-redux';
import { fetchResults } from '../store';

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  margin-bottom: 8rem;
`;

const SelctionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  align-items: center;
`;

const ControlWrapper = styled.div`
  display: flex;
`;

class Selection extends Component {

  componentDidUpdate () {
    if (this.props.currentCard === '') this.props.submitList(this.props.selections);
  }

  render () {
    const { currentCard, selections } = this.props;
    return (
      <Content>
        <SelectionList name="Disliked" list={selections.no} />
        <SelctionWrapper>
          <Card name={currentCard} />
          <ControlWrapper>
            <Control name="dislike" direction="left" />
            <Control name="haven't tried" direction="down" />
            <Control name="like" direction="right" />
          </ControlWrapper>
        </SelctionWrapper>
        <SelectionList name="Liked" list={selections.yes} />
      </Content>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    currentCard: state.wordQueue[0] || '',
    selections: {
      yes: state.likedTopics,
      no: state.dislikedTopics,
      untried: state.untriedTopics,
    },
  };
};

const mapDispatch = dispatch => {
  return {
    submitList (list) {
      dispatch(fetchResults(list));
    }
  };
};

export default connect(mapState, mapDispatch)(Selection);

/**
 * PROP TYPES
 */
Selection.propTypes = {
  currentCard: PropTypes.string.isRequired,
  selections: PropTypes.object.isRequired,
  submitList: PropTypes.func.isRequired,
};
