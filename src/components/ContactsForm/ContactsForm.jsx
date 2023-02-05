import { useState } from 'react';
import PropTypes from 'prop-types';

import css from './contacts-form.module.scss';

import initialState from './initialState';

const ContactsForm = ({ onSubmit }) => {
  const [contact, setContact] = useState({ ...initialState });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setContact(prevState => {
      return { ...prevState, [name]: value };
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ ...contact });
    setContact({ ...initialState });
  };

  const { name, number } = contact;

  return (
    <form onSubmit={handleSubmit}>
      <div className={css.formGroup}>
        <label className={css.label}>Name</label>
        <input
          type="text"
          className={css.input}
          name="name"
          value={name}
          onChange={handleChange}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </div>

      <div className={css.formGroup}>
        <label className={css.label}>Number</label>
        <input
          type="tel"
          className={css.input}
          name="number"
          value={number}
          onChange={handleChange}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </div>

      <button className={css.btn} type="submit">
        Add contact
      </button>
    </form>
  );
};

export default ContactsForm;

ContactsForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
