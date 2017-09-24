import React from 'react';
import PropTypes from 'prop-types';
import {colors} from './styles';

const align = {
  left: 'translate(41 1) scale(-1 1)',
  right: 'translate(1 1)',
  down: 'translate(1 1) rotate(90, 20, 20)',
  none: 'translate(1 1)',
};

const Pointer = (props) => {
  const direction = props.direction || 'none';
  return (
    <svg width="42" height="42" viewBox="0 0 42 42">
      <g transform={align[direction]} stroke="#9E9895" strokewidth="2" fill="none">
        <circle fill="#F7F7F7" cx="20" cy="20" r="20" />
        <path
          d="M16.716 12.58l7.275 6.68c.408.373.435 1.006.06 1.413-.018.02-.038.04-.06.06l-7.274 6.68"
          stroke={colors.header}
          strokeLinecap="round"
          strokeLinejoin="round" />
      </g>
    </svg>
  );
};

export default Pointer;

/**
 * PROP TYPES
 */
Pointer.propTypes = {
  direction: PropTypes.string,
};
