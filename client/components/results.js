import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {connect} from 'react-redux';
import { fetchWordList, clearResults, clearLikedTopics, clearDislikedTopics, clearUntriedTopics } from '../store';

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  margin-bottom: 8rem;
`;

const Path = styled.ul`
  font-size: 2.2rem;
`;

const PathItem = styled.ul`
  color: #249190;
`;

const ResetButton = styled.button`
  background: #aeae42;
`;

const Results = (props) => {

  const { path, event, reset } = props;
  return (
    <Content>
      <h2>Here's your result</h2>
      <Path>
        { path.map(step => <PathItem key={step.name}>{step.name}</PathItem>) }
      </Path>
      <p>so you should try:</p>
      <h3>{event.name}</h3>
      <h4>{event.venue.address_1}</h4>
      <ResetButton onClick={reset}>
        You wanted something different, right?
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
