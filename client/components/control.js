import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {colors} from './styles';
import Pointer from './pointer';
import {connect} from 'react-redux';

const Control = (props) => {
  const { name, direction } = props;
  const ControlDiv = styled.div`
    width: 100px;
    height: 100px;
    font-size: 1.8rem;
    color: ${colors.header};
    text-align: center;
  `;

  return (
    <ControlDiv>
      <p>{name}</p>
      <Pointer direction={direction} />
    </ControlDiv>
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

export default connect(mapState, mapDispatch)(Control);

/**
 * PROP TYPES
 */
Control.propTypes = {
  name: PropTypes.string.isRequired,
  direction: PropTypes.string.isRequired,
};
