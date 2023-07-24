import { Component } from 'react';
import css from './ContactForm.module.css';
import PropTypes from 'prop-types';

export class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { name, number } = this.state;
    this.props.onAddContact(name, number);
    this.setState({ name: '', number: '' });
  };
  render() {
    const { name, number } = this.state;
    const { error } = this.props;

    return (
      <form className={css.contact__form} onSubmit={this.handleSubmit}>
        {error && <p>{error}</p>}
        <input
          className={css.contact__input}
          type="text"
          name="name"
          placeholder="Contact name"
          pattern="^[A-Za-z.'\\- \]+$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={this.handleInputChange}
        />
        <input
          className={css.contact__input}
          type="tel"
          name="number"
          placeholder="Number"
          pattern="^\\+?\\d{1,4}?\\s?\\(?\\d{1,4}?\\)?\\s?\\d{1,4}\\s?\\d{1,4}\\s?\\d{1,9}$"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
          onChange={this.handleInputChange}
        />
        <button className={css.contact__button} type="submit">
          Add Contact
        </button>
      </form>
    );
  }
}
ContactForm.propTypes = {
  onAddContact: PropTypes.func.isRequired,
};
