import { Component } from 'react';
import css from './ContactItem.module.css';
import PropTypes from 'prop-types';

export class ContactItem extends Component {
  state = {
    isEditing: false,
    editedName: '',
    editedNumber: '',
  };

  handleEdit = () => {
    const { contact } = this.props;
    this.setState({
      isEditing: true,
      editedName: contact.name,
      editedNumber: contact.number,
    });
  };

  handleCancel = () => {
    this.setState({ isEditing: false });
  };

  handleSave = () => {
    const { contact, onEditContact } = this.props;
    const { editedName, editedNumber } = this.state;
    onEditContact(contact.id, editedName, editedNumber);
    this.setState({ isEditing: false });
  };

  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    const { contact, onDeleteContact } = this.props;
    const { isEditing, editedName, editedNumber } = this.state;

    return (
      <li className={css.contact__item}>
        <div className={css.contact__name}>
          <strong>Name: </strong>
          {isEditing ? (
            <input
              type="text"
              name="editedName"
              value={editedName}
              onChange={this.handleInputChange}
            />
          ) : (
            contact.name
          )}
        </div>
        <div className={css.contact__number}>
          <strong>Number: </strong>
          {isEditing ? (
            <input
              type="tel"
              name="editedNumber"
              value={editedNumber}
              onChange={this.handleInputChange}
            />
          ) : (
            contact.number
          )}
        </div>
        {isEditing ? (
          <div className={css.contact__actions}>
            <button onClick={this.handleSave}>Save</button>
            <button onClick={this.handleCancel}>Cancel</button>
          </div>
        ) : (
          <div className={css.contact__actions}>
            <button onClick={this.handleEdit}>Edit</button>
            <button onClick={() => onDeleteContact(contact.id)}>Delete</button>
          </div>
        )}
      </li>
    );
  }
}
ContactItem.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
  }).isRequired,
  onDeleteContact: PropTypes.func.isRequired,
  onEditContact: PropTypes.func.isRequired,
};
