import { useEffect } from "react";
import "./App.css";
import ContactForm from "./components/ContactForm/ContactForm";
import ContactList from "./components/ContactList/ContactList";
import {
  selectContacts,
  selectError,
  selectFilter,
  selectLoading,
} from "./redux/selectors";
// import SearchBox from "./components/SearchBox/SearchBox";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "nanoid";
import { setFilter } from "./redux/filtersSlice";
import { selectFilteredContacts } from "./redux/contactsSlice";
// import { addContact, deleteContact } from "./redux/contactsSlice";
import { deleteContact, fetchContacts, addContact } from "./redux/contactsOps";

function App() {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  // const contacts = useSelector(selectContacts);

  const filter = useSelector(selectFilter);
  const filteredContacts = useSelector(selectFilteredContacts);
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const addNewContact = (newContact) => {
    const newUserContact = {
      ...newContact,
      id: nanoid(),
    };

    const action = addContact(newUserContact);
    dispatch(action);
  };

  const deleteChooseContact = (contactId) => dispatch(deleteContact(contactId));

  const onChangeFilter = (event) => {
    const action = setFilter(event.target.value);
    dispatch(action);
  };


  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onAdd={addNewContact} />
      <h2>Search contact</h2>
      <input
        type='text'
        placeholder='Search...'
        value={filter}
        onChange={onChangeFilter}
      />
      <ContactList contacts={filteredContacts} onDelete={deleteChooseContact} />
    </div>
  );
}

export default App;
