import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {colors} from './styles';
import Card from './card';
import Control from './control';
import {connect} from 'react-redux';
import {createQueue} from '../store';

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
  constructor (props) {
    super(props);
    this.dummyQueue = ['Snoozing', 'Biking', 'Social Dancing', 'Water Sports', 'Programming', 'Chess'];
  }

  componentDidMount () {
    this.props.setList(this.dummyQueue);
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
          <Card name={currentCard} />
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
    currentCard: state.wordQueue[0] || 'DONE!',
  };
};

const mapDispatch = dispatch => {
  return {
    setList (list) {
      dispatch(createQueue(list));
    }
  };
};

export default connect(mapState, mapDispatch)(Main);

/**
 * PROP TYPES
 */
Main.propTypes = {
  currentCard: PropTypes.string.isRequired,
  setList: PropTypes.func.isRequired,
};
