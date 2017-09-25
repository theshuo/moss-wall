import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { colors, fonts } from './styles';
import Spinner from './spinner';
import {connect} from 'react-redux';

const Card = (props) => {
  const { name } = props;
  const CardDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 3.8rem;
    border: 1px solid ${colors.cardBorder};
    border-radius: 20px;
    padding: 4.2rem 6.4rem;
    text-align: center;
    background: ${colors.card};
  `;

  const CardName = styled.p`
    font-size: 2.8rem;
    font-family: ${fonts.body};
    color: ${colors.header};
  `;


  return (
    <CardDiv>
      { name.length ? <CardName>{name}</CardName> : <Spinner /> }
    </CardDiv>
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

export default connect(mapState, mapDispatch)(Card);

/**
 * PROP TYPES
 */
Card.propTypes = {
  name: PropTypes.string.isRequired,
};
