import React from 'react';
import styled, { keyframes } from 'styled-components';
import { colors } from './styles';

const rota = keyframes`
  to { transform: rotate(360deg); }
`;

const opa = keyframes`
  12.0% { opacity: 0.80; }
  19.5% { opacity: 0.88; }
  37.2% { opacity: 0.64; }
  40.5% { opacity: 0.52; }
  52.7% { opacity: 0.69; }
  60.2% { opacity: 0.60; }
  66.6% { opacity: 0.52; }
  70.0% { opacity: 0.63; }
  79.9% { opacity: 0.60; }
  84.2% { opacity: 0.75; }
  91.0% { opacity: 0.87; }
`;

const spinnerStyles = (num) => {
  switch (num) {
    case 1:
      return `
        background: ${colors.header};
        top: 0;
        left: 50%;
        margin-left: -.1em;
        transform-origin: 50% 250%;
        animation:
        ${rota} 1.13s linear infinite,
        ${opa} 3.67s ease-in-out infinite alternate;`;
    case 2:
      return `
        background: ${colors.topic};
        top: 50%;
        right: 0;
        margin-top: -.1em; /* Height/2 */
        transform-origin: -150% 50%;
        animation:
        ${rota} 1.86s linear infinite,
        ${opa} 4.29s ease-in-out infinite alternate;`;
    case 3:
      return `
        background: ${colors.header};
        bottom: 0;
        left: 50%;
        margin-left: -.1em;
        transform-origin: 50% -150%;
        animation:
        ${rota} 1.45s linear infinite,
        ${opa} 5.12s ease-in-out infinite alternate;`;
    case 4:
      return `
        background: ${colors.topic};
        top: 50%;
        left 0;
        margin-top -.1em;
        transform-origin: 250% 50%;
        animation:
        ${rota} 1.72s linear infinite,
        ${opa} 5.25s ease-in-out infinite alternate;`;
    default: return '';
    }
};

const SpinnerBody = styled.ul`
  font-size: 10rem;
  width: 1em;
  height: 1em;
  position: relative;
  list-style: none;
  border-radius: 50%;
  border: 2px solid ${colors.header};
`;

const SpinnerItem = styled.li`
  width: 0.2em;
  height: 0.2em;
  position: absolute;
  border-radius: 50%;
  ${props => spinnerStyles(props.num)}
`;

const Spinner = () => {
  const items = [1, 2, 3, 4];
  return (
    <SpinnerBody>
      { items.map(num => <SpinnerItem key={num} num={num} />) }
    </SpinnerBody>
  );
};

export default Spinner;
