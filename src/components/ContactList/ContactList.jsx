import React from 'react';
import { ContactItem } from './ContactItem/ContactItem';
import css from './ContactList.module.css';
import PropTypes from 'prop-types';

export const ContactList = ({ contacts, onDeleteContact, onEditContact }) => {
  return (
    <ul className={css.contact__list}>
      {contacts.map(contact => (
        <ContactItem
          key={contact.id}
          contact={contact}
          onDeleteContact={onDeleteContact}
          onEditContact={onEditContact}
        />
      ))}
    </ul>
  );
};
ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.number.isRequired,
    })
  ).isRequired,
  onDeleteContact: PropTypes.func.isRequired,
  onEditContact: PropTypes.func.isRequired,
};
