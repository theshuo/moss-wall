import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { colors, fonts } from './styles';
import {connect} from 'react-redux';
import { fetchWordList, clearResults, clearLikedTopics, clearDislikedTopics, clearUntriedTopics } from '../store';

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  margin-bottom: 8rem;
  font-family: ${fonts.body};
  color: ${colors.header};
`;

const Result = styled.div`
  margin-bottom: 3.8rem;
  border: 1px solid ${colors.cardBorder};
  border-radius: 20px;
  padding: 4.2rem 6.4rem;
  text-align: center;
  font-size: 2.2rem;
  background: ${colors.card};
`;

const ResultHeader = styled.h2`
  margin-bottom: 1.2rem;
  font-family: ${fonts.title};
  font-size: 4.2rem;
`;

const Path = styled.ol`
  margin: 1.8rem;
  font-size: 2.2rem;
  list-style: none;
`;

const PathItem = styled.li`
  margin-bottom: 0.5rem;
  font-size: 2.4rem;
  color: #249190;
`;

const PathName = styled.span`
  color: #249190;
`;

const Event = styled.h3`
  font-family: ${fonts.title};
  font-size: 3.0rem;
`;

const ResetButton = styled.button`
  border: 2px solid ${colors.cardBorder};
  border-radius: 20px;
  padding: 1.2rem 2.4rem;
  text-align: center;
  font-family: ${fonts.body};
  font-size: 2.2rem;
  background: #aaeaea;
  color: ${colors.header};
  &:hover {
    background: #cefece;
  }
`;

const Results = (props) => {

  const { path, event, reset } = props;
  return (
    <Content>
      <Result>
        <ResultHeader>Let's go on a journey</ResultHeader>
        <p>You must like <PathName>{path[0].name}</PathName></p>
        <p>But if we go down this path...</p>
        <Path>
          { path.map((step) => <PathItem key={step.name}>{step.name}</PathItem>) }
        </Path>
        <p>we find out you might like:</p>
        <br />
        <Event>{event.name}</Event>
        <Event>{event.venue.address_1}</Event>
      </Result>
      <ResetButton onClick={reset}>
        Too scared to give it a shot?
      </ResetButton>
    </Content>
  );
};

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    path: state.results.path,
    event: state.results.event,
  };
};

const mapDispatch = dispatch => {
  return {
    reset () {
      dispatch(clearResults());
      dispatch(fetchWordList());
      dispatch(clearLikedTopics());
      dispatch(clearDislikedTopics());
      dispatch(clearUntriedTopics());
    }
  };
};

export default connect(mapState, mapDispatch)(Results);

/**
 * PROP TYPES
 */
Results.propTypes = {
  path: PropTypes.array.isRequired,
  event: PropTypes.object.isRequired,
  reset: PropTypes.func.isRequired,
};
