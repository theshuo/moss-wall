import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {colors} from './styles';
import Selection from './selection';
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

class Main extends Component {

  componentDidMount () {
    this.props.loadList();
  }

  render () {
    return (
      <MainDiv>
        <MainHeader>
          <MainHeaderText>MAKE UP YER MIND</MainHeaderText>
          <MainHeaderHr />
        </MainHeader>
        <Selection />
      </MainDiv>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    results: state.results,
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
  // results: PropTypes.object.isRequired,
  loadList: PropTypes.func.isRequired,
};
