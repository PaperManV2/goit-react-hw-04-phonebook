import React, { useState } from 'react';
import css from './ContactForm.module.css';
import PropTypes from 'prop-types';

export const ContactForm = ({ onAddContact }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = event => {
    const { name, value } = event.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'number') {
      setNumber(value);
    }
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (!name || !number) {
      setError('Please enter a name and number');
      return;
    }

    onAddContact(name, number);
    setName('');
    setNumber('');
    setError('');
  };

  return (
    <form className={css.contact__form} onSubmit={handleSubmit}>
      {error && <p>{error}</p>}
      <input
        className={css.contact__input}
        type="text"
        name="name"
        placeholder="Contact name"
        pattern="^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]+([-'\\s][a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]+)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        value={name}
        onChange={handleInputChange}
      />
      <input
        className={css.contact__input}
        type="text"
        name="number"
        placeholder="Number"
        pattern="^\\+?\\d{1,4}[-.\\s]?\\(?\d{1,3}\\)?[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,9}$"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        value={number}
        onChange={handleInputChange}
      />
      <button className={css.contact__button} type="submit">
        Add Contact
      </button>
    </form>
  );
};

ContactForm.propTypes = {
  onAddContact: PropTypes.func.isRequired,
};
