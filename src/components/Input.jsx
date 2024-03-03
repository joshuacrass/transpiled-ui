import React, { useState, useRef } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import Icon from './Icon';
import validateAutocompleteValue from '../utils/autoCompleteValidation';

const defaultColors = {
  border: '#ccc',
  borderFocus: '#1554bb',
  labelColor: '#aaa',
  placeholderColor: '#565656',
};

const sizeVariants = {
  // INPUT: the text the user is typing
  // LABEL: the text that is on top of the input
  // PLACEHOLDER: the text that is shown in the input field prior to typing

  s: {
    inputPadding: '4px 8px',
    inputFontSize: '1rem',
    labelFontSize: '0.7rem',
    labelTop: '-0.9rem',
    labelLeft: '0rem',
    placeholderFontSize: '0.8rem',
    placeholderTop: '0.5rem',
    placeholderLeft: '0.6rem',
  },
  m: {
    inputPadding: '6px 10px',
    inputFontSize: '1.2rem',
    labelFontSize: '0.9rem',
    labelTop: '-1.2rem',
    labelLeft: '0rem',
    placeholderFontSize: '1rem',
    placeholderTop: '0.5rem',
    placeholderLeft: '0.7rem',
  },
  l: {
    inputPadding: '8px 11px',
    inputFontSize: '1.4rem',
    labelFontSize: '1rem',
    labelTop: '-1.4rem',
    labelLeft: '0rem',
    placeholderFontSize: '1.2rem',
    placeholderTop: '0.7rem',
    placeholderLeft: '0.7rem',
  },
  xl: {
    inputPadding: '10px 11px',
    inputFontSize: '1.6rem',
    labelFontSize: '1.1rem',
    labelTop: '-1.6rem',
    labelLeft: '0rem',
    placeholderFontSize: '1.4rem',
    placeholderTop: '0.8rem',
    placeholderLeft: '0.7rem',
  },
};

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.border || defaultColors.border};
  border-left: 3px solid ${({ theme }) => theme.border || defaultColors.border};
  box-sizing: border-box;

  &:focus-within {
    border-left: 3px solid
      ${({ theme }) => theme.borderFocus || defaultColors.borderFocus};
    border-color: ${({ theme }) =>
      theme.borderFocus || defaultColors.borderFocus};
  }
`;

const StyledInput = styled.input`
  position: relative;
  display: block;
  width: 100%;
  outline: none;
  border: none;
  padding: ${({ size }) => sizeVariants[size].inputPadding};
  font-family: inherit;
  font-size: ${({ size }) => sizeVariants[size].inputFontSize};
  transition: border-color 0.3s, border-left-width 0.3s;
  overflow: hidden;
  text-overflow: ellipsis;
  box-sizing: border-box;
  white-space: nowrap;

  &:focus {
    &::placeholder {
      color: transparent;
    }
  }

  &:focus + label,
  &:not(:placeholder-shown) + label {
    top: ${({ size }) => sizeVariants[size].labelTop};
    left: ${({ size }) => sizeVariants[size].labelLeft};
    font-size: ${({ size }) => sizeVariants[size].labelFontSize};
    color: ${({ theme }) => theme.labelColor || defaultColors.labelColor};
  }
`;

const PlaceholderLabel = styled.label`
  position: absolute;
  top: ${({ size }) => sizeVariants[size].placeholderTop};
  left: ${({ size }) => sizeVariants[size].placeholderLeft};
  font-size: ${({ size }) => sizeVariants[size].placeholderFontSize};
  color: ${({ theme }) =>
    theme.placeholderColor || defaultColors.placeholderColor};
  transition: all 0.3s;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 90%;
`;

const ClearableIcon = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin: 0 0.5rem;
`;

const Input = ({
  id,
  placeholder,
  name,
  type,
  autocomplete,
  size = 'm',
  clearable = false,
}) => {
  const inputRef = useRef(null);
  const [value, setValue] = useState('');
  const [label, setLabel] = useState(placeholder);

  const handleChnange = (e) => {
    setValue(e.target.value);
    console.log(e.target.value);
  };

  return (
    <Container>
      <StyledInput
        id={id}
        ref={inputRef}
        placeholder={label ? '' : placeholder}
        name={name}
        type={type}
        autoComplete={autocomplete || 'off'}
        size={size}
        clearable={clearable}
        onChange={(e) => {
          handleChnange(e);
        }}
        value={value}
      />
      <PlaceholderLabel size={size} htmlFor={id}>
        {placeholder}
      </PlaceholderLabel>
      <ClearableIcon>
        {clearable && value && (
          <Icon
            size='1x'
            iconType='solid'
            iconName='close'
            onClick={() => {
              setValue('');
              inputRef.current.focus();
            }}
          />
        )}
      </ClearableIcon>
    </Container>
  );
};

Input.propTypes = {
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  autocomplete: validateAutocompleteValue,
  size: PropTypes.oneOf(['s', 'm', 'l', 'xl']),
  clearable: PropTypes.bool,
};

Input.defaultProps = {
  autocomplete: 'off',
  size: 'm',
  clearable: false,
};

export default Input;
