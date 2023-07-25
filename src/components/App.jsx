import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import css from './App.module.css';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    try {
      const storedContacts = localStorage.getItem('contacts');
      if (storedContacts) {
        setContacts(JSON.parse(storedContacts));
      }
    } catch (error) {
      console.log('Błąd odczytu z localStorage:', error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    } catch (error) {
      console.log('Błąd zapisu do localStorage:', error);
    }
  }, [contacts]);

  const handleAddContact = (name, number) => {
    const isContactExists = contacts.some(
      contact =>
        contact.name.toLowerCase() === name.toLowerCase() ||
        contact.number === number
    );

    if (isContactExists) {
      alert(
        `Kontakt o nazwie "${name}" lub wpisany numer "${number}" znajdują się już na liście!`
      );
      return;
    }

    const contact = {
      id: nanoid(),
      name: name,
      number: number,
    };

    const updatedContacts = [...contacts, contact].sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    setContacts(updatedContacts);
  };

  const handleDeleteContact = contactId => {
    const updatedContacts = contacts.filter(
      contact => contact.id !== contactId
    );
    setContacts(updatedContacts);
  };

  const handleEditContact = (contactId, editedName, editedNumber) => {
    const updatedContacts = contacts.map(contact => {
      if (contact.id === contactId) {
        return {
          ...contact,
          name: editedName,
          number: editedNumber,
        };
      }
      return contact;
    });

    setContacts(updatedContacts);
  };

  const handleSortOrderChange = () => {
    setSortOrder(prevSortOrder => (prevSortOrder === 'asc' ? 'desc' : 'asc'));
  };

  const handleFilterChange = event => {
    setFilter(event.target.value);
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  const sortedContacts = filteredContacts.sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.name.localeCompare(b.name);
    } else {
      return b.name.localeCompare(a.name);
    }
  });

  return (
    <div className={css.phonebook}>
      <h1 className={css.phonebook__title}>Phonebook</h1>
      <ContactForm onAddContact={handleAddContact} />

      <h2 className={css.contacts__title}>Contacts</h2>
      <button className={css.sort__button} onClick={handleSortOrderChange}>
        Sort {sortOrder === 'asc' ? 'A-Z' : 'Z-A'}
      </button>
      <Filter value={filter} onChange={handleFilterChange} />
      <ContactList
        contacts={sortedContacts}
        onDeleteContact={handleDeleteContact}
        onEditContact={handleEditContact}
      />
    </div>
  );
};
