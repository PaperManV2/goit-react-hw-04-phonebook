import React from 'react';
import { ContactItem } from './ContactItem/ContactItem';
import css from './ContactList.module.css';

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
