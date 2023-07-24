import { Component } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import css from './App.module.css';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
    sortOrder: 'asc',
  };
  //localStorage
  componentDidMount() {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      this.setState({ contacts: JSON.parse(storedContacts) });
    }
  }
  //aktualizacja
  componentDidUpdate(prevState) {
    const { contacts } = this.state;
    if (prevState.contacts !== contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  handleAddContact = (name, number) => {
    const { contacts } = this.state;

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

    this.setState({ contacts: updatedContacts });
  };

  handleDeleteContact = contactId => {
    const { contacts } = this.state;
    const updatedContacts = contacts.filter(
      contact => contact.id !== contactId
    );
    this.setState({ contacts: updatedContacts });
  };

  handleEditContact = (contactId, editedName, editedNumber) => {
    const { contacts } = this.state;
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

    this.setState({ contacts: updatedContacts });
  };

  handleSortOrderChange = () => {
    this.setState(prevState => ({
      sortOrder: prevState.sortOrder === 'asc' ? 'desc' : 'asc',
    }));
  };

  handleFilterChange = event => {
    this.setState({ filter: event.target.value });
  };
  render() {
    const { contacts, filter, sortOrder } = this.state;

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
        <ContactForm onAddContact={this.handleAddContact} />

        <h2 className={css.contacts__title}>Contacts</h2>
        <button
          className={css.sort__button}
          onClick={this.handleSortOrderChange}
        >
          Sort {sortOrder === 'asc' ? 'Descending' : 'Ascending'}
        </button>
        <Filter value={filter} onChange={this.handleFilterChange} />
        <ContactList
          contacts={sortedContacts}
          onDeleteContact={this.handleDeleteContact}
          onEditContact={this.handleEditContact}
        />
      </div>
    );
  }
}
App.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.number.isRequired,
    })
  ).isRequired,
  filter: PropTypes.string.isRequired,
  sortOrder: PropTypes.oneOf(['asc', 'desc']).isRequired,
  onAddContact: PropTypes.func.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
  onEditContact: PropTypes.func.isRequired,
  handleSortOrderChange: PropTypes.func.isRequired,
  handleFilterChange: PropTypes.func.isRequired,
};
