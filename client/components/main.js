import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import {colors} from './styles';
import Control from './control';
import {connect} from 'react-redux';

const Main = () => {

  const MainDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    height: 100%;
    background: ${colors.background};
    text-align: center;
  `;

  const MainHeader = styled.header`
    margin: 4rem 0;
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
    flex: 1;
    font-size: 1.8rem;
    font-family: "Nunito", sans-serif;
  `;

  return (
    <MainDiv>
      <MainHeader>
        <MainHeaderText>MAKE UP YER MIND</MainHeaderText>
        <MainHeaderHr />
      </MainHeader>
      <Content>
        <Control name="dislike" direction="left" />
        <Control name="like" direction="right" />
      </Content>
    </MainDiv>
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

export default connect(mapState, mapDispatch)(Main);

/**
 * PROP TYPES
 */
// Main.propTypes = {
// };
