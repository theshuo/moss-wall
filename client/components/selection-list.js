import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { colors, fonts } from './styles';

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  font-family: ${fonts.body};
  font-size: 2.2rem;
  color: ${colors.header};
`;

const ListHeader = styled.h2`
  font-family: ${fonts.title};
  font-size: 3.2rem;
`;

const List = styled.ul`
  width: 26rem;
  list-style: none;
  color: ${colors.topic};
`;

const ListItem = styled.li`
  margin-top: 1.2rem;
  border-bottom: 1px solid ${colors.header};
  padding-bottom: 1.2rem;
`;

const SelectionList = (props) => {

  const { name, list } = props;
  if (!list.length) return (<ListWrapper />);
  return (
    <ListWrapper>
      <ListHeader>{name}</ListHeader>
      <List>
        { list.map(item => <ListItem key={item}>{item}</ListItem> ) }
      </List>
    </ListWrapper>
  );
};

export default SelectionList;

/**
 * PROP TYPES
 */
Selection.propTypes = {
  name: PropTypes.string.isRequired,
  list: PropTypes.array.isRequired,
};
