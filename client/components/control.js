import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {colors} from './styles';
import {connect} from 'react-redux';

const Control = (props) => {
  const { name, direction } = props;
  const ControlDiv = styled.div`
    width: 100px;
    height: 100px;
    text-align: center;
  `;

  const pointerDir = {
    left: (size) => `
      border-top: ${size} solid transparent;
      border-right: ${size} solid ${colors.header};
      border-bottom: ${size} solid transparent;
    `,
    right: (size) => `
      border-top: ${size} solid transparent;
      border-left: ${size} solid ${colors.header};
      border-bottom: ${size} solid transparent;
    `,
  };

  const Pointer = styled.div`
    width: 0;
    height: 0;
    ${ pointerDir[direction]('20px') }
  `;


  return (
    <ControlDiv>
      <p>{name}</p>
      <Pointer />
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
