import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import ContactsList from './PhoneBook/ContactsList/ContactsList';
import ContactsFilter from './ContactsFilter/ContactsFilter';
import ContactsForm from './ContactsForm/ContactsForm';

import items from './items';

import css from './app.module.scss';

const App = () => {
  const [filter, setFilter] = useState('');
  const [contacts, setContacts] = useState(() => {
    const contacts = JSON.parse(localStorage.getItem('contacts'));
    return contacts ? contacts : [...items];
  });

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const isDuplicate = name => {
    const normalizedName = name.toLowerCase();

    const isUnique = contacts.find(({ name }) => {
      return name.toLocaleLowerCase() === normalizedName;
    });
    return isUnique;
  };

  const addContact = ({ name, number }) => {
    if (isDuplicate(name)) {
      return Notify.failure(`${name} is already in contacts list`);
    }
    const newContact = {
      id: nanoid(),
      name,
      number,
    };
    setContacts(prevContacts => {
      return [newContact, ...prevContacts];
    });
  };

  const removeContact = id => {
    setContacts(prevContacts => prevContacts.filter(item => item.id !== id));
  };

  const handleFilter = ({ target }) => {
    setFilter(target.value);
  };

  const getFilteredContacts = () => {
    if (!filter) {
      return contacts;
    }
    const normalizedFilter = filter.toLowerCase();
    const res = contacts.filter(({ name }) => {
      return name.toLowerCase().includes(normalizedFilter);
    });
    return res;
  };

  const filteredContacts = getFilteredContacts();
  return (
    <>
      <div className={css.block}>
        <h3 className={css.title}>Phone Book</h3>
        <ContactsForm onSubmit={addContact} />
      </div>
      <div className={css.block}>
        <ContactsFilter handleChange={handleFilter} />
        <ContactsList
          contacts={filteredContacts}
          removeContact={removeContact}
        />
      </div>
    </>
  );
};

// class App extends Component {
//   state = {
//     contacts: [...items],
//     filter: '',
//   };

//   removeContact = id => {
//     this.setState(({ contacts }) => {
//       const newContacts = contacts.filter(item => item.id !== id);
//       return { contacts: newContacts };
//     });
//   };

//   isDuplicate(name) {
//     const normalizedName = name.toLowerCase();

//     const { contacts } = this.state;
//     const isUnique = contacts.find(({ name }) => {
//       return name.toLocaleLowerCase() === normalizedName;
//     });
//     return isUnique;
//   }

//   componentDidMount() {
//     const contacts = JSON.parse(localStorage.getItem('contacts'));
//     if (contacts && contacts.length) {
//       this.setState({ contacts });
//     }
//   }

//   componentDidUpdate(prevProps, prevState) {
//     const { contacts } = this.state;

//     if (contacts !== prevState.contacts) {
//       localStorage.setItem('contacts', JSON.stringify(contacts));
//     }
//   }

//   componentWillUnmount() {}

//   addContact = ({ name, number }) => {
//     // const { contacts, name, number } = this.state;
//     if (this.isDuplicate(name)) {
//       return alert(`${name} is already in contacts list`);
//     }
//     const newContact = {
//       id: nanoid(),
//       name,
//       number,
//     };
//     this.setState(prevState => {
//       const { contacts } = prevState;
//       return { contacts: [newContact, ...contacts] };
//     });
//   };

//   getFilteredContacts() {
//     const { filter, contacts } = this.state;
//     if (!filter) {
//       return contacts;
//     }
//     const normalizedFilter = filter.toLowerCase();
//     const res = contacts.filter(({ name }) => {
//       return name.toLowerCase().includes(normalizedFilter);
//     });
//     return res;
//   }

//   handleFilter = ({ target }) => {
//     this.setState({ filter: target.value });
//   };

//   render() {
//     const { addContact, removeContact, handleFilter } = this;

//     const contacts = this.getFilteredContacts();

//     return (
//       <>
//         <div className={css.block}>
//           <h3 className={css.title}>Phone Book</h3>
//           <ContactsForm onSubmit={addContact} />
//         </div>
//         <div className={css.block}>
//           <ContactsFilter handleChange={handleFilter} />
//           <ContactsList contacts={contacts} removeContact={removeContact} />
//         </div>
//       </>
//     );
//   }
// }

export default App;
