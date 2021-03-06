import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { colors, fonts } from './styles';
import SelectionList from './selection-list.js';
import Selection from './selection';
import Results from './results';
import { connect } from 'react-redux';
import { fetchWordList } from '../store';

const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  min-height: 100%;
  background: ${colors.background};
  text-align: center;
`;

const MainHeader = styled.header`margin-top: 4rem;`;

const MainHeaderText = styled.h1`
  font-size: 10rem;
  font-family: ${fonts.title};
  color: ${colors.header};
`;

const MainHeaderHr = styled.hr`
  width: 100%;
  height: 2px;
  max-width: 200px;
  margin: 1rem auto;
  border: none;
  border-radius: 1px;
  background: ${colors.header};
`;

const MainContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex: 1;
  margin-top: 4.6rem;
`;

class Main extends Component {
  componentDidMount() {
    this.props.loadList();
  }

  render() {
    const { liked, disliked, hasResults } = this.props;
    return (
      <MainDiv>
        <MainHeader>
          <MainHeaderText>SAY YES.</MainHeaderText>
          <MainHeaderHr />
        </MainHeader>
        <MainContent>
          <SelectionList name="Disliked" list={disliked} />
          {hasResults ? <Results /> : <Selection />}
          <SelectionList name="Liked" list={liked} />
        </MainContent>
      </MainDiv>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    liked: state.likedTopics,
    disliked: state.dislikedTopics,
    hasResults: !!state.results.path,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadList() {
      dispatch(fetchWordList());
    },
  };
};

export default connect(mapState, mapDispatch)(Main);

/**
 * PROP TYPES
 */
Main.propTypes = {
  liked: PropTypes.array.isRequired,
  disliked: PropTypes.array.isRequired,
  hasResults: PropTypes.bool.isRequired,
  loadList: PropTypes.func.isRequired,
};
