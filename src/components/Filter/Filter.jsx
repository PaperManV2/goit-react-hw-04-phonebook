import React from 'react';
import css from './Filter.module.css';
import PropTypes from 'prop-types';

export const Filter = ({ value, onChange }) => {
  return (
    <input
      className={css.contact__sortItem}
      type="text"
      name="filter"
      placeholder="Search by name"
      value={value}
      onChange={onChange}
    />
  );
};

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
