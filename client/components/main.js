import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {colors} from './styles';
import Card from './card';
import Control from './control';
import {connect} from 'react-redux';
import { fetchWordList } from '../store';

const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  height: 100%;
  background: ${colors.background};
  text-align: center;
`;

const MainHeader = styled.header`
  margin-top: 4rem;
`;

const MainHeaderText = styled.h1`
  font-size: 4.6rem;
  font-family: "Galano Grotesque DEMO", "Futura", sans-serif;
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

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  margin-bottom: 8rem;
`;

const ControlWrapper = styled.div`
  display: flex;
`;

class Main extends Component {

  componentDidMount () {
    this.props.loadList();
  }

  componentDidUpdate () {
    if (this.props.currentCard === '') {
      console.log('Final Selections:');
      console.log(this.props.selections);
    }
  }

  render () {
    const { currentCard } = this.props;
    return (
      <MainDiv>
        <MainHeader>
          <MainHeaderText>MAKE UP YER MIND</MainHeaderText>
          <MainHeaderHr />
        </MainHeader>
        <Content>
          <Card name={currentCard !== '' ? currentCard : 'DONE!'} />
          <ControlWrapper>
            <Control name="dislike" direction="left" />
            <Control name="haven't tried" direction="down" />
            <Control name="like" direction="right" />
          </ControlWrapper>
        </Content>
      </MainDiv>
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
    loadList () {
      dispatch(fetchWordList());
    }
  };
};

export default connect(mapState, mapDispatch)(Main);

/**
 * PROP TYPES
 */
Main.propTypes = {
  currentCard: PropTypes.string.isRequired,
  selections: PropTypes.object.isRequired,
  loadList: PropTypes.func.isRequired,
};
